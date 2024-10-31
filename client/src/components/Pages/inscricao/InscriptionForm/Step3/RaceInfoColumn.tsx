import { CONFIRMATION_LABELS } from "../constants";
import { Step1Data, Step2Data } from "../types";
import { ConfirmationField } from "./ConfirmationField";

export const RaceInfoColumn = ({
    step1,
    step2,
}: {
    step1: Step1Data;
    step2: Step2Data;
}) => (
    <div className="space-y-3 flex-1">
        <ConfirmationField
            field={CONFIRMATION_LABELS.FIELDS.CATEGORY}
            value={step2.category}
        />
        <ConfirmationField
            field={CONFIRMATION_LABELS.FIELDS.ROUTE}
            value={step2.route}
        />
        <ConfirmationField
            field={CONFIRMATION_LABELS.FIELDS.EMERGENCY}
            value={`${step1.emergencyName} - ${step1.emergencyPhone}`}
        />
    </div>
);
