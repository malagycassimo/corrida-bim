import { useMemo } from "react";
import { FormState } from "../types";
import { isAllowedCategory } from "@/utils/helpers";
import { StatusIcon } from "./StatusIcon";
import { StatusMessage } from "./StatusMessage";

export default function Step4({
    state: { step2 },
}: {
    state: FormState;
    setState?: React.Dispatch<React.SetStateAction<FormState>>;
}) {
    const isAllowed = useMemo(() => isAllowedCategory(step2.category), [step2]);

    return (
        <div className="w-full py-2 space-y-6">
            <StatusIcon isAllowed={isAllowed} />
            <StatusMessage isAllowed={isAllowed} />
        </div>
    );
}
