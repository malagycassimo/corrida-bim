export type EmailTemplate = {
    id: string;
    name: string;
    icon: string;
    subject: string;
    body: string;
};

export const DEFAULT_TEMPLATES: EmailTemplate[] = [
    {
        id: "countdown",
        name: "⏳ Contagem Regressiva (Countdown)",
        icon: "Timer",
        subject: "[16ª Corrida Millennium bim] Faltam poucos dias para a grande prova! 🏃‍♂️",
        body: `Olá {NOME},

Falta muito pouco para a 16ª Corrida Millennium bim! A grande prova acontecerá no dia 25 de Outubro em Maputo.

📌 Informações Rápidas:
- Categoria: {CATEGORIA}
- Percurso: {ROTA}
- Início do Aquecimento: 6h10 na Praça da Independência
- Início da Prova: 6h30 em ponto

Prepare os seus tênis, hidrate-se bem e venha fazer parte dessa grande festa do esporte e da saúde!

Com os melhores cumprimentos,
Comissão Organizadora - 16ª Corrida Millennium bim`,
    },
    {
        id: "kits",
        name: "🎽 Levantamento dos Kits do Atleta",
        icon: "PackageCheck",
        subject: "[16ª Corrida Millennium bim] Instruções para Levantamento do Kit do Atleta 🎽",
        body: `Olá {NOME},

A sua inscrição para a 16ª Corrida Millennium bim está confirmada!

Chegou o momento de levantar o seu Kit do Atleta (T-shirt oficial, dorsal e chip).

📌 Locais e Datas de Levantamento (21 a 23 de Outubro, das 10h00 às 16h30):
- Sede do Millennium bim (Rua dos Desportistas n.º 873-879/15, Maputo).

📌 Documentos necessários: Apresentação do Bilhete de Identidade ({BI}) ou comprovativo da inscrição.
- Tamanho da T-shirt selecionado: {CAMISETE}

*Nota: Para portadores de deficiência, o levantamento será efectuado na Associação de Atletismo da Cidade de Maputo (Parque dos Continuadores), entre os dias 21 a 23 de outubro.
*Nota: Os kits da caminhada não incluem dorsal.
Lembramos que o levantamento do kit é obrigatório para a participação na prova.

Até breve!
Comissão Organizadora - 16ª Corrida Millennium bim`,
    },
    {
        id: "guide",
        name: "🗺️ Guia Completo da Prova",
        icon: "MapPin",
        subject: "[16ª Corrida Millennium bim] Guia e Recomendações Pré-Corrida 🗺️",
        body: `Olá {NOME},

Para garantir que a sua experiência na 16ª Corrida Millennium bim seja inesquecível e segura, preparamos o Guia Completo do Atleta:

🏃 Detalhes da sua Participação:
- Atleta: {NOME}
- Percurso: {ROTA}
- Categoria: {CATEGORIA}

💧 Hidratação & Apoio:
Haverá 4 pontos de hidratação ao longo do percurso (Clube Naval com 2 pontos, Em frente à Embaixada dos EUA e Clínica Trauma) e apoio médico a postos.

⏰ Horários:
- 06h10: Aquecimento orientado
- 06h30: Partida Oficial

Desejamos uma excelente corrida!
Comissão Organizadora - 16ª Corrida Millennium bim`,
    },
    {
        id: "custom",
        name: "✍️ E-mail Personalizado",
        icon: "PenTool",
        subject: "[16ª Corrida Millennium bim] Comunicado Importante aos Participantes",
        body: `Olá {NOME},

Escreva aqui o seu comunicado personalizado para os atletas inscritos na 16ª Corrida Millennium bim.

Pode utilizar as tags dinâmicas como {NOME}, {CATEGORIA}, {ROTA} e {BI} para personalizar o conteúdo.

Atenciosamente,
Comissão Organizadora - 16ª Corrida Millennium bim`,
    },
];
