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
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { IconPack } from "@/components/common/IconPack";
import { Dispatch, SetStateAction } from "react";
import { countries, provinces } from "@/utils/statics";
import { FormState } from ".";
import { PhoneInput } from "@/components/ui/PhoneInput";

const formSchema = z.object({
    IDCode: z.string().min(9, {
        message: "O bilhete de identidade possui no mínimo 9 caracteres",
    }),
    firstName: z.string().min(2, {
        message: "O nome deve conter no mínimo 2 caracteres",
    }),
    email: z.string().email({ message: "Insira um email válido" }),
    lastName: z.string().min(2, {
        message: "O nome deve conter no mínimo 2 caracteres",
    }),
    phone: z.string().min(9, {
        message: "Insira um número de telefone válido com código do país",
    }),
    province: z.enum(
        provinces.map(({ value }) => value) as unknown as readonly [
            string,
            ...string[],
        ],
        {
            message: "Selecione uma província válida",
        },
    ),
    dob: z.date({
        required_error: "Selecione uma data válida",
        message: "Selecione uma data válida",
    }),
    country: z.enum(
        countries.map(({ value }) => value) as unknown as readonly [
            string,
            ...string[],
        ],
        { message: "Selecione um país válido" },
    ),
    gender: z.enum(["M", "F", "N"], {
        message: "Selecione um valor válido",
    }),
    emergencyName: z.string().min(2, {
        message: "O nome deve conter no mínimo 2 caracteres",
    }),
    emergencyPhone: z
        .string()
        .regex(
            /^(8[2-7])\d{7}$/,
            "Número de telefone inválido. Use o formato: 8X1234567",
        ),
    emergencyFamiliarity: z.string().min(2, {
        message: "Selecione um valor válido",
    }),
});

export default function Step1({
    state,
    setState,
}: {
    state: FormState;
    setState: Dispatch<SetStateAction<FormState>>;
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: state.step1 as unknown as z.infer<typeof formSchema>,
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        setState((state) => {
            const formattedValues = {
                ...values,
                dob: values.dob.toISOString(), // ou format(values.dob, 'yyyy-MM-dd')
            };
            return { ...state, step1: formattedValues, currentStep: 1 };
        });
    }
    return (
        <Form {...form}>
            <h1 className="text-center text-3xl font-semibold">
                Dados pessoais
            </h1>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-3">
                    <FormField
                        control={form.control}
                        name="IDCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bilhete de Identidade</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ex: 123456789120A "
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex md:flex-row flex-col space-y-3 md:space-y-0 md:space-x-6">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Teu Primeiro Nome "
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Apelido</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Teu Apelido"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Ex: teuemail@gmaill.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <PhoneInput control={form.control} name="phone" />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nacionalidade</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue="Moçambique"
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a sua nacionalidade" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {countries.map(
                                            ({ value, label }, idx) => (
                                                <SelectItem
                                                    key={idx}
                                                    value={value}
                                                >
                                                    {label}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {form.watch("country") === "Moçambique" && (
                        <FormField
                            control={form.control}
                            name="province"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Província</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue="maputo"
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione a sua província" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {provinces.map(
                                                ({ value, label }, idx) => (
                                                    <SelectItem
                                                        key={idx}
                                                        value={value}
                                                    >
                                                        {label}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Data de nascimento</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground",
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>
                                                        Seleciona uma data
                                                    </span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem className="w-fit">
                                <FormLabel>Gênero</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o seu gênero" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="M">
                                            Masculino
                                        </SelectItem>
                                        <SelectItem value="F">
                                            Femenino
                                        </SelectItem>
                                        <SelectItem value="N">
                                            Não binário
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="space-y-3">
                    <h2 className="text-center text-3xl font-semibold">
                        Em caso de emergência a organização deve contactar
                    </h2>
                    <FormField
                        control={form.control}
                        name="emergencyName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nome " {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="emergencyPhone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Telefone</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Ex: 841234567"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="emergencyFamiliarity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Província</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o grau de familiaridade" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Amigo">
                                            Amigo
                                        </SelectItem>
                                        <SelectItem value="Esposa/Esposo">
                                            Esposa/Esposo
                                        </SelectItem>
                                        <SelectItem value="Pais/Filhos">
                                            Pais/Filhos
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <button className="ml-auto btn text-white bg-gradient-to-br from-primary to-secondary flex">
                    <span>Seguinte</span> <IconPack.ArrowRight />
                </button>
            </form>
        </Form>
    );
}
