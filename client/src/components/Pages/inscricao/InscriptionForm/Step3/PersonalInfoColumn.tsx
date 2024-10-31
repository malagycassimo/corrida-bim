import { CONFIRMATION_LABELS } from "../constants";
import { Step1Data } from "../types";
import { ConfirmationField } from "./ConfirmationField";

export const PersonalInfoColumn = ({ step1 }: { step1: Step1Data }) => (
    <div className="space-y-3 flex-1">
        <ConfirmationField
            field={CONFIRMATION_LABELS.FIELDS.ID}
            value={step1.IDCode}
        />
        <ConfirmationField
            field={CONFIRMATION_LABELS.FIELDS.FULL_NAME}
            value={`${step1.firstName} ${step1.lastName}`}
        />
        <ConfirmationField
            field={CONFIRMATION_LABELS.FIELDS.PHONE}
            value={step1.phone}
        />
    </div>
);
