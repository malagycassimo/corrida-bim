import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Step2SectionProps } from "../types";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function TermsCheckboxes({ form }: Step2SectionProps) {
    return (
        <>
            <FormField
                control={form.control}
                name="accept"
                render={({ field }) => (
                    <FormItem>
                        <div className="flex flex-row space-x-2 items-start">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Li e concordo com o{" "}
                                    <Link
                                        className="text-primary cursor-pointer"
                                        href={
                                            "/assets/docs/Regulamento - 16ª Corrida Millennium bim.pdf"
                                        }
                                    >
                                        Regulamento
                                    </Link>
                                </FormLabel>
                            </div>
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="acceptterms"
                render={({ field }) => (
                    <FormItem>
                        <div className="flex flex-row space-x-2 items-start">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Li e concordo com o{" "}
                                    <Link
                                        className="text-primary cursor-pointer"
                                        href={
                                            "/assets/docs/Termo de Responsabilidade.pdf"
                                        }
                                    >
                                        Termo de Responsabilidade
                                    </Link>
                                </FormLabel>
                            </div>
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
}
