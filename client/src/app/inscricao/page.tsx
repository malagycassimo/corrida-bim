import AnimatedComponent from "@/components/common/AnimatedComponent";
import InscriptionForm from "@/components/Pages/inscricao/InscriptionForm";
import Image from "next/image";

export default function Inscricao() {
    return (
        <main className="min-h-svh">
            {/* Hero section */}
            <section className="hidden relative h-[443px] lg:flex items-center">
                <Image
                    src={"/assets/images/inscricao-hero.webp"}
                    alt="Corrida Millennium bim"
                    fill
                    className="mx-auto object-cover -z-50"
                />

                <div className="text-white container mx-auto">
                    <AnimatedComponent>
                        <div className="max-w-[518px] px-6 space-y-4">
                            <h1 className="text-5xl font-semibold">
                                Inscrição
                            </h1>
                        </div>
                    </AnimatedComponent>
                </div>
            </section>
            <section className="mt-[100px] relative h-96 lg:hidden">
                <Image
                    alt="Informações"
                    src={"/assets/images/inscricao-hero-m.webp"}
                    fill
                    className="object-cover"
                />
                <div className="absolute text-center text-white bg-primary bottom-0 right-0 left-0 py-4 text-lg font-semibold">
                    Inscrição
                </div>
            </section>

            <InscriptionForm />
        </main>
    );
}
