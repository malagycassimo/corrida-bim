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
- Concentração: 6h20 na Praça da Independência
- Início da Prova: 7h00 em ponto

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

📌 Locais e Horários de Levantamento:
- Local: Associação de Atletismo da Cidade de Maputo (Parque dos Continuadores)
- Documentos necessários: Apresentação do Bilhete de Identidade ({BI}) ou comprovativo da inscrição.
- Tamanho da T-shirt selecionado: {CAMISETE}

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
Teremos postos de hidratação oficiais Bonaqua ao longo de todo o percurso e apoio médico a postos.

⏰ Horários:
- 06h20: Aquecimento orientado
- 07h00: Partida Oficial

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
