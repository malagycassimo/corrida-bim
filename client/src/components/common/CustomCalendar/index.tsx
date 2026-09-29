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
import { ControllerRenderProps, useFormContext } from "react-hook-form";

type FieldType = ControllerRenderProps<
    {
        IDCode: string;
        firstName: string;
        email: string;
        lastName: string;
        phone: string;
        province?: string;
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
    const selectedDate = field.value ? new Date(field.value) : new Date();
    const currentYear = new Date().getFullYear();
    const { formState } = useFormContext();
    const hasError = !!formState.errors.dob;

    return (
        <FormItem className="w-full">
            <FormLabel>
                Data de nascimento{" "}
                <span className="text-primary font-bold">*</span>
            </FormLabel>
            <Popover>
                <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                            type="button"
                            variant={"outline"}
                            className={cn(
                                "flex h-12 w-full items-center justify-between rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm font-normal text-left focus:outline-none focus:ring-1 focus:ring-zinc-950 hover:bg-zinc-50 overflow-hidden",
                                hasError && "border-red-500 focus:ring-red-500",
                                !field.value && "text-muted-foreground",
                            )}
                        >
                            <span className="truncate pr-2 text-zinc-600">
                                {format(selectedDate, "PPP", {
                                    locale: pt,
                                })}
                            </span>
                            <CalendarIcon className="h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        defaultMonth={selectedDate}
                        onSelect={(date) => field.onChange(date || new Date())}
                        disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        captionLayout="dropdown-buttons"
                        fromYear={1900}
                        toYear={currentYear}
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
