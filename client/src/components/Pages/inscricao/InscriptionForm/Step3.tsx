import { Dispatch, SetStateAction } from "react";
import { FormState } from ".";
import { IconPack } from "@/components/common/IconPack";

export default function Step3({
    state: { step1, step2 },
    setState,
}: {
    state: FormState;
    setState: Dispatch<SetStateAction<FormState>>;
}) {
    function onPrevious() {
        setState((state) => {
            return { ...state, currentStep: state.currentStep - 1 };
        });
    }
    function onNext() {
        setState((state) => {
            return { ...state, currentStep: state.currentStep + 1 };
        });
    }
    return (
        <div className="space-y-10">
            <h1 className="text-center text-3xl font-semibold">
                Confirmação dos dados
            </h1>

            <div className="flex justify-between space-x-10">
                <div className="space-y-3 flex-1">
                    <Field field="Bilhete de Identidade" value={step1.BI} />
                    <Field
                        field="Nome completo"
                        value={`${step1.firstName} ${step1.lastName}`}
                    />
                    <Field field="Número de telefone" value={step1.phone} />
                </div>
                <div className="space-y-3 flex-1">
                    <Field field="Categoria" value={step2.category} />
                    <Field field="Percurso" value={step2.route} />
                    <Field
                        field="Contacto de emergência"
                        value={`${step1.emergencyName} - ${step1.emergencyPhone}`}
                    />
                </div>
            </div>

            <div className="flex justify-between items-center">
                <button
                    onClick={onPrevious}
                    className="btn border-2 text-zinc-600 from-primary to-secondary flex"
                >
                    <IconPack.ArrowRight
                        className="rotate-180"
                        stroke="#52525b"
                    />{" "}
                    <span>Anterior</span>
                </button>
                <button
                    onClick={onNext}
                    className="ml-auto btn text-white bg-gradient-to-br from-primary to-secondary flex"
                >
                    <span>Seguinte</span> <IconPack.ArrowRight />
                </button>
            </div>
        </div>
    );
}

const Field = ({ field, value }: { field: string; value: string }) => {
    return (
        <div className="border-b border-b-zinc-300 space-y-3">
            <h4 className="font-semibold text-zinc-800">{field}</h4>
            <span className="text-primary">{value}</span>
        </div>
    );
};
