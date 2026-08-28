import type { Participant } from "../../models/types";
import type { MailerService } from "../Mailer";
import type { ParticipantService } from "../types";
import * as MailDefaults from "../Mailer/defaults";
const ParticipantServ = (
    Participants: Participant.ParticipantRepository,
    Mail: MailerService,
): ParticipantService => {
    const store = async (participant: Participant.ParticipantRequest) => {
        const particp = await Participants.store(participant);
        try {
            await Mail.sendEmail(MailDefaults.WELCOME(particp));
        } catch (mailError) {
            console.error("Erro ao enviar e-mail de boas-vindas:", mailError);
        }
        return particp;
    };
    const get = async (id: string) => {
        return await Participants.get(id);
    };
    const fetch = async () => {
        return await Participants.fetch();
    };
    const destroy = async (id: string) => {
        return await Participants.destroy(id);
    };
    const update = async (
        id: string,
        parcipant: Participant.ParticipantRequest,
    ) => {
        return await Participants.update(id, parcipant);
    };
    const sendBulkEmail = async (data: {
        recipients: {
            email: string;
            firstName?: string;
            lastName?: string;
            category?: string;
            route?: string;
            IDCode?: string;
            shirt?: string;
        }[];
        subject: string;
        html: string;
    }) => {
        let sentCount = 0;
        const sender = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

        for (const recipient of data.recipients) {
            if (!recipient.email) continue;

            let textContent = data.html;
            const fullName = `${recipient.firstName || ""} ${recipient.lastName || ""}`.trim() || "Participante";
            textContent = textContent.replace(/{NOME}/g, fullName);
            textContent = textContent.replace(/{CATEGORIA}/g, recipient.category || "");
            textContent = textContent.replace(/{ROTA}/g, recipient.route || "");
            textContent = textContent.replace(/{PERCURSO}/g, recipient.route || "");
            textContent = textContent.replace(/{BI}/g, recipient.IDCode || "");
            textContent = textContent.replace(/{CAMISETE}/g, recipient.shirt || "");

            const formattedBody = textContent.startsWith("<div") || textContent.startsWith("<html")
                ? textContent
                : textContent.replace(/\n/g, "<br />");

            const fullEmailHtml = `
                <div style="background-color: #f8fafc; padding: 24px 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                        
                        <!-- Header Banner -->
                        <div style="background: linear-gradient(135deg, #e11d48 0%, #be123c 100%); padding: 28px 20px; text-align: center; color: #ffffff;">
                            <h2 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">16ª Corrida Millennium bim</h2>
                            <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.9; color: #ffe4e6;">Comunicação Oficial do Evento</p>
                        </div>

                        <!-- Body Content -->
                        <div style="padding: 24px; color: #334155; font-size: 14px; line-height: 1.6;">
                            <div style="border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; margin-bottom: 16px;">
                                <span style="font-size: 11px; color: #64748b; font-weight: bold; text-transform: uppercase;">Assunto:</span>
                                <p style="margin: 2px 0 0 0; font-size: 15px; font-weight: bold; color: #0f172a;">${data.subject}</p>
                            </div>

                            <div style="font-size: 14px; color: #334155; line-height: 1.6;">
                                ${formattedBody}
                            </div>

                            <!-- CTA Button -->
                            <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #f1f5f9; text-align: center;">
                                <a href="http://localhost:3005" target="_blank" style="display: inline-block; background-color: #e11d48; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 13px; padding: 12px 24px; border-radius: 8px;">
                                    Ver Detalhes na Plataforma
                                </a>
                            </div>
                        </div>

                        <!-- Footer -->
                        <div style="background-color: #f8fafc; padding: 16px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #f1f5f9;">
                            <p style="margin: 0 0 4px 0;">Banco Internacional de Moçambique SA. Todos os direitos reservados.</p>
                            <p style="margin: 0;">Maputo, Moçambique • 25 de Outubro</p>
                        </div>

                    </div>
                </div>
            `;

            try {
                await Mail.sendEmail({
                    from: sender,
                    to: recipient.email,
                    subject: data.subject,
                    html: fullEmailHtml,
                });
                sentCount++;
            } catch (err) {
                console.error(`Erro ao enviar e-mail para ${recipient.email}:`, err);
            }
        }

        return { sentCount };
    };

    return {
        store,
        get,
        fetch,
        destroy,
        update,
        sendBulkEmail,
    };
};

export { ParticipantServ };
