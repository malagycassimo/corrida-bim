import Image from "next/image";
import { AccordionProps } from ".";
import { IconPack } from "../IconPack";

export const landingPageAccordion: Omit<AccordionProps, "idx">[] = [
    {
        title: "Informações gerais",
        subtitle: "Data e Horário",
        content: (
            <p>
                A 15ª Corrida Millennium bim terá lugar no sábado, 30 de
                novembro de 2024, com início às 7h00 na Praça da Independência.
                O aquecimento começará às 6h20, sob a orientação do ginásio IR
                Fitness.
            </p>
        ),
    },
    {
        title: "Inscrições",
        content: (
            <div>
                <p className="font-medium">
                    As inscrições são gratuitas e podem ser feitas online.
                </p>
                <br></br>
                <p>
                    As categorias de Portadores de Deficiências, Juvenis e
                    Federados devem inscrever-se na Associação de Atletismo da
                    Cidade de Maputo, localizada no Parque dos Continuadores,
                    entre 1 e 15 de Novembro.
                </p>
                <br></br>
                <p>
                    As inscrições gerais para a corrida de 15 km são limitadas
                    aos primeiros 2000 atletas. Para a caminhada de 7 km, não há
                    limite máximo de participantes
                </p>
            </div>
        ),
    },
    {
        title: "Aquisição dos Kits",
        content: (
            <div>
                <p>
                    A entrega dos dorsais (para os atletas da corrida pedestre -
                    15km) será feita na Associação de Atletismo da Cidade de
                    Maputo nos dias 27 e 28 de novembro, mediante apresentação
                    do recibo de inscrição e do documento de identificação. Para
                    a caminhada, não haverá dorsais disponíveis
                </p>
                <Image
                    alt="Camiseta - 15 Corrida Millenium bim"
                    src={"/assets/images/T-Shirt.png"}
                    className="w-96 h-auto mx-auto"
                    width={2517}
                    height={2250}
                />
            </div>
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
                    As provas terão lugar à beira da estrada, sem interrupção
                    total da via pública. Solicitamos a todos os participantes
                    que tenham o máximo cuidado com o trânsito ao longo do
                    percurso. A polícia estará presente para monitorar o tráfego
                    e garantir a segurança. Estarão também disponíveis
                    ambulâncias para prestar primeiros socorros ou, caso
                    necessário, transportar participantes para a unidade de
                    saúde mais próxima.
                </p>
                <br></br>
                <p>
                    <span className="relative block text-lg font-medium mb-1">
                        <IconPack.ChevronRight className="absolute -left-4 top-1/2 -translate-y-1/2 " />
                        {""}
                        {"Distribuição de água durante a corrida"}
                    </span>
                    Haverá 4 pontos de distribuição de água ao longo do
                    percurso: na Sede do Banco, no Radisson Blu, na Praça do
                    Destacamento Feminino, e novamente na Sede do Banco no
                    retorno.
                </p>
            </div>
        ),
    },
    {
        title: "Premiação",
        content: (
            <div>
                Aos 3 primeiros finalistas, em masculinos e femininos, bem como
                das categorias de Portadores de Deficiência em triciclo/cadeiras
                de rodas, Juvenis, Populares, Veteranas dos 35 aos 45 anos,
                Veteranas com mais de 45 anos, Veteranos dos 40 aos 50 anos,
                Veteranos acima dos 50 anos, Colaboradores do Millennium bim,
                Federados, Estrangeiros com menos de 50 anos e Estrangeiros com
                mais de 50 anos da prova de corrida, serão atribuídas medalhas e
                prémios monetários. O atleta mais jovem e o mais velho serão
                também recompensados. Na prova de caminhada não estão
                contempladas premiações
            </div>
        ),
    },
    {
        title: "Contactos",
        content: (
            <p>
                Associação de Atletismo da Cidade de Maputo Azarias - +258 84
                245 01 21
                <br></br>
                Responsável pela organização: Tomas Bonnet - +258 82 84 46 510
            </p>
        ),
    },
];
