import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./Step1/formSchema";
import { Dispatch, SetStateAction } from "react";
import { AvailabilityResponse } from "@/app/inscricao/action";
import { raceFormSchema } from "./Step2/formSchema";

export interface Step1Data {
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

export interface Step2Data {
    category: string;
    route: string;
    shirt: string;
    accept: boolean;
    acceptterms: boolean;
}

export interface FormState {
    steps: string[];
    currentStep: number;
    step1: Step1Data;
    step2: Step2Data;
    availability: AvailabilityResponse;
}
export interface FormProps {
    state: FormState;
    setState: Dispatch<SetStateAction<FormState>>;
}

export interface SectionProps {
    form: UseFormReturn<z.infer<typeof formSchema>>;
}
export interface Step2SectionProps {
    form: UseFormReturn<z.infer<typeof raceFormSchema>>;
}

export interface ConfirmationField {
    field: string;
    value: string;
}
