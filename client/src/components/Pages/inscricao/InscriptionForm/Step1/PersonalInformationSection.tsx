import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { SectionProps } from "../types";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/PhoneInput";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { countries, provinces } from "@/utils/statics";
import CustomCalendar from "@/components/common/CustomCalendar";

export default function PersonalInformationSection({ form }: SectionProps) {
    const isMozambique = form.watch("country") === "Moçambique";

    return (
        <div className="space-y-6">
            <div className="border-b border-zinc-100 pb-3">
                <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold">
                        1
                    </span>
                    Dados Pessoais do Atleta
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                    Preencha as suas informações pessoais com atenção. Todos os
                    campos com asterisco (*) são de preenchimento obrigatório.
                </p>
            </div>

            <div className="space-y-4">
                <FormField
                    control={form.control}
                    name="IDCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Bilhete de Identidade / Passaporte{" "}
                                <span className="text-primary font-bold">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Ex: 110100234567A"
                                    className="bg-white uppercase tracking-wider"
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(
                                            e.target.value.toUpperCase(),
                                        )
                                    }
                                />
                            </FormControl>
                            <p className="text-[11px] text-zinc-400">
                                Obrigatório para validação e levantamento do kit
                            </p>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>
                                    Nome próprio{" "}
                                    <span className="text-primary font-bold">
                                        *
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ex: Manuel"
                                        className="bg-white"
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
                                <FormLabel>
                                    Apelido{" "}
                                    <span className="text-primary font-bold">
                                        *
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ex: Silva"
                                        className="bg-white"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Endereço de e-mail{" "}
                                    <span className="text-primary font-bold">
                                        *
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="seuemail@exemplo.com"
                                        className="bg-white"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <PhoneInput
                        control={form.control}
                        name="phone"
                        label="Telefone do Atleta"
                        placeholder="84 123 4567"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Nacionalidade{" "}
                                    <span className="text-primary font-bold">
                                        *
                                    </span>
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value || "Moçambique"}
                                >
                                    <FormControl>
                                        <SelectTrigger className="bg-white">
                                            <SelectValue placeholder="Selecione o seu país" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="max-h-60">
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

                    {isMozambique ? (
                        <FormField
                            control={form.control}
                            name="province"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Província{" "}
                                        <span className="text-primary font-bold">
                                            *
                                        </span>
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value || "Maputo"}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="bg-white">
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
                    ) : (
                        <div className="flex flex-col justify-center p-3 rounded-lg bg-zinc-50 border border-zinc-200/60 text-xs text-zinc-500">
                            <span className="font-semibold text-zinc-700">
                                Atleta Internacional
                            </span>
                            Será alocado automaticamente na categoria de
                            Estrangeiros.
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => <CustomCalendar field={field} />}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>
                                    Gênero{" "}
                                    <span className="text-primary font-bold">
                                        *
                                    </span>
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="bg-white">
                                            <SelectValue placeholder="Selecione o seu gênero" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="M">
                                            Masculino
                                        </SelectItem>
                                        <SelectItem value="F">
                                            Feminino
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
