import sgMail, { type MailDataRequired } from "@sendgrid/mail";
import { ErrorImpl } from "../../utils/error";

interface EmailTemplate {
    id: string;
    data: Record<string, any>;
}

interface EmailOptions {
    to: string;
    from: string;
    subject: string;
    template?: EmailTemplate;
    text?: string;
    html?: string;
}

interface MailerService {
    sendEmail: (options: EmailOptions) => Promise<void>;
}

const MailerServ = (apiKey: string): MailerService => {
    sgMail.setApiKey(apiKey);

    const sendEmail = async (options: EmailOptions): Promise<void> => {
        try {
            const msg = {
                to: options.to,
                from: options.from,
                subject: options.subject,
                text: options.text,
                html: options.html,
            };

            if (options.template) {
                Object.assign(msg, {
                    templateId: options.template.id,
                    dynamicTemplateData: options.template.data,
                });
            }

            await sgMail.send(msg as unknown as MailDataRequired);
        } catch (error) {
            if (error instanceof Error && !(error instanceof ErrorImpl)) {
                throw new ErrorImpl(
                    "Erro ao notificar participante",
                    500,
                    error.message,
                );
            }
            throw error;
        }
    };

    return {
        sendEmail,
    };
};

export {
    MailerServ,
    type EmailOptions,
    type EmailTemplate,
    type MailerService,
};
