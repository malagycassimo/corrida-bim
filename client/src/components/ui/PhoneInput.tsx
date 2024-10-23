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
}

export function PhoneInput<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name }: PhoneInputProps<TFieldValues, TName>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <div className="flex">
                        <Select
                            onValueChange={(value) =>
                                field.onChange(
                                    `${value}${field.value.split(" ")[1] || ""}`,
                                )
                            }
                            defaultValue="+258"
                        >
                            <FormControl>
                                <SelectTrigger className="w-[110px]">
                                    <SelectValue placeholder="Código" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {countryCodes.map((item) => (
                                    <SelectItem
                                        key={item.code}
                                        value={item.code}
                                    >
                                        {item.code} ({item.country})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormControl>
                            <Input
                                className="flex-1 ml-2"
                                placeholder="Número de telefone"
                                {...field}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                ) => {
                                    const [code] = field.value.split(" ");
                                    field.onChange(`${code} ${e.target.value}`);
                                }}
                                value={field.value.split(" ")[1] || ""}
                            />
                        </FormControl>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
