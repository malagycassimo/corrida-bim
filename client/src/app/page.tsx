"use client";
import Accordion from "@/components/common/Accordion";
import { landingPageAccordion } from "@/components/common/Accordion/LandingPage";
import AnimatedComponent from "@/components/common/AnimatedComponent";
import Carousel from "@/components/common/Carousel";
import ShiftingCountdown from "@/components/common/Countdown";
import { IconPack } from "@/components/common/IconPack";
import Map from "@/components/common/Map";
import { carouselImages, partnersImages } from "@/utils/assets";
import { EmblaOptionsType } from "embla-carousel";
import Image from "next/image";
import Link from "next/link";
import Loading from "./loading";
import { useState } from "react";
import { shuffleArray } from "@/utils/helpers";

const OPTIONS: EmblaOptionsType = { loop: true };

export default function Home() {
    const [loaded, setLoaded] = useState(false);

    return (
        <main>
            {!loaded && <Loading />}

            {/* Hero section */}
            <section className="hidden relative h-[750px] lg:flex items-center">
                <Image
                    src={"/assets/images/Banner-App-Corrida.jpg"}
                    alt="Corrida Millennium bim"
                    fill
                    className="mx-auto object-cover -z-50"
                    onLoad={() => setLoaded(true)}
                    quality={100}
                    priority
                />

                <div className="text-white container mx-auto">
                    <AnimatedComponent>
                        <div className="max-w-[700px] px-6 space-y-4">
                            <h1 className="text-[4.6rem] leading-none font-bold">
                                16ª Corrida Millennium bim
                            </h1>
                            <p className="text-lg">
                                Venha participar da corrida mais emocionante do
                                ano!
                                <br />
                                Junte-se a nós no dia 25 de Outubro.
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
            <section className="lg:hidden mt-[295px] relative h-[752px]">
                <Image
                    src={"/assets/images/Banner-App-Corrida.jpg"}
                    alt="Corrida Millennium bim"
                    fill
                    className="mx-auto object-cover -z-50"
                    onLoad={() => setLoaded(true)}
                    quality={100}
                    priority
                />
                <AnimatedComponent>
                    <div className="py-9 text-center px-6 text-white bg-gradient-to-br from-primary to-secondary mx-4 sm:mx-auto max-w-xl rounded-xl -translate-y-1/2">
                        <h1 className="text-4xl font-bold">
                            16ª Corrida Millennium bim
                        </h1>
                        <p className="mt-6 mb-8">
                            Venha participar da corrida mais emocionante do ano!
                            Junte-se a nós no dia 25 de Outubro.
                        </p>
                        <Link
                            href={"/inscricao"}
                            className="btn w-full flex justify-center bg-white text-black"
                        >
                            <span>Inscreva-se</span>{" "}
                            <IconPack.ArrowRight stroke="black" />
                        </Link>
                    </div>
                </AnimatedComponent>
            </section>

            {/* Countdown section  */}
            <section className="mt-16 mx-10 sm:mx-0">
                <h2 className="text-center max-w-2xl text-2xl lg:text-3xl font-bold lg:font-bold mx-auto mb-11">
                    A sua jornada na corrida mais aguardada de Maputo começa em
                </h2>
                <ShiftingCountdown />
            </section>

            {/* Routes section  */}
            <section className="mt-14 mb-20" id="route">
                <h2 className="max-w-md mx-10 sm:mx-auto text-2xl font-bold lg:text-3xl lg:font-bold text-center">
                    Veja os percursos na Corrida do Millennium bim
                </h2>
                <p className="mx-10 sm:mx-auto text-lg text-center mt-2 text-neutral-800">
                    Selecione o percurso pretendido para ver a sua rota no mapa
                </p>
                <Map />
            </section>

            {/* Call to action */}
            <section className="h-80 relative">
                <Image
                    src={"/assets/images/CalltoAction.jpg"}
                    alt="Junte-se a nós"
                    fill
                    className="-z-50 object-cover"
                />
                <div className="h-full bg-primary/90 flex justify-center items-center">
                    <AnimatedComponent>
                        <div className="max-w-lg space-y-4 px-10 lg:px-0">
                            <h2 className="text-center text-white text-2xl lg:text-3xl font-semibold">
                                A Corrida Millennium bim está de volta! Junte-se
                                a nós
                            </h2>
                            <Link
                                href={"/inscricao"}
                                className="btn w-full sm:w-fit flex justify-center bg-white text-black mx-auto"
                            >
                                <span>Inscreva-se</span>{" "}
                                <IconPack.ArrowRight stroke="black" />
                            </Link>
                        </div>
                    </AnimatedComponent>
                </div>
            </section>

            {/* Partners section  */}
            <section className="space-y-12 mt-20 mb-14">
                <h1 className="text-center text-3xl lg:text-4xl font-bold">
                    Parceiros
                </h1>
                <div className="container max-w-[920px] mx-auto flex flex-wrap gap-x-[106px] gap-y-3 justify-center">
                    {partnersImages.map(({ src, alt, customStyle }) => (
                        <div
                            className={`relative w-36 h-24  ${customStyle}`}
                            key={alt}
                        >
                            <Image
                                key={alt}
                                src={src}
                                alt={alt}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Gallery section  */}
            <section className="space-y-12">
                <h1 className="text-center text-3xl lg:text-4xl font-bold">
                    Galeria
                </h1>
                <div className="space-y-5">
                    <Carousel
                        slides={shuffleArray(carouselImages)}
                        options={OPTIONS}
                    />
                    <Carousel
                        slides={carouselImages}
                        options={OPTIONS}
                        autoScrollOptions={{ direction: "backward" }}
                    />
                </div>
            </section>

            {/* Accordion section  */}
            <section className="space-y-12 mb-20 mt-14 mx-4 xl:mx-0">
                <h1 className="text-center text-3xl lg:text-4xl font-bold">
                    Informações
                </h1>
                <div className="container mx-auto space-y-1">
                    {landingPageAccordion.map(
                        ({ title, subtitle, content }, idx) => (
                            <Accordion
                                key={idx}
                                idx={idx + 1}
                                title={title}
                                content={content}
                                subtitle={subtitle}
                            />
                        ),
                    )}
                </div>
            </section>
        </main>
    );
}
