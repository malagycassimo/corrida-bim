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
    return (
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
                                <Input placeholder="Teu Apelido" {...field} />
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
                                placeholder="Ex: teuemail@exemplo.com"
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
                                {countries.map(({ value, label }, idx) => (
                                    <SelectItem key={idx} value={value}>
                                        {label}
                                    </SelectItem>
                                ))}
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
                                defaultValue="Maputo"
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione a sua província" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {provinces.map(({ value, label }, idx) => (
                                        <SelectItem key={idx} value={value}>
                                            {label}
                                        </SelectItem>
                                    ))}
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
                render={({ field }) => <CustomCalendar field={field} />}
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
                                <SelectItem value="M">Masculino</SelectItem>
                                <SelectItem value="F">Femenino</SelectItem>
                                <SelectItem value="N">Não binário</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
