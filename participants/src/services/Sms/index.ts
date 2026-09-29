import { ErrorImpl } from "../../utils/error";

export interface SmsRecipient {
    phone: string;
    firstName?: string;
    lastName?: string;
    category?: string;
    route?: string;
    IDCode?: string;
    shirt?: string;
}

export interface SmsJob {
    id: string;
    status: "queued" | "processing" | "completed" | "failed";
    total: number;
    sentCount: number;
    failedCount: number;
    error?: string;
    createdAt: string;
    finishedAt?: string;
    error?: string;
}

export interface SmsService {
    sendBulkSms: (data: { recipients: SmsRecipient[]; message: string }) => SmsJob;
    getSmsJob: (id: string) => SmsJob | undefined;
}

const delay = (milliseconds: number) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

const SmsServ = (): SmsService => {
    const jobs = new Map<string, SmsJob>();
    const accountSid = process.env.TWILIO_ACCOUNT_SID || "";
    const authToken = process.env.TWILIO_AUTH_TOKEN || "";
    const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID || "";
    const fromNumber = process.env.TWILIO_FROM_NUMBER || "";
    const batchSize = Math.max(1, Number(process.env.SMS_BATCH_SIZE) || 10);
    const batchDelayMs = Math.max(0, Number(process.env.SMS_BATCH_DELAY_MS) || 1000);
    const queue: Array<{ job: SmsJob; recipients: SmsRecipient[]; message: string }> = [];
    let isProcessingQueue = false;

    const normalizePhone = (phone: string) => {
        let normalized = phone.trim().replace(/[\s().-]/g, "");
        if (normalized.startsWith("00")) normalized = `+${normalized.slice(2)}`;
        if (/^\d{9}$/.test(normalized)) normalized = `+258${normalized}`;
        if (/^258\d{9}$/.test(normalized)) normalized = `+${normalized}`;
        if (normalized.startsWith("+258") && !/^\+258\d{9}$/.test(normalized)) {
            throw new Error("Número moçambicano inválido: informe 9 dígitos após +258, por exemplo +258841234567.");
        }
        if (!/^\+[1-9]\d{7,14}$/.test(normalized)) {
            throw new Error("Telefone inválido. Use formato internacional, por exemplo +258841234567.");
        }
        return normalized;
    };

    const sendOne = async (recipient: SmsRecipient, message: string) => {
        const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
        const body = new URLSearchParams({ To: normalizePhone(recipient.phone), Body: message });
        if (messagingServiceSid) body.set("MessagingServiceSid", messagingServiceSid);
        else body.set("From", fromNumber);

        for (let attempt = 0; attempt < 3; attempt++) {
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body,
                    signal: AbortSignal.timeout(15000),
                });

                if (response.ok) return;

                const responseData = await response.json().catch(() => ({})) as { message?: string; code?: number };
                if (attempt === 2 || (response.status < 500 && response.status !== 429)) {
                    const errorCode = responseData.code ? ` (código ${responseData.code})` : "";
                    throw new Error(`TWILIO_PERMANENT:${responseData.message || `HTTP ${response.status}`}${errorCode}`);
                }

                const retryAfter = Number(response.headers.get("Retry-After")) * 1000;
                await delay(retryAfter || 500 * (attempt + 1));
            } catch (error) {
                if (error instanceof Error && error.message.startsWith("TWILIO_PERMANENT:")) {
                    throw new Error(error.message.slice("TWILIO_PERMANENT:".length));
                }
                if (attempt === 2) throw error;
                await delay(500 * (attempt + 1));
            }
        }
    };

    const personalizeMessage = (template: string, recipient: SmsRecipient) => {
        const fullName = `${recipient.firstName || ""} ${recipient.lastName || ""}`.trim() || "Participante";
        return template
            .replace(/{NOME}/g, fullName)
            .replace(/{CATEGORIA}/g, recipient.category || "")
            .replace(/{ROTA}|{PERCURSO}/g, recipient.route || "")
            .replace(/{BI}/g, recipient.IDCode || "")
            .replace(/{CAMISETE}/g, recipient.shirt || "");
    };

    const processJob = async (job: SmsJob, recipients: SmsRecipient[], message: string) => {
        job.status = "processing";
        try {
            for (let offset = 0; offset < recipients.length; offset += batchSize) {
                const batch = recipients.slice(offset, offset + batchSize);
                for (const recipient of batch) {
                    try {
                        await sendOne(recipient, personalizeMessage(message, recipient));
                        job.sentCount++;
                    } catch (error) {
                        job.failedCount++;
                        if (!job.error) {
                            job.error = error instanceof Error ? error.message : "Falha inesperada ao enviar SMS.";
                        }
                    }
                }
                if (offset + batchSize < recipients.length && batchDelayMs > 0) {
                    await delay(batchDelayMs);
                }
            }
            job.status = "completed";
        } catch (error) {
            job.status = "failed";
            job.error = error instanceof Error ? error.message : "Falha inesperada no envio de SMS.";
        } finally {
            job.finishedAt = new Date().toISOString();
        }
    };

    const processQueue = async () => {
        if (isProcessingQueue) return;
        isProcessingQueue = true;
        try {
            while (queue.length > 0) {
                const next = queue.shift();
                if (next) await processJob(next.job, next.recipients, next.message);
            }
        } finally {
            isProcessingQueue = false;
            if (queue.length > 0) void processQueue();
        }
    };

    const sendBulkSms = ({ recipients, message }: { recipients: SmsRecipient[]; message: string }) => {
        if (!accountSid || !authToken || (!messagingServiceSid && !fromNumber)) {
            throw new ErrorImpl("Twilio não está configurado. Preencha as variáveis TWILIO_*.", 503, "SMS_NOT_CONFIGURED");
        }
        if (!Array.isArray(recipients) || recipients.length === 0 || recipients.length > 5000) {
            throw new ErrorImpl("Informe entre 1 e 5000 destinatários.", 400, "INVALID_SMS_RECIPIENTS");
        }
        if (typeof message !== "string" || !message.trim() || message.length > 1600) {
            throw new ErrorImpl("A mensagem é obrigatória e deve ter no máximo 1600 caracteres.", 400, "INVALID_SMS_MESSAGE");
        }

        const job: SmsJob = {
            id: crypto.randomUUID(),
            status: "queued",
            total: recipients.length,
            sentCount: 0,
            failedCount: 0,
            createdAt: new Date().toISOString(),
        };
        jobs.set(job.id, job);
        setTimeout(() => {
            queue.push({ job, recipients, message });
            void processQueue();
        }, 0);

        for (const [id, existingJob] of jobs) {
            if (existingJob.finishedAt && Date.now() - Date.parse(existingJob.finishedAt) > 86400000) {
                jobs.delete(id);
            }
        }
        return job;
    };

    return { sendBulkSms, getSmsJob: (id) => jobs.get(id) };
};

export { SmsServ };