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
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { categories, routes } from "@/utils/statics";
import { isAvailable } from "@/utils/helpers";

const formSchema = z.object({
    category: z.enum(
        categories.map(({ value }) => value) as unknown as readonly [
            string,
            ...string[],
        ],
        {
            message: "Selecione uma categoria válida.",
        },
    ),
    route: z.enum(
        routes.map(({ value }) => value) as unknown as readonly [
            string,
            ...string[],
        ],
        { message: "Selecione uma rota válida" },
    ),
    shirt: z.string(),
    accept: z.boolean().refine((val) => val === true, {
        message: "Concorde com os termos para prosseguir",
    }),
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
                                        {categories.map(({ value, label }) => (
                                            <SelectItem
                                                key={value}
                                                value={value}
                                                disabled={
                                                    !isAvailable(
                                                        value,
                                                        state.availability
                                                            .constraints,
                                                    )
                                                }
                                            >
                                                {`${label} ${isAvailable(value, state.availability.constraints) ? "" : "(Esgotado)"}`}
                                            </SelectItem>
                                        ))}
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
                                        {routes.map(({ value, label }) => (
                                            <SelectItem
                                                value={value}
                                                key={value}
                                            >
                                                {label}
                                            </SelectItem>
                                        ))}
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
                                        <SelectItem value="Small">S</SelectItem>
                                        <SelectItem value="Medium">
                                            M
                                        </SelectItem>
                                        <SelectItem value="Large">L</SelectItem>
                                        <SelectItem value="ExtraLarge">
                                            XL
                                        </SelectItem>
                                        <SelectItem value="DoubleExtraLarge">
                                            XXL
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="accept"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-row space-x-2 items-start">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Li e concordo com o{" "}
                                            <Link
                                                className="text-primary cursor-pointer"
                                                href={"/assets/regulamento.pdf"}
                                            >
                                                regulamento
                                            </Link>
                                        </FormLabel>
                                    </div>
                                </div>
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
                        <span className="hidden sm:inline-block">Anterior</span>
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
