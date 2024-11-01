import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { ControllerRenderProps } from "react-hook-form";

type FieldType = ControllerRenderProps<
    {
        IDCode: string;
        firstName: string;
        email: string;
        lastName: string;
        phone: string;
        province: string;
        dob: Date;
        country: string;
        gender: "M" | "F" | "N";
        emergencyName: string;
        emergencyPhone: string;
        emergencyFamiliarity: string;
    },
    "dob"
>;

export default function CustomCalendar({ field }: { field: FieldType }) {
    return (
        <FormItem className="flex flex-col">
            <FormLabel>Data de nascimento</FormLabel>
            <Popover>
                <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                            )}
                        >
                            {field.value ? (
                                format(field.value, "PPP", {
                                    locale: pt,
                                }) // Adicione o locale aqui também
                            ) : (
                                <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        captionLayout="dropdown-buttons" // Adiciona dropdowns para mês e ano
                        fromYear={1900}
                        toYear={2010}
                        locale={pt}
                        ISOWeek
                        labels={{
                            labelMonthDropdown: () => "Mês",
                            labelYearDropdown: () => "Ano",
                        }}
                        classNames={{
                            caption_dropdowns:
                                "space-y-2 flex flex-col-reverse",
                            dropdown_month:
                                "relative p-2 gap-2 flex rounded-md border border-gray-300",
                            dropdown_year:
                                "relative p-2 flex gap-2 rounded-md border border-gray-300",
                            caption_label: "hidden",
                            day_selected: "bg-primaryLightest",
                            nav_button_next: "hidden",
                            nav_button: "hidden",
                        }}
                    />
                </PopoverContent>
            </Popover>
            <FormMessage />
        </FormItem>
    );
}
