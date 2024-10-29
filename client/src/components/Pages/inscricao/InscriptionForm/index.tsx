"use client";
import { useEffect, useState } from "react";
import AnimatedComponent from "@/components/common/AnimatedComponent";
import StepProgress from "@/components/common/StepProgress";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { AvailabilityResponse, getIsAvailable } from "@/app/inscricao/action";

interface Step1Data {
    IDCode: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    province: string;
    dob: string;
    gender: string;
    emergencyName: string;
    emergencyPhone: string;
    emergencyFamiliarity: string;
}

interface Step2Data {
    category: string;
    route: string;
    shirt: string;
    accept: boolean;
}

export interface FormState {
    steps: string[];
    currentStep: number;
    step1: Step1Data;
    step2: Step2Data;
    availability: AvailabilityResponse;
}

const initialFormState: FormState = {
    steps: [
        "Dados pessoais",
        "Dados da corrida",
        "Confirmação dos dados",
        "Concluído",
    ],
    currentStep: 0,
    step1: {
        IDCode: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "+258 ",
        country: "Moçambique",
        province: "Maputo",
        dob: "",
        gender: "",
        emergencyName: "",
        emergencyPhone: "",
        emergencyFamiliarity: "",
    },
    step2: {
        category: "",
        shirt: "",
        route: "",
        accept: false,
    },
    availability: {
        codes: [],
        constraints: {
            populares: 0,
            veteranosI: 0,
            veteranosII: 0,
            estrangeiros: 0,
            total: 0,
        },
    },
};

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
