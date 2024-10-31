import { useMemo } from "react";
import { FormProps } from "../types";
import { isAllowedCategory } from "@/utils/helpers";
import { StatusIcon } from "./StatusIcon";
import { StatusMessage } from "./StatusMessage";

export default function Step4({ state: { step2 } }: FormProps) {
    const isAllowed = useMemo(() => isAllowedCategory(step2.category), [step2]);

    return (
        <div className="py-5 px-2 sm:px-8 xl:px-28 space-y-4">
            <StatusIcon isAllowed={isAllowed} />
            <StatusMessage isAllowed={isAllowed} />
        </div>
    );
}
