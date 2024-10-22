import { AccordionProps } from ".";

export const landingPageAccordion: Omit<AccordionProps, "idx">[] = [
    {
        title: "Informações gerais",
        subtitle: "Data e Horário",
        content:
        <p>    
         A 15ª Corrida Millennium bim terá lugar no sábado, 30 de novembro de 2024, com início às 7h00. O aquecimento começará às 6h20, sob a orientação do ginásio IR Fitness.
         </p>

         ,
    },
    {
        title: "Retirada de Kits",
        content: <div>Texto sobre retirada de kits</div>,
    },
];
