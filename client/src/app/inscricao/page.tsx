"use client";
import AnimatedComponent from "@/components/common/AnimatedComponent";
import InscriptionForm from "@/components/Pages/inscricao/InscriptionForm";
import Image from "next/image";
import { useState } from "react";
import Loading from "../loading";

export default function Inscricao() {
    const [loaded, setLoaded] = useState(false);
    return (
        <main className="min-h-svh">
            {!loaded && <Loading />}

            {/* Hero section */}
            <section className="hidden relative h-[443px] lg:flex items-center">
                <Image
                    src={"/assets/images/Banner-App-Corrida.jpg"}
                    alt="Corrida Millennium bim"
                    fill
                    className="mx-auto object-cover -z-50"
                    onLoad={() => setLoaded(true)}
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent -z-40" />

                <div className="text-white container mx-auto">
                    <AnimatedComponent>
                        <div className="max-w-[518px] px-6 space-y-4">
                            <h1 className="text-5xl font-semibold drop-shadow-md">
                                Inscrição
                            </h1>
                        </div>
                    </AnimatedComponent>
                </div>
            </section>
            <section className="mt-[100px] relative h-96 lg:hidden">
                <Image
                    alt="Inscrição"
                    src={"/assets/images/Banner-App-Corrida.jpg"}
                    fill
                    className="object-cover"
                    onLoad={() => setLoaded(true)}
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute text-center text-white bg-primary bottom-0 right-0 left-0 py-4 text-lg font-semibold">
                    Inscrição
                </div>
            </section>

            <InscriptionForm />
        </main>
    );
}
