import { useForm } from "react-hook-form";
import { FormProps } from "../types";
import * as z from "zod";
import { formSchema } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import PersonalInformationSection from "./PersonalInformationSection";
import EmergencyContactSection from "./EmergencyContactSection";
import { SubmitButton } from "../SubmitButton";

export default function Step1({ state, setState }: FormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: state.step1 as unknown as z.infer<typeof formSchema>,
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setState((state) => ({
            ...state,
            step1: {
                ...values,
                dob: values.dob.toISOString(),
            },
            currentStep: 1,
        }));
    };

    return (
        <Form {...form}>
            <h1 className="text-center text-3xl font-semibold">
                Dados pessoais
            </h1>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <PersonalInformationSection form={form} />
                <EmergencyContactSection form={form} />
                <SubmitButton />
            </form>
        </Form>
    );
}
