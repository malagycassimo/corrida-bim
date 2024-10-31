import { useForm } from "react-hook-form";
import { FormProps } from "../types";
import * as z from "zod";
import { raceFormSchema } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { NavigationButtons } from "../NavigationButtons";
import { RaceInfoSection } from "./RaceInfoSection";

export default function Step2({ state, setState }: FormProps) {
    const form = useForm<z.infer<typeof raceFormSchema>>({
        resolver: zodResolver(raceFormSchema),
        defaultValues: state.step2 as unknown as z.infer<typeof raceFormSchema>,
    });

    const onSubmit = (values: z.infer<typeof raceFormSchema>) => {
        setState((state) => ({
            ...state,
            step2: values,
            currentStep: 2,
        }));
    };

    const onPrevious = () => {
        setState((state) => ({
            ...state,
            currentStep: state.currentStep - 1,
        }));
    };

    return (
        <Form {...form}>
            <h1 className="text-center text-3xl font-semibold">
                Dados da corrida
            </h1>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <RaceInfoSection form={form} state={state} />
                <NavigationButtons onPrevious={onPrevious} />
            </form>
        </Form>
    );
}
