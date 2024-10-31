import { UseFormReturn } from "react-hook-form";
import { raceFormSchema } from "./formSchema";
import * as z from "zod";
import { FormState } from "../types";
import {
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
import { categories } from "@/utils/statics";
import { isAvailable } from "@/utils/helpers";

export const CategorySelect = ({
    form,
    state,
}: {
    form: UseFormReturn<z.infer<typeof raceFormSchema>>;
    state: FormState;
}) => (
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
                                        state.availability.constraints,
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
);
