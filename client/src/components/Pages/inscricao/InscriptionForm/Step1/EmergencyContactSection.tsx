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

export default function EmergencyContactSection({ form }: SectionProps) {
    return (
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
            <PhoneInput control={form.control} name="emergencyPhone" />
            <FormField
                control={form.control}
                name="emergencyFamiliarity"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Grau de parentesco</FormLabel>
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
                                <SelectItem value="Outros">Outros</SelectItem>
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
    );
}
