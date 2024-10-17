import AnimatedComponent from "@/components/common/AnimatedComponent";
import ShiftingCountdown from "@/components/common/Countdown";
import { IconPack } from "@/components/common/IconPack";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main>
            {/* Hero section */}
            <section className="relative h-[750px] flex items-center">
                <Image
                    src={"/assets/images/hero.jpg"}
                    alt="Corrida Millenium BIM"
                    fill
                    className="mx-auto object-cover -z-50"
                />

                <div className="text-white container mx-auto">
                    <AnimatedComponent>
                        <div className="max-w-[470px] space-y-4">
                            <h1 className="text-5xl font-semibold">
                                15ª Corrida Millennium BIM
                            </h1>
                            <p>
                                Venha participar da corrida mais emocionante do
                                ano!
                                <br />
                                Junte-se a nós no dia 30 de Novembro de 2024.
                            </p>
                            <Link
                                href={"/inscricao"}
                                className="btn bg-white text-black"
                            >
                                <span>Inscreva-se</span>{" "}
                                <IconPack.ArrowRight stroke="black" />
                            </Link>
                        </div>
                    </AnimatedComponent>
                </div>
            </section>

            {/* Countdown section  */}
            <section className="mt-16">
                <h2 className="text-center max-w-2xl text-3xl font-semibold mx-auto mb-11">
                    A sua jornada na corrida mais aguardada de Maputo começa em
                </h2>
                <ShiftingCountdown />
            </section>

            {/* Routes section  */}
            <section className="mt-14 mb-20">
                <h2 className="max-w-md text-3xl font-semibold text-center mx-auto">
                    Veja os percursos na Corrida do Millennium bim
                </h2>
                <p className="text-lg text-center mt-2 text-neutral-800">
                    Selecione o percurso pretendido para ver a sua rota no mapa
                </p>
            </section>

            {/* Call to action */}
            <section className="h-80 relative">
                <Image
                    src={"/assets/images/CalltoAction.jpg"}
                    alt="Junte-se a nós"
                    fill
                    objectFit="cover"
                    className="-z-50"
                />
                <div className="h-full bg-primary/90 flex justify-center items-center">
                    <AnimatedComponent>
                        <div className="max-w-lg space-y-4">
                            <h2 className="text-center text-white text-3xl font-semibold">
                                A Corrida Millenium BIM está de volta! Junte-se
                                a nós
                            </h2>
                            <Link
                                href={"/inscricao"}
                                className="btn bg-white text-black mx-auto"
                            >
                                <span>Inscreva-se</span>{" "}
                                <IconPack.ArrowRight stroke="black" />
                            </Link>
                        </div>
                    </AnimatedComponent>
                </div>
            </section>
        </main>
    );
}
