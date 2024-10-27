"use client";
import Accordion from "@/components/common/Accordion";
import { landingPageAccordion } from "@/components/common/Accordion/LandingPage";
import AnimatedComponent from "@/components/common/AnimatedComponent";
import { IconPack } from "@/components/common/IconPack";
import { partnersImages } from "@/utils/assets";
import Image from "next/image";
import Link from "next/link";
import Loading from "../loading";
import { useState } from "react";

export default function Informacoes() {
    const [loaded, setLoaded] = useState(false);

    return (
        <main>
            {!loaded && <Loading />}

            {/* Hero section */}
            <section className="hidden relative h-[443px] lg:flex items-center">
                <Image
                    src={"/assets/images/info-hero.webp"}
                    alt="Corrida Millennium bim"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="mx-auto object-cover -z-50"
                    onLoad={() => setLoaded(true)}
                />

                <div className="text-white container mx-auto">
                    <AnimatedComponent>
                        <div className="max-w-[518px] px-6 space-y-4">
                            <h1 className="text-5xl font-semibold">
                                Informações
                            </h1>
                        </div>
                    </AnimatedComponent>
                </div>
            </section>

            <section className="mt-[100px] relative h-96 lg:hidden">
                <Image
                    alt="Informações"
                    src={"/assets/images/info-hero-m.webp"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                />
                <div className="absolute text-center text-white bg-primary bottom-0 right-0 left-0 py-4 text-lg font-semibold">
                    Informações
                </div>
            </section>
            {/* Accordion section  */}
            <section className="mb-20 mt-14 mx-4 xl:mx-0">
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
                    {partnersImages.map(({ src, alt }) => (
                        <div className="relative w-36 h-24 " key={alt}>
                            <Image
                                key={alt}
                                src={src}
                                alt={alt}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
