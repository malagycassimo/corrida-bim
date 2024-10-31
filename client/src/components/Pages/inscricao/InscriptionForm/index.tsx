"use client";
import { useEffect, useState } from "react";
import AnimatedComponent from "@/components/common/AnimatedComponent";
import StepProgress from "@/components/common/StepProgress";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { getIsAvailable } from "@/app/inscricao/action";
import { FormState } from "./types";
import { initialFormState } from "./constants";

export default function InscriptionForm() {
    const [formState, setFormState] = useState<FormState>(initialFormState);

    useEffect(() => {
        const fetchAvailability = async () => {
            const availability = await getIsAvailable();
            setFormState((prevState) => ({
                ...prevState,
                availability,
            }));
        };

        fetchAvailability();
    }, []);

    const renderStep = () => {
        const steps = {
            0: <Step1 state={formState} setState={setFormState} />,
            1: <Step2 state={formState} setState={setFormState} />,
            2: <Step3 state={formState} setState={setFormState} />,
            3: <Step4 state={formState} />,
        };

        return steps[formState.currentStep as keyof typeof steps];
    };

    return (
        <AnimatedComponent>
            <div className="lg:w-1/2 max-w-4xl py-11 rounded-3xl space-y-8 lg:mx-auto px-9 lg:px-20 shadow-lg relative m-6 lg:m-0 border lg:-top-20 z-10 bg-white">
                <StepProgress
                    steps={formState.steps}
                    currentStep={formState.currentStep}
                />
                <hr />
                {renderStep()}
            </div>
        </AnimatedComponent>
    );
}
