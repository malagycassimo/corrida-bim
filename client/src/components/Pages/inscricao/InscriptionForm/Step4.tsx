import AnimatedComponent from "@/components/common/AnimatedComponent";
import { IconPack } from "@/components/common/IconPack";

export default function Step4() {
    return (
        <div className="py-5 px-8 xl:px-28 space-y-4">
            <AnimatedComponent>
                <IconPack.Done className="mx-auto" />
            </AnimatedComponent>
            <h2 className="text-center text-2xl font-semibold">
                Inscrição concluída
            </h2>
            <p className="text-center text-zinc-600">
                Agradecemos por se inscrever na 15ª Corrida Millennium bim! Sua
                participação é muito importante para nós e estamos animados para
                vê-lo(a) no dia 30 de Novembro.
            </p>
        </div>
    );
}
