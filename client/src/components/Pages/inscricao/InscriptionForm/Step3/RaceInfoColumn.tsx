import { CONFIRMATION_LABELS } from "../constants";
import { Step1Data, Step2Data } from "../types";
import { ConfirmationField } from "./ConfirmationField";

export const RaceInfoColumn = ({
    step1,
    step2,
}: {
    step1: Step1Data;
    step2: Step2Data;
}) => (
    <div className="w-full bg-zinc-50/60 border border-zinc-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex items-center gap-2 pb-2.5 mb-2 border-b border-zinc-200/60">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <h3 className="font-bold text-zinc-800 text-xs sm:text-sm uppercase tracking-wide">
                Detalhes da Prova
            </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-left">
            <ConfirmationField
                field={CONFIRMATION_LABELS.FIELDS.CATEGORY}
                value={step2.category}
            />
            <ConfirmationField
                field={CONFIRMATION_LABELS.FIELDS.ROUTE}
                value={step2.route}
            />
            <ConfirmationField
                field="Tamanho da T-shirt Oficial"
                value={step2.shirt}
            />
            <ConfirmationField
                field={CONFIRMATION_LABELS.FIELDS.EMERGENCY}
                value={`${step1.emergencyName} (${step1.emergencyFamiliarity}) — ${step1.emergencyPhone}`}
            />
        </div>
    </div>
);
