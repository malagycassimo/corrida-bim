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

export default function ShirtSizeSelect({ form }: Step2SectionProps) {
    return (
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
                            <SelectItem value="Medium">M</SelectItem>
                            <SelectItem value="Large">L</SelectItem>
                            <SelectItem value="ExtraLarge">XL</SelectItem>
                            <SelectItem value="DoubleExtraLarge">
                                XXL
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
