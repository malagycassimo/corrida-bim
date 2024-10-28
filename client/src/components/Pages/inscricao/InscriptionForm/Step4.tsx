import AnimatedComponent from "@/components/common/AnimatedComponent";
import { IconPack } from "@/components/common/IconPack";
import { FormState } from ".";
import { useMemo } from "react";

export default function Step4({ state: { step2 } }: { state: FormState }) {
    const allowed = useMemo(() => {
        return (
            !step2.category.includes("Deficientes") &&
            !step2.category.includes("Juvenis") &&
            !step2.category.includes("Federados")
        );
    }, [step2]);

    return (
        <div className="py-5 px-8 xl:px-28 space-y-4">
            <AnimatedComponent>
                <IconPack.Done className="mx-auto" />
            </AnimatedComponent>
            <h2 className="text-center text-2xl font-semibold">
                {allowed ? "Inscrição concluída" : "Pré-Inscrição concluída"}
            </h2>
            <p className="text-center text-zinc-600">
                {allowed
                    ? "Agradecemos por se inscrever na 15ª Corrida Millennium bim! Sua participação é muito importante para nós e estamos animados para vê-lo(a) no dia 30 de Novembro. Verifique sua caixa de entrada ou spam para o e-mail de confirmação."
                    : "As categorias de Portadores de Deficiências, Juvenis e Federados deverão inscrever-se na Associação de Atletismo da Cidade de Maputo, sita no Parque dos Continuadores, entre os dias 28 de Outubro e 8 de Novembro de 2024."}
            </p>
        </div>
    );
}
