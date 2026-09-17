import { useState } from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Step2SectionProps } from "../types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { routes } from "@/utils/statics";
import { isAvailable } from "@/utils/helpers";
import { CategoryLimitModal } from "./CategoryLimitModal";

export default function RouteSelect({ form, state }: Step2SectionProps) {
    const [limitModalOpen, setLimitModalOpen] = useState(false);
    const [selectedLimitName, setSelectedLimitName] = useState("");

    // Filtramos para exibir apenas os percursos disponíveis para inscrição online (15km e 7.2km)
    // O percurso de 9.2km (Cadeirantes / Deficiência) é de inscrição presencial via Associação
    const onlineRoutes = routes.filter(
        (r) =>
            !r.value.includes("Deficiência") &&
            !r.value.includes("9") &&
            !r.value.includes("Cadeirantes"),
    );

    return (
        <FormField
            control={form.control}
            name="route"
            render={({ field }) => {
                const handleValueChange = (val: string) => {
                    if (state && !isAvailable(val, state.availability.constraints)) {
                        const matchedRoute = routes.find((r) => r.value === val);
                        setSelectedLimitName(matchedRoute ? matchedRoute.label : val);
                        setLimitModalOpen(true);
                        field.onChange("");
                        return;
                    }
                    field.onChange(val);
                };

                return (
                    <FormItem>
                        <FormLabel>Percurso</FormLabel>
                        <Select
                            onValueChange={handleValueChange}
                            value={field.value || ""}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o seu percurso" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {onlineRoutes.map(({ value, label }) => {
                                    const available = state
                                        ? isAvailable(value, state.availability.constraints)
                                        : true;
                                    return (
                                        <SelectItem
                                            value={value}
                                            key={value}
                                            disabled={!available}
                                        >
                                            {`${label} ${available ? "" : "(Esgotado)"}`}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                        <FormMessage />

                        <CategoryLimitModal
                            isOpen={limitModalOpen}
                            onClose={() => setLimitModalOpen(false)}
                            itemName={selectedLimitName}
                        />
                    </FormItem>
                );
            }}
        />
    );
}
