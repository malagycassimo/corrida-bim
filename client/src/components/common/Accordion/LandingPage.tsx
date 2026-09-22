import Image from "next/image";
import { AccordionProps } from ".";

export const landingPageAccordion: Omit<AccordionProps, "idx">[] = [
    {
        title: "Informações gerais",
        content: (
            <p>
                A 16.ª Corrida Millennium bim realizar-se-á no dia 25 de
                Outubro, em Maputo. As provas terão como local de partida e
                chegada a sede do Millennium bim. O aquecimento terá início às
                06h10 e as provas arrancarão às 06h30.
            </p>
        ),
    },
    {
        title: "Inscrições",
        content: (
            <div>
                <p>
                    As inscrições são gratuitas e devem ser feitas online,
                    através do website oficial. Excepcionam-se as categorias de
                    Juvenis, Federados e Pessoas com Deficiência
                    (Cadeirantes/Triciclos),
                    cujas inscrições devem ser efectuadas presencialmente na
                    Associação de Atletismo da Cidade de Maputo (Parque dos
                    Continuadores), de 05 a 16 de Outubro.
                </p>
                <p className="mt-4 text-xs font-normal text-zinc-700">
                    Vagas limitadas: Corrida (15 km): 2.000 participantes; Caminhada (7,2 km): 1.000 participantes.
                </p>
            </div>
        ),
    },
    {
        title: "Aquisição dos Kits",
        content: (
            <div>
                <p>
                    O levantamento do material será feito na sede do Millennium bim
                    (Rua dos Desportistas n.º 873-879/15, Maputo), entre os dias
                    21 a 23 de outubro, das 10h00 às 16h30, mediante apresentação
                    do recibo de inscrição e do respectivo documento de identificação.
                </p>
                <br />
                <p>
                    Excepcionalmente, os participantes portadores de deficiência 
                    deverão efectuar o levantamento na Associação
                    de Atletismo da Cidade de Maputo (Parque dos Continuadores),
                     entre os dias 21 a 23 de outubro.
                </p>
                    
                {/* <p>
                    O levantamento dos kits decorrerá de 21 a 23 de
                    Outubro, das 10h00 às 16h30, mediante
                    apresentação do recibo de inscrição e documento de
                    identificação, nos seguintes locais:
                </p> */}
                {/* <ul className="list-disc list-inside my-2 space-y-1">
                    <li>
                        Associação de Atletismo da Cidade de Maputo: atletas federados, juvenis e pessoas com deficiência.
                    </li>
                    <li>
                        Sede do Millennium bim (Rua dos Desportistas, n.º 873/879): demais inscritos.
                    </li>
                </ul>*/}
                <p className="text-xs text-zinc-700">
                    *Nota: Os kits da caminhada não incluem dorsal.
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
                    <span className="mb-1 block text-[0.95rem] font-normal">
                        {"Segurança no percurso"}
                    </span>
                    As provas decorrerão na via pública sem interrupção total do
                    trânsito, pelo que se solicita a máxima atenção de todos os
                    participantes. O evento contará com acompanhamento da
                    Polícia para controlo do tráfego e ambulâncias para
                    assistência médica e primeiros socorros.
                </p>
                <br></br>
                <div>
                    <span className="mb-1 block text-[0.95rem] font-normal">
                        {"Pontos de água"}
                    </span>
                    <p>Estarão disponíveis 3 pontos de hidratação ao longo do percurso:</p>
                    <ul className="list-disc list-inside my-2 space-y-1">
                        <li>Clube Naval</li>
                        <li>Em frente à Embaixada dos EUA</li>
                        <li>Clínica Trauma</li>
                    </ul>
                </div>
            </div>
        ),
    },
    {
        title: "Premiação",
        content: (
            <div>
                <p>
                    Serão atribuídas medalhas e prémios monetários aos 3
                    primeiros classificados (masculinos e femininos) das
                    categorias abaixo:
                </p>
                <ul className="list-disc list-inside my-2 space-y-1">
                    <li>Portadores de Deficiência – Triciclos</li>
                    <li>Portadores de Deficiência – Cadeiras de Rodas</li>
                    <li>Juvenis, Populares e Federados</li>
                    <li>Veteranos dos 35 – 45 anos femininos e 40 – 50 anos masculinos</li>
                    <li>Veteranos com mais de 45 anos femininos e mais de 50 anos masculinos</li>
                    <li>Estrangeiros com menos de 45 anos femininos e menos de 50 anos masculinos</li>
                    <li>Estrangeiros com mais de 45 anos femininos e mais de 50 anos masculinos.</li>
                    <li>Colaboradores do Millennium bim com menos de 40 anos</li>
                    <li>Colaboradores do Millennium bim com mais de 40 anos.</li>
                </ul>
                <p>
                    Haverá também distinção especial para o atleta
                    mais jovem e o mais idoso.
                </p>
                <p className="mt-3">
                    *A modalidade de Caminhada não tem carácter competitivo,
                    pelo que não haverá atribuição de prémios.
                </p>
            </div>
        ),
    },
    // {
    //     title: "Contactos",
    //     content: (
    //         <p>
    //             Associação de Atletismo da Cidade de Maputo Azarias - +258 84
    //             245 01 21
    //             <br></br>
    //             Responsável pela organização: Tomas Bonnet - +258 82 84 46 510
    //         </p>
    //     ),
    // },
];
