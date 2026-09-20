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
                <FormItem className="w-full">
                    <FormLabel>
                        Tamanho da T-shirt oficial{" "}
                        <span className="text-primary font-bold">*</span>
                    </FormLabel>
                    <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                    >
                        <FormControl>
                            <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Selecione o tamanho da sua T-shirt" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="Small">S - Pequeno</SelectItem>
                            <SelectItem value="Medium">M - Médio</SelectItem>
                            <SelectItem value="Large">L - Grande</SelectItem>
                            <SelectItem value="ExtraLarge">
                                XL - Extra Grande
                            </SelectItem>
                            <SelectItem value="DoubleExtraLarge">
                                XXL - Duplo Extra Grande
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
