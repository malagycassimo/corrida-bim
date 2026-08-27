import { UseFormReturn } from "react-hook-form";
import { CategorySelect } from "./CategorySelect";
import RouteSelect from "./RouteSelect";
import ShirtSizeSelect from "./ShirtSizeSelect";
import TermsCheckboxes from "./TermsCheckboxes";
import { z } from "zod";
import { raceFormSchema } from "./formSchema";
import { FormState } from "../types";

export const RaceInfoSection = ({
    form,
    state,
}: {
    form: UseFormReturn<z.infer<typeof raceFormSchema>>;
    state: FormState;
}) => {
    return (
        <div className="space-y-3">
            <CategorySelect form={form} state={state} />
            <RouteSelect form={form} state={state} />
            <ShirtSizeSelect form={form} />
            <TermsCheckboxes form={form} />
        </div>
    );
};
