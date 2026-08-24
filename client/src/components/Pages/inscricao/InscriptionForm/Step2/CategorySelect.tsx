"use client";

import { useState } from "react";
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
import { isAllowedCategory, isAvailable } from "@/utils/helpers";
import { RestrictedCategoryModal } from "./RestrictedCategoryModal";

export const CategorySelect = ({
    form,
    state,
}: {
    form: UseFormReturn<z.infer<typeof raceFormSchema>>;
    state: FormState;
}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRestrictedName, setSelectedRestrictedName] = useState("");

    return (
        <FormField
            control={form.control}
            name="category"
            render={({ field }) => {
                const handleValueChange = (val: string) => {
                    if (!isAllowedCategory(val)) {
                        const matchedCat = categories.find((c) => c.value === val);
                        setSelectedRestrictedName(matchedCat ? matchedCat.label : val);
                        setModalOpen(true);
                        field.onChange("");
                        return;
                    }
                    field.onChange(val);
                };

                return (
                    <FormItem>
                        <FormLabel>Categoria</FormLabel>
                        <Select
                            onValueChange={handleValueChange}
                            value={field.value || ""}
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
                                        {`${label} ${
                                            isAvailable(
                                                value,
                                                state.availability.constraints,
                                            )
                                                ? ""
                                                : "(Esgotado)"
                                        }`}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />

                        <RestrictedCategoryModal
                            isOpen={modalOpen}
                            onClose={() => setModalOpen(false)}
                            categoryName={selectedRestrictedName}
                        />
                    </FormItem>
                );
            }}
        />
    );
};
