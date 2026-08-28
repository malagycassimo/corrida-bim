import { Resend } from "resend";
import { ErrorImpl } from "../../utils/error";

interface EmailTemplate {
    id?: string;
    data?: Record<string, any>;
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
    const resend = new Resend(apiKey);

    const sendEmail = async (options: EmailOptions): Promise<void> => {
        try {
            let htmlContent = options.html;

            // Se não houver HTML fornecido diretamente mas houver dados de template (ex: WELCOME)
            if (!htmlContent && options.template?.data) {
                const { name, id, category, route, IDCode } = options.template.data;
                htmlContent = `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e7; rounded-radius: 12px;">
                        <h2 style="color: #d1005d;">Confirmação de Inscrição - 16ª Corrida Millennium bim</h2>
                        <p>Olá <strong>${name || ""}</strong>,</p>
                        <p>A sua inscrição para a <strong>16ª Corrida Millennium bim</strong> foi efetuada com sucesso!</p>
                        
                        <div style="background-color: #f4f4f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <p style="margin: 5px 0;"><strong>Código da Inscrição:</strong> ${id || ""}</p>
                            <p style="margin: 5px 0;"><strong>Nº Documento:</strong> ${IDCode || ""}</p>
                            <p style="margin: 5px 0;"><strong>Categoria:</strong> ${category || ""}</p>
                            <p style="margin: 5px 0;"><strong>Percurso:</strong> ${route || ""}</p>
                        </div>
                        
                        <p style="color: #52525b; font-size: 14px;">Vemo-nos no dia do evento! Guarde este e-mail para a levantamento do seu kit.</p>
                    </div>
                `;
            }

            await resend.emails.send({
                from: options.from,
                to: options.to,
                subject: options.subject,
                text: options.text,
                html: htmlContent || `<p>Inscrição realizada com sucesso!</p>`,
            });
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
