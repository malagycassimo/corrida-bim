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
}

export interface SmsService {
    sendBulkSms: (data: { recipients: SmsRecipient[]; message: string }) => SmsJob;
    getSmsJob: (id: string) => SmsJob | undefined;
}

const delay = (milliseconds: number) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

const SmsServ = (): SmsService => {
    const jobs = new Map<string, SmsJob>();
    const apiKey = (process.env.SMS_API_KEY || process.env.MOZESMS_API_KEY || "").trim();
    const apiSecret = (process.env.SMS_API_SECRET || process.env.MOZESMS_API_SECRET || "").trim();
    const senderId = (process.env.SMS_SENDER_ID || process.env.MOZESMS_SENDER_ID || "CORRIDA16").trim();
    const apiUrl = process.env.SMS_API_URL || process.env.MOZESMS_API_URL || "https://api.mozesms.com/sms/bulk";
    // MozeSMS permite até 1000 mensagens por pedido em /sms/bulk
    const batchSize = Math.min(1000, Math.max(1, Number(process.env.SMS_BATCH_SIZE) || 500));
    const batchDelayMs = Math.max(0, Number(process.env.SMS_BATCH_DELAY_MS) || 1000);
    const queue: Array<{ job: SmsJob; recipients: SmsRecipient[]; message: string }> = [];
    let isProcessingQueue = false;

    const normalizePhone = (phone: string) => {
        let normalized = phone.trim().replace(/[\s().-]/g, "");
        if (normalized.startsWith("+")) normalized = normalized.slice(1);
        if (normalized.startsWith("00")) normalized = normalized.slice(2);
        if (/^\d{9}$/.test(normalized)) normalized = `258${normalized}`;
        if (normalized.startsWith("258") && !/^258\d{9}$/.test(normalized)) {
            throw new Error("Número moçambicano inválido: informe 9 dígitos após 258, por exemplo 258841234567.");
        }
        if (!/^[1-9]\d{7,14}$/.test(normalized)) {
            throw new Error("Telefone inválido. Formato esperado: 258841234567.");
        }
        return normalized;
    };

    const sanitizeForSms = (text: string) => {
        return text
            .replace(/ª/g, "a")
            .replace(/º/g, "o")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    };

    const personalizeMessage = (template: string, recipient: SmsRecipient) => {
        const fullName = `${recipient.firstName || ""} ${recipient.lastName || ""}`.trim() || "Participante";
        const personalized = template
            .replace(/{NOME}/g, fullName)
            .replace(/{CATEGORIA}/g, recipient.category || "")
            .replace(/{ROTA}|{PERCURSO}/g, recipient.route || "")
            .replace(/{BI}/g, recipient.IDCode || "")
            .replace(/{CAMISETE}/g, recipient.shirt || "");
        return sanitizeForSms(personalized);
    };

    const sendBatch = async (batchMessages: Array<{ phone: string; message: string }>) => {
        const payload: { sender_id?: string; messages: typeof batchMessages } = {
            messages: batchMessages,
        };
        // Só envia sender_id se estiver configurado e não for ESHOP nem MOZESMS (que não estão aprovados)
        if (senderId && senderId !== "ESHOP" && senderId.toLowerCase() !== "mozesms") {
            payload.sender_id = senderId;
        }

        const headers = {
            "Content-Type": "application/json",
            "X-API-Key": apiKey,
            "X-API-Secret": apiSecret,
        };

        for (let attempt = 0; attempt < 3; attempt++) {
            try {
                console.log(`[MozeSMS] Tentativa ${attempt + 1}: Enviando payload:`, JSON.stringify(payload));
                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers,
                    body: JSON.stringify(payload),
                    signal: AbortSignal.timeout(20000),
                });

                const rawText = await response.text().catch(() => "");
                let responseData: {
                    success?: boolean;
                    data?: {
                        batch_id?: string;
                        total?: number;
                        sent?: number;
                        failed?: number;
                        queued?: number;
                        cost?: number;
                        remaining_balance?: number;
                    };
                    summary?: {
                        total?: number;
                        success?: number;
                        failed?: number;
                        total_cost?: number;
                        remaining_balance?: number;
                    };
                    error?: string | { message?: string };
                    message?: string;
                    raw?: string;
                } = {};
                try {
                    responseData = JSON.parse(rawText);
                } catch {
                    responseData = { raw: rawText.substring(0, 300) };
                }

                if (response.ok && responseData.success !== false) {
                    const summary = responseData.summary || responseData.data || {};
                    console.log(`[MozeSMS] Resposta completa da API: ${rawText}`);
                    return {
                        sent: Number(summary.success ?? (summary as { sent?: number }).sent ?? batchMessages.length),
                        failed: Number(summary.failed ?? 0),
                    };
                }

                const errMsg =
                    responseData.message ||
                    (typeof responseData.error === "string"
                        ? responseData.error
                        : responseData.error?.message || JSON.stringify(responseData.error)) ||
                    responseData.raw ||
                    `HTTP ${response.status}`;

                console.error(`[MozeSMS] Erro HTTP ${response.status} de ${apiUrl}:`, errMsg);

                // Se o Sender ID não estiver aprovado pela MozeSMS, tenta imediatamente sem sender_id
                if (response.status === 403 && (errMsg.includes("Sender ID") || errMsg.includes("sender_id")) && payload.sender_id) {
                    console.warn(`[MozeSMS] Remetente '${payload.sender_id}' não está aprovado na conta MozeSMS. Tentando novamente sem definir sender_id...`);
                    delete payload.sender_id;
                    continue;
                }

                if (attempt === 2 || (response.status < 500 && response.status !== 429)) {
                    throw new Error(`MOZESMS_PERMANENT:${errMsg}`);
                }

                const retryAfter = Number(response.headers.get("Retry-After")) * 1000;
                await delay(retryAfter || 1000 * (attempt + 1));
            } catch (error) {
                if (error instanceof Error && error.message.startsWith("MOZESMS_PERMANENT:")) {
                    throw new Error(error.message.slice("MOZESMS_PERMANENT:".length));
                }
                if (attempt === 2) throw error;
                await delay(1000 * (attempt + 1));
            }
        }
        return { sent: 0, failed: batchMessages.length };
    };

    const processJob = async (job: SmsJob, recipients: SmsRecipient[], message: string) => {
        job.status = "processing";
        try {
            for (let offset = 0; offset < recipients.length; offset += batchSize) {
                const batch = recipients.slice(offset, offset + batchSize);
                const batchMessages: Array<{ phone: string; message: string }> = [];

                for (const recipient of batch) {
                    try {
                        const normalizedPhone = normalizePhone(recipient.phone);
                        const personalized = personalizeMessage(message, recipient);
                        batchMessages.push({ phone: normalizedPhone, message: personalized });
                    } catch (normalizeError) {
                        job.failedCount++;
                        console.error(`[MozeSMS] Número inválido ignorado: ${recipient.phone}`);
                    }
                }

                if (batchMessages.length > 0) {
                    try {
                        const res = await sendBatch(batchMessages);
                        job.sentCount += res.sent;
                        job.failedCount += res.failed;
                    } catch (error) {
                        job.failedCount += batchMessages.length;
                        const errText = error instanceof Error ? error.message : "Falha ao enviar lote via MozeSMS.";
                        console.error(`[MozeSMS] Falha no lote:`, errText);
                        if (!job.error) {
                            job.error = errText;
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
        if (!apiKey || !apiSecret) {
            throw new ErrorImpl(
                "MozeSMS não está configurado. Preencha as variáveis SMS_API_KEY e SMS_API_SECRET.",
                503,
                "SMS_NOT_CONFIGURED"
            );
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