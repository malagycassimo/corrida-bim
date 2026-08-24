import AnimatedComponent from "@/components/common/AnimatedComponent";
import { IconPack } from "@/components/common/IconPack";
import { useMemo } from "react";
import Image from "next/image";
import { FormState } from "./types";

export default function Step4({ state: { step2 } }: { state: FormState }) {
    const allowed = useMemo(() => {
        return (
            !step2.category.includes("Triciclos") &&
            !step2.category.includes("Cadeirantes") &&
            !step2.category.includes("Deficientes") &&
            !step2.category.includes("Juvenis") &&
            !step2.category.includes("Federados") &&
            !step2.category.includes("Thomas")
        );
    }, [step2]);

    return (
        <div className="py-5 px-2 sm:px-8 xl:px-28 space-y-4">
            <AnimatedComponent>
                {allowed ? (
                    <IconPack.Done className="mx-auto" />
                ) : (
                    <Image
                        src={"/assets/images/message.png"}
                        alt="Inscrição não foi concluída"
                        className="mx-auto w-36"
                        width={512}
                        height={512}
                    />
                )}
            </AnimatedComponent>
            <h2 className="text-center text-2xl font-semibold">
                {allowed
                    ? "Inscrição concluída"
                    : "Inscrição não foi concluída"}
            </h2>
            <p className="text-center text-zinc-600">
                {allowed
                    ? "Agradecemos por se inscrever na 16ª Corrida Millennium bim! Sua participação é muito importante para nós e estamos animados para vê-lo(a) no evento. Verifique sua caixa de entrada ou spam para o e-mail de confirmação."
                    : "Não é possível continuar a inscrição no site para a categoria seleccionada. As inscrições para as categorias de Juvenis, Federados, Triciclos e Cadeirantes deverão ser realizadas presencialmente na Associação de Atletismo da Cidade de Maputo, localizada no Parque dos Continuadores."}
            </p>
        </div>
    );
}
