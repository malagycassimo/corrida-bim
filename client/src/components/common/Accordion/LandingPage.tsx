import Image from "next/image";
import { AccordionProps } from ".";
import { IconPack } from "../IconPack";

export const landingPageAccordion: Omit<AccordionProps, "idx">[] = [
    {
        title: "Informações gerais",
        subtitle: "Data e Horário",
        content: (
            <p>
                A 16ª Corrida Millennium bim terá lugar no dia 25 de
                outubro em Maputo, com início às 6h30 na Praça da Independência.
                O aquecimento começará às 6h10.
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
                    As categorias de Juvenis, Federados, Triciclos e Cadeirantes
                    devem inscrever-se presencialmente na Associação de Atletismo da
                    Cidade de Maputo, localizada no Parque dos Continuadores.
                </p>
                <br></br>
                <p>
                    As inscrições gerais para a corrida são limitadas
                    aos primeiros 2.000 atletas e para a caminhada aos 3.000
                    participantes (total máximo de 5.000 participantes).
                </p>
            </div>
        ),

    },
    {
        title: "Aquisição dos Kits",
        content: (
            <div>
                <p>
                    O levantamento dos kits será realizado de 21 a 23 de
                    outubro, na Associação de Atletismo da Cidade de Maputo para
                    os atletas federados e na sede do Millennium bim para os
                    demais participantes, mediante apresentação do recibo de
                    inscrição e do documento de identificação. Para a caminhada,
                    não haverá dorsais disponíveis.
                </p>
                <div className="flex justify-center items-center w-full my-6">
                    <Image
                        alt="Amostra do Kit - 16ª Corrida Millennium bim"
                        src={"/assets/images/Kit-Corrida-Transparencia.png"}
                        className="block mx-auto w-full max-w-md md:max-w-lg h-auto object-contain"
                        width={2517}
                        height={2250}
                    />
                </div>
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
                    Haverá 3 pontos de distribuição de água ao longo do
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
