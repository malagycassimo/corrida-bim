import AnimatedComponent from "@/components/common/AnimatedComponent";
import { IconPack } from "@/components/common/IconPack";
import { FormState } from ".";
import { useMemo } from "react";
import Image from "next/image";

export default function Step4({ state: { step2 } }: { state: FormState }) {
    const allowed = useMemo(() => {
        return (
            !step2.category.includes("Deficientes") &&
            !step2.category.includes("Juvenis") &&
            !step2.category.includes("Federados") &&
            !step2.category.includes("Thomas")
        );
    }, [step2]);

    return (
        <div className="py-5 px-8 xl:px-28 space-y-4">
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
                    ? "Agradecemos por se inscrever na 15ª Corrida Millennium bim! Sua participação é muito importante para nós e estamos animados para vê-lo(a) no dia 30 de Novembro. Verifique sua caixa de entrada ou spam para o e-mail de confirmação."
                    : "Não é possível continuar a inscrição para a categoria seleccionada. As inscrições para as categorias de Portadores de Deficiências, Juvenis, Thomas e Federados deverão ser realizadas presencialmente na Associação de Atletismo da Cidade de Maputo, localizada no Parque dos Continuadores, entre os dias 28 de Outubro e 8 de Novembro de 2024."}
            </p>
        </div>
    );
}
