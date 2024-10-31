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

export default function RouteSelect({ form }: Step2SectionProps) {
    return (
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
                                <SelectItem value={value} key={value}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
