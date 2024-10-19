import { AccordionProps } from ".";

export const landingPageAccordion: Omit<AccordionProps, "idx">[] = [
    {
        title: "Informações gerais",
        subtitle: "Data e Horário",
        content:
            "A 15ª Corrida Millennium bim realiza-se no dia 30 de Novembro de 2024, domingo ás 5h.",
    },
    {
        title: "Retirada de Kits",
        content: <div>Texto sobre retirada de kits</div>,
    },
];
