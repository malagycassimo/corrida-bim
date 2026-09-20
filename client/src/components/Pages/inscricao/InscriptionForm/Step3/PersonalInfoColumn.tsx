import { CONFIRMATION_LABELS } from "../constants";
import { Step1Data } from "../types";
import { ConfirmationField } from "./ConfirmationField";

export const PersonalInfoColumn = ({ step1 }: { step1: Step1Data }) => (
    <div className="w-full bg-zinc-50/60 border border-zinc-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex items-center gap-2 pb-2.5 mb-2 border-b border-zinc-200/60">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <h3 className="font-bold text-zinc-800 text-xs sm:text-sm uppercase tracking-wide">
                Dados Pessoais
            </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-left">
            <ConfirmationField
                field={CONFIRMATION_LABELS.FIELDS.FULL_NAME}
                value={`${step1.firstName} ${step1.lastName}`}
            />
            <ConfirmationField
                field={CONFIRMATION_LABELS.FIELDS.ID}
                value={step1.IDCode}
            />
            <ConfirmationField
                field="E-mail"
                value={step1.email}
            />
            <ConfirmationField
                field={CONFIRMATION_LABELS.FIELDS.PHONE}
                value={step1.phone}
            />
            <ConfirmationField
                field="Nacionalidade"
                value={
                    step1.country === "Moçambique"
                        ? `${step1.country} (${step1.province || "Maputo"})`
                        : step1.country
                }
            />
        </div>
    </div>
);
