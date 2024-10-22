import { AccordionProps } from ".";
import { IconPack } from "../IconPack";

export const landingPageAccordion: Omit<AccordionProps, "idx">[] = [
  {
    title: "Informações gerais",
    subtitle: "Data e Horário",
    content: (
      <p>
        A 15ª Corrida Millennium bim terá lugar no sábado, 30 de novembro de
        2024, com início às 7h00 na Praça da Independência. O aquecimento começará às 6h20, sob a
        orientação do ginásio IR Fitness.
      </p>
    ),
  },
  {
    title: "Inscrições",
    content: (
      <p>
        As categorias de Portadores de Deficiências, Juvenis e Federados deverão
        inscrever-se na Associação de Atletismo da Cidade de Maputo, sita no
        Parque dos Continuadores, entre os dias 28 de Outubro e 8 de Novembro de
        2024. As inscrições gerais para a corrida (15km) são reservadas aos
        primeiros 2000 atletas, não existindo um limite máximo de participantes
        para a caminhada (7km){" "}
      </p>
    ),
  },
  {
    title: "Retirada dos Kits",
    content: (
      <p>
        A entrega dos dorsais (para os atletas da corrida pedestre - 15km) será feita na Associação de Atletismo da Cidade de
        Maputo nos dias 27 e 28 de novembro, mediante apresentação do recibo de inscrição e do documento de identificação. Para a caminhada, não haverá
        dorsais disponíveis
      </p>
    ),
  },
  {
    title: "Segurança e Apoio no Percurso",
    content: (
      <div>
        <p>
          <span className="relative block text-lg font-medium mb-1">
            <IconPack.ChevronRight className="absolute -left-4 top-1/2 -translate-y-1/2 " />
            {""}
            {"Segurança no percurso"}
          </span>
          As provas terão lugar à beira da estrada, sem interrupção total da via
          pública. Solicitamos a todos os participantes que tenham o máximo
          cuidado com o trânsito ao longo do percurso. A polícia estará presente
          para monitorar o tráfego e garantir a segurança. Estarão também
          disponíveis ambulâncias para prestar primeiros socorros ou, caso
          necessário, transportar participantes para a unidade de saúde mais
          próxima. 
        </p>
        <br></br>
        <p>
          <span className="relative block text-lg font-medium mb-1">
            <IconPack.ChevronRight className="absolute -left-4 top-1/2 -translate-y-1/2 " />
            {""}
            {"Distribuição de água durante a corrida"}
          </span>
          Haverá 4 pontos de distribuição de água ao longo do percurso: na Sede
          do Banco, no Radisson Blu, na Praça do Destacamento Feminino, e
          novamente na Sede do Banco no retorno.
        </p>


      </div>
    ),
  },
  {
    title: "Informações gerais",
    content: (
<div>
A 15ª Corrida Millennium bim terá lugar no sábado, 30 de novembro de
        2024, com início às 7h00. O aquecimento começará às 6h20, sob a
        orientação do ginásio IR Fitness.  
</div>
    ),
  },
  {
    title: "Contactos",
    content: (
      <p>
      Associação de Atletismo da Cidade de Maputo Azarias - +258 84 245 01 21 
      <br></br>
      Responsável pela organização: Tomas Bonnet - +258 82 84 46 510
      </p>
    ),
  },
];
