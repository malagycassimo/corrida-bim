import type { EmailOptions } from ".";
import type { Participant } from "../../models/types";

const buildWelcomeEmailHtml = ({
    firstName,
    lastName,
    id,
    category,
    route,
    IDCode,
    shirt,
}: Participant.ParticipantSchema): string => {
    const fullName = `${firstName || ""} ${lastName || ""}`.trim() || "Participante";
    const appUrl = process.env.APP_URL || "https://corridamillenniumbim.co.mz";
    const logoUrl = `${appUrl}/assets/brand/logo-16-white.png`;

    return `
        <div style="background-color: #f8fafc; padding: 24px 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                
                <!-- Header Banner -->
                <div style="background: linear-gradient(135deg, #e11d48 0%, #be123c 100%); padding: 28px 20px; text-align: center; color: #ffffff;">
                    <img src="${logoUrl}" alt="16ª Corrida Millennium bim" width="70" height="70" style="display: block; margin: 0 auto 10px auto; max-width: 70px; height: auto; border: 0;" />
                    <h2 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">16ª Corrida Millennium bim</h2>
                    <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.9; color: #ffe4e6;">Comunicação Oficial do Evento</p>
                </div>

                <!-- Body Content -->
                <div style="padding: 24px; color: #334155; font-size: 14px; line-height: 1.6;">
                    <div style="border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; margin-bottom: 20px;">
                        <span style="font-size: 11px; color: #64748b; font-weight: bold; text-transform: uppercase;">Assunto:</span>
                        <p style="margin: 2px 0 0 0; font-size: 15px; font-weight: bold; color: #0f172a;">[16ª Corrida Millennium bim] Confirmação da sua Inscrição! 🎉</p>
                    </div>

                    <p style="margin: 0 0 16px 0;">Olá <strong>${fullName}</strong>,</p>

                    <p style="margin: 0 0 16px 0;">A sua inscrição para a <strong>16ª Corrida Millennium bim</strong> foi confirmada com sucesso! A grande prova acontecerá no dia <strong>25 de Outubro</strong> em Maputo.</p>

                    <!-- Detalhes da Inscrição -->
                    <div style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; padding: 16px; margin: 20px 0;">
                        <p style="margin: 0 0 10px 0; font-weight: bold; color: #0f172a; font-size: 14px;">📌 Informações da sua Inscrição:</p>
                        <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 13px; line-height: 1.8;">
                            <li><strong>Nº de Documento (BI):</strong> ${IDCode || "Não informado"}</li>
                            <li><strong>Categoria:</strong> ${category || "Geral"}</li>
                            <li><strong>Percurso:</strong> ${route || "Geral"}</li>
                            ${shirt ? `<li><strong>Tamanho da T-shirt:</strong> ${shirt}</li>` : ""}
                        </ul>
                    </div>

                    <!-- Informações do Levantamento do Kit -->
                    <div style="background-color: #fff1f2; border-radius: 12px; border: 1px solid #ffe4e6; padding: 16px; margin: 20px 0;">
                        <p style="margin: 0 0 10px 0; font-weight: bold; color: #be123c; font-size: 14px;">🎽 Levantamento dos Kits do Atleta (21 a 23 de Outubro):</p>
                        <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 13px; line-height: 1.8;">
                            <li><strong>Local:</strong> Sede do Millennium bim (Rua dos Desportistas n.º 873-879/15, Maputo).</li>
                            <li><strong>Horário:</strong> 10h00 às 16h30.</li>
                            <li><strong>Documentos necessários:</strong> Apresentação do comprovativo de inscrição e do respectivo documento de identificação.</li>
                        </ul>
                        <div style="margin-top: 12px; padding-top: 10px; border-top: 1px dashed #fecdd3; font-size: 12px; color: #9f1239; line-height: 1.6;">
                            <p style="margin: 0 0 4px 0;"><strong>*Nota:</strong> Para portadores de deficiência, o levantamento será efectuado na Associação de Atletismo da Cidade de Maputo (Parque dos Continuadores), entre os dias 21 a 23 de outubro.</p>
                            <p style="margin: 0;"><strong>*Nota:</strong> Os kits da caminhada não incluem dorsal.</p>
                        </div>
                    </div>

                    <p style="margin: 20px 0 16px 0;">Prepare os seus ténis, hidrate-se bem e venha fazer parte desta grande festa do desporto e da saúde!</p>

                    <p style="margin: 0 0 4px 0;">Com os melhores cumprimentos,</p>
                    <p style="margin: 0; font-weight: bold; color: #0f172a;">Comissão Organizadora - 16ª Corrida Millennium bim</p>

                    <!-- CTA Button -->
                    <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #f1f5f9; text-align: center;">
                        <a href="${appUrl}" target="_blank" style="display: inline-block; background-color: #e11d48; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 13px; padding: 12px 28px; border-radius: 8px;">
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
};

const WELCOME = (participant: Participant.ParticipantSchema): EmailOptions => {
    return {
        from:
            process.env.RESEND_FROM_EMAIL ||
            "16ª Corrida Millennium bim <nao-responder@corridamillenniumbim.co.mz>",
        to: participant.email,
        subject: "[16ª Corrida Millennium bim] Confirmação da sua Inscrição! 🎉",
        html: buildWelcomeEmailHtml(participant),
    };
};

export { WELCOME };
