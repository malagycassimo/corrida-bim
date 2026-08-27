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

            let personalizedHtml = data.html;
            const fullName = `${recipient.firstName || ""} ${recipient.lastName || ""}`.trim() || "Participante";
            personalizedHtml = personalizedHtml.replace(/{NOME}/g, fullName);
            personalizedHtml = personalizedHtml.replace(/{CATEGORIA}/g, recipient.category || "");
            personalizedHtml = personalizedHtml.replace(/{ROTA}/g, recipient.route || "");
            personalizedHtml = personalizedHtml.replace(/{PERCURSO}/g, recipient.route || "");
            personalizedHtml = personalizedHtml.replace(/{BI}/g, recipient.IDCode || "");
            personalizedHtml = personalizedHtml.replace(/{CAMISETE}/g, recipient.shirt || "");

            try {
                await Mail.sendEmail({
                    from: sender,
                    to: recipient.email,
                    subject: data.subject,
                    html: personalizedHtml,
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
