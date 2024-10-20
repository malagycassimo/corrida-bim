"use client";

import AnimatedComponent from "@/components/common/AnimatedComponent";
import StepProgress from "@/components/common/StepProgress";
import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step4 from "./Step4";

export default function InscriptionForm() {
    const [formState, setFormState] = useState({
        steps: [
            "Dados pessoais",
            "Dados da corrida",
            "Confirmação dos dados",
            "Concluído",
        ],
        currentStep: 1,
    });
    return (
        <AnimatedComponent>
            <div className="lg:w-1/2 max-w-4xl py-11 rounded-3xl space-y-8 lg:mx-auto px-9 lg:px-20 shadow-lg relative m-6 lg:m-0 border  lg:-top-20 z-10 bg-white">
                <StepProgress
                    steps={formState.steps}
                    currentStep={formState.currentStep}
                />
                <hr />
                {formState.currentStep === 0 && (
                    <Step1 setState={setFormState} />
                )}
                {formState.currentStep === 1 && (
                    <Step2 setState={setFormState} />
                )}
                {formState.currentStep === 2 && (
                    <Step1 setState={setFormState} />
                )}
                {formState.currentStep === 3 && <Step4 />}
            </div>
        </AnimatedComponent>
    );
}
