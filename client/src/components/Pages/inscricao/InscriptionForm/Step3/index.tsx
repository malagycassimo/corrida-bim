import { useMemo } from "react";
import { FormProps } from "../types";
import { isAllowedCategory } from "@/utils/helpers";
import { submitData } from "@/app/inscricao/action";
import { CONFIRMATION_LABELS } from "./constants";
import { ConfirmationSection } from "./ConfirmationSection";
import { NavigationButtons } from "./NavigationButtons";

export default function Step3({
    state: { step1, step2 },
    setState,
}: FormProps) {
    const allowed = useMemo(() => isAllowedCategory(step2.category), [step2]);

    const handlePrevious = () => {
        setState((state) => ({
            ...state,
            currentStep: state.currentStep - 1,
        }));
    };

    const handleNext = () => {
        if (allowed) {
            submitData({ ...step1, ...step2 });
        }
        setState((state) => ({
            ...state,
            currentStep: state.currentStep + 1,
        }));
    };

    return (
        <div className="space-y-10">
            <h1 className="text-center text-3xl font-semibold">
                {CONFIRMATION_LABELS.TITLE}
            </h1>
            <ConfirmationSection step1={step1} step2={step2} />
            <NavigationButtons
                onPrevious={handlePrevious}
                onNext={handleNext}
            />
        </div>
    );
}
