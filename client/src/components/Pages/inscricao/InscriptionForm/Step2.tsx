import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { IconPack } from "@/components/common/IconPack";
import { Dispatch, SetStateAction } from "react";
import { FormState } from ".";

const formSchema = z.object({
    category: z.enum(["walk", "disabled", "pedestrians"], {
        message: "Selecione uma categoria válida.",
    }),
    route: z.string(),
    shirt: z.string(),
});

export default function Step2({
    state,
    setState,
}: {
    state: FormState;
    setState: Dispatch<SetStateAction<FormState>>;
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: state.step2 as unknown as z.infer<typeof formSchema>,
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        setState((state) => {
            return { ...state, step2: values, currentStep: 2 };
        });
        setTimeout(() => {
            console.log(values);
        }, 2000);
    }

    function onPrevious() {
        setState((state) => {
            return { ...state, currentStep: state.currentStep - 1 };
        });
    }

    return (
        <Form {...form}>
            <h1 className="text-center text-3xl font-semibold">
                Dados da corrida
            </h1>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-3">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Categoria</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a categoria" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="walk">
                                            Caminhada
                                        </SelectItem>
                                        <SelectItem value="disabled">
                                            Deficientes
                                        </SelectItem>
                                        <SelectItem value="pedestrians">
                                            Pedestres
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="route"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Percurso</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o seu percurso" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="m@example.com">
                                            Here - Here
                                        </SelectItem>
                                        <SelectItem value="m@google.com">
                                            There - There
                                        </SelectItem>
                                        <SelectItem value="m@support.com">
                                            Here - Here
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="shirt"
                        render={({ field }) => (
                            <FormItem className="w-fit">
                                <FormLabel>Tamaho da camiseta</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o seu tamanho" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="small">
                                            Small
                                        </SelectItem>
                                        <SelectItem value="large">
                                            Large
                                        </SelectItem>
                                        <SelectItem value="extralarge">
                                            Extra large
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-between items-center">
                    <button
                        onClick={onPrevious}
                        className="btn border-2 text-zinc-600 from-primary to-secondary flex"
                    >
                        <IconPack.ArrowRight
                            className="rotate-180"
                            stroke="#52525b"
                        />{" "}
                        <span>Anterior</span>
                    </button>
                    <button
                        type="submit"
                        className="ml-auto btn text-white bg-gradient-to-br from-primary to-secondary flex"
                    >
                        <span>Seguinte</span> <IconPack.ArrowRight />
                    </button>
                </div>
            </form>
        </Form>
    );
}
