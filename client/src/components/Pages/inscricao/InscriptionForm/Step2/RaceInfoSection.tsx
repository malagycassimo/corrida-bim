import { UseFormReturn } from "react-hook-form";
import { CategorySelect } from "./CategorySelect";
import RouteSelect from "./RouteSelect";
import ShirtSizeSelect from "./ShirtSizeSelect";
import TermsCheckboxes from "./TermsCheckboxes";
import { z } from "zod";
import { raceFormSchema } from "./formSchema";
import { FormState } from "../types";

export const RaceInfoSection = ({
    form,
    state,
}: {
    form: UseFormReturn<z.infer<typeof raceFormSchema>>;
    state: FormState;
}) => {
    return (
        <div className="space-y-6">
            <div className="border-b border-zinc-100 pb-3">
                <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold">
                        ★
                    </span>
                    Dados da Prova & Participação
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                    Confira a sua categoria atribuída, escolha o percurso
                    pretendido e indique o tamanho da sua T-shirt oficial.
                </p>
            </div>

            <div className="space-y-5">
                <CategorySelect form={form} state={state} />
                <RouteSelect form={form} state={state} />
                <ShirtSizeSelect form={form} />
                <TermsCheckboxes form={form} />
            </div>
        </div>
    );
};
