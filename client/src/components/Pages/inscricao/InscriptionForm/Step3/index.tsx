import { useMemo, useState } from "react";
import { FormProps } from "../types";
import { isAllowedCategory } from "@/utils/helpers";
import { submitData } from "@/app/inscricao/action";
import { ConfirmationSection } from "./ConfirmationSection";
import { NavigationButtons } from "./NavigationButtons";
import { CONFIRMATION_LABELS } from "../constants";

export default function Step3({
    state: { step1, step2 },
    setState,
}: FormProps) {
    const allowed = useMemo(() => isAllowedCategory(step2.category), [step2]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handlePrevious = () => {
        setState((state) => ({
            ...state,
            currentStep: state.currentStep - 1,
        }));
    };

    const handleNext = async () => {
        if (!allowed) return;

        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const result = await submitData({ ...step1, ...step2 });
            if (result.success) {
                setState((state) => ({
                    ...state,
                    currentStep: state.currentStep + 1,
                }));
            } else {
                setErrorMessage(
                    result.error || "Ocorreu um erro ao realizar a inscrição. Tente novamente."
                );
            }
        } catch (error) {
            console.error("Erro na inscrição:", error);
            setErrorMessage("Erro de conexão ao servidor. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-10">
            <h1 className="text-center text-3xl font-semibold">
                {CONFIRMATION_LABELS.TITLE}
            </h1>
            {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center font-medium">
                    {errorMessage}
                </div>
            )}
            <ConfirmationSection step1={step1} step2={step2} />
            <NavigationButtons
                onPrevious={handlePrevious}
                onNext={handleNext}
                isSubmitting={isSubmitting}
            />
        </div>
    );
}
