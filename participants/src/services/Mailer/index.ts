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
    const resend = apiKey ? new Resend(apiKey) : null;

    const sendEmail = async (options: EmailOptions): Promise<void> => {
        if (!resend) {
            console.warn("[Mailer] RESEND_KEY não configurada. E-mail não enviado.");
            return;
        }
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
                            <p style="margin: 5px 0;"><strong>Nº Documento:</strong> ${IDCode || ""}</p>
                            <p style="margin: 5px 0;"><strong>Categoria:</strong> ${category || ""}</p>
                            <p style="margin: 5px 0;"><strong>Percurso:</strong> ${route || ""}</p>
                        </div>

                        <div style="background-color: #fff1f2; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #ffe4e6;">
                            <p style="margin: 0 0 8px 0; font-weight: bold; color: #be123c;">Levantamento dos Kits (21 a 23 de Outubro):</p>
                            <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Local:</strong> Sede do Millennium bim (Rua dos Desportistas n.º 873-879/15), das 10h00 às 16h30, mediante comprovativo e documento de identificação.</p>
                            <p style="margin: 8px 0 2px 0; font-size: 12px; color: #9f1239;"><strong>*Nota:</strong> Para portadores de deficiência, o levantamento será efectuado na Associação de Atletismo da Cidade de Maputo (Parque dos Continuadores), entre os dias 21 a 23 de outubro.</p>
                            <p style="margin: 0; font-size: 12px; color: #9f1239;"><strong>*Nota:</strong> Os kits da caminhada não incluem dorsal.</p>
                        </div>
                        
                        <p style="color: #52525b; font-size: 14px;">Vemo-nos no dia do evento! Guarde este e-mail para o levantamento do seu kit.</p>
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
