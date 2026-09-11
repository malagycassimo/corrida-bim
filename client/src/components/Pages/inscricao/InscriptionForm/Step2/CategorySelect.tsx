"use client";

import { useEffect, useState } from "react";
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
import { CategoryLimitModal } from "./CategoryLimitModal";

export const CategorySelect = ({
    form,
    state,
}: {
    form: UseFormReturn<z.infer<typeof raceFormSchema>>;
    state: FormState;
}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRestrictedName, setSelectedRestrictedName] = useState("");
    const [limitModalOpen, setLimitModalOpen] = useState(false);
    const [selectedLimitName, setSelectedLimitName] = useState("");

    useEffect(() => {
        const currentCat = form.getValues("category") || state.step2.category;
        if (currentCat && !isAllowedCategory(currentCat)) {
            const matchedCat = categories.find((c) => c.value === currentCat);
            setSelectedRestrictedName(matchedCat ? matchedCat.label : currentCat);
            setModalOpen(true);
        }
    }, [form, state.step2.category]);

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
                    if (!isAvailable(val, state.availability.constraints)) {
                        const matchedCat = categories.find((c) => c.value === val);
                        setSelectedLimitName(matchedCat ? matchedCat.label : val);
                        setLimitModalOpen(true);
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
                        {field.value && isAllowedCategory(field.value) && (
                            <p className="text-xs text-green-700 font-medium mt-1">
                                ✓ Categoria selecionada automaticamente com base nos seus dados pessoais.
                            </p>
                        )}

                        <RestrictedCategoryModal
                            isOpen={modalOpen}
                            onClose={() => setModalOpen(false)}
                            categoryName={selectedRestrictedName}
                        />
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
};
