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
        <div className="space-y-6 pt-4 border-t border-zinc-100">
            <div className="border-b border-zinc-100 pb-3">
                <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold">
                        2
                    </span>
                    Contacto em Caso de Emergência
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                    Indique uma pessoa próxima para ser contactada pela
                    organização médica e técnica em caso de necessidade.
                </p>
            </div>

            <div className="space-y-4">
                <FormField
                    control={form.control}
                    name="emergencyName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Nome da pessoa de contacto{" "}
                                <span className="text-primary font-bold">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Ex: Maria dos Santos"
                                    className="bg-white"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PhoneInput
                        control={form.control}
                        name="emergencyPhone"
                        label="Telefone de Emergência"
                        placeholder="84 987 6543"
                    />

                    <FormField
                        control={form.control}
                        name="emergencyFamiliarity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Grau de parentesco / relação{" "}
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
                                            <SelectValue placeholder="Selecione o grau de parentesco" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Esposa/Esposo">
                                            Esposa / Esposo
                                        </SelectItem>
                                        <SelectItem value="Pais/Filhos">
                                            Pais / Filhos
                                        </SelectItem>
                                        <SelectItem value="Outros">
                                            Outros
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
