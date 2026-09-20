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
        <div className="bg-zinc-50/80 border border-zinc-200/80 rounded-2xl p-4 sm:p-5 space-y-4 my-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Termos & Regulamentos Obrigatórios
            </h4>

            <FormField
                control={form.control}
                name="accept"
                render={({ field }) => (
                    <FormItem className="space-y-1">
                        <div className="flex flex-row space-x-3 items-center">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                />
                            </FormControl>
                            <div className="leading-tight text-sm text-zinc-700">
                                <FormLabel className="cursor-pointer font-normal">
                                    Li e concordo com o{" "}
                                    <Link
                                        className="text-primary font-semibold hover:underline"
                                        href={
                                            "/assets/docs/Regulamento - 16ª Corrida Millennium bim.pdf"
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Regulamento Oficial da Prova
                                    </Link>{" "}
                                    <span className="text-primary font-bold">
                                        *
                                    </span>
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
                    <FormItem className="space-y-1">
                        <div className="flex flex-row space-x-3 items-center">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                />
                            </FormControl>
                            <div className="leading-tight text-sm text-zinc-700">
                                <FormLabel className="cursor-pointer font-normal">
                                    Li e concordo com o{" "}
                                    <Link
                                        className="text-primary font-semibold hover:underline"
                                        href={
                                            "/assets/docs/Termo de Responsabilidade.pdf"
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Termo de Responsabilidade
                                    </Link>{" "}
                                    <span className="text-primary font-bold">
                                        *
                                    </span>
                                </FormLabel>
                            </div>
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
