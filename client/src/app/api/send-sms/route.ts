import { NextResponse } from "next/server";

interface MozeSmsPayload {
    sender_id?: string;
    messages: Array<{ phone: string; message: string }>;
}

interface MozeSmsResponse {
    success?: boolean;
    data?: unknown;
    error?: unknown;
    message?: string;
}

export async function POST(req: Request) {
    try {
        const { phone, message } = await req.json();

        // Validação básica de entrada
        if (!phone || !message) {
            return NextResponse.json(
                { error: "Telefone e mensagem são obrigatórios." },
                { status: 400 }
            );
        }

        const apiKey = process.env.SMS_API_KEY || process.env.MOZESMS_API_KEY;
        const apiSecret = process.env.SMS_API_SECRET || process.env.MOZESMS_API_SECRET;
        const senderId = (process.env.SMS_SENDER_ID || process.env.MOZESMS_SENDER_ID || "TESTES").trim();
        const apiUrl = process.env.SMS_API_URL || process.env.MOZESMS_API_URL || "https://api.mozesms.com/sms/bulk";

        if (!apiKey || !apiSecret) {
            return NextResponse.json(
                { error: "Credenciais SMS_API_KEY / SMS_API_SECRET do MozeSMS não configuradas no servidor." },
                { status: 503 }
            );
        }

        // Normalização do número de Moçambique para formato 258840000000
        let cleanPhone = String(phone).trim().replace(/[\s().-]/g, "");
        if (cleanPhone.startsWith("+")) cleanPhone = cleanPhone.slice(1);
        if (cleanPhone.startsWith("00")) cleanPhone = cleanPhone.slice(2);
        if (/^\d{9}$/.test(cleanPhone)) cleanPhone = `258${cleanPhone}`;

        const cleanMessage = String(message)
            .replace(/ª/g, "a")
            .replace(/º/g, "o")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        const bodyPayload: MozeSmsPayload = {
            messages: [{ phone: cleanPhone, message: cleanMessage }],
        };
        if (senderId && senderId !== "ESHOP" && senderId.toLowerCase() !== "mozesms") {
            bodyPayload.sender_id = senderId;
        }

        let response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": apiKey,
                "X-API-Secret": apiSecret,
            },
            body: JSON.stringify(bodyPayload),
        });

        let data: MozeSmsResponse = (await response.json().catch(() => ({}))) as MozeSmsResponse;

        // Se der erro 403 de Sender ID não aprovado, tenta novamente sem o sender_id específico
        if (response.status === 403 && bodyPayload.sender_id) {
            delete bodyPayload.sender_id;
            response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": apiKey,
                    "X-API-Secret": apiSecret,
                },
                body: JSON.stringify(bodyPayload),
            });
            data = (await response.json().catch(() => ({}))) as MozeSmsResponse;
        }

        if (!response.ok || data.success === false) {
            return NextResponse.json(
                { success: false, error: data },
                { status: response.status || 400 }
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Erro no envio de SMS via MozeSMS:", error);
        return NextResponse.json(
            { success: false, error: "Falha interna ao processar o envio de SMS." },
            { status: 500 }
        );
    }
}
