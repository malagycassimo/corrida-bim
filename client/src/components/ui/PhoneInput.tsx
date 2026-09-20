import React from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { countryCodes } from "@/utils/statics";

interface PhoneInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
    control: Control<TFieldValues>;
    name: TName;
    label?: string;
    placeholder?: string;
    required?: boolean;
}

export function PhoneInput<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    label = "Telefone",
    placeholder = "84 123 4567",
    required = true,
}: PhoneInputProps<TFieldValues, TName>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                const rawValue = field.value || "+258 ";
                const parts = rawValue.split(" ");
                const currentCode = parts[0] || "+258";
                const currentNumber = parts.slice(1).join(" ");

                const handleCodeChange = (newCode: string) => {
                    field.onChange(`${newCode} ${currentNumber}`.trim());
                };

                const handleNumberChange = (
                    e: React.ChangeEvent<HTMLInputElement>,
                ) => {
                    const cleanVal = e.target.value.replace(/[^\d\s-]/g, "");
                    field.onChange(`${currentCode} ${cleanVal}`);
                };

                return (
                    <FormItem>
                        <FormLabel>
                            {label}{" "}
                            {required && (
                                <span className="text-primary font-bold">*</span>
                            )}
                        </FormLabel>
                        <div className="flex gap-2">
                            <Select
                                onValueChange={handleCodeChange}
                                value={currentCode}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-[120px] shrink-0 bg-white">
                                        <SelectValue placeholder="Código" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="max-h-60">
                                    {countryCodes.map((item) => (
                                        <SelectItem
                                            key={`${item.code}-${item.country}`}
                                            value={item.code}
                                        >
                                            {item.code} ({item.country})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormControl>
                                <Input
                                    className="flex-1 bg-white"
                                    placeholder={placeholder}
                                    onChange={handleNumberChange}
                                    value={currentNumber}
                                />
                            </FormControl>
                        </div>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
}
