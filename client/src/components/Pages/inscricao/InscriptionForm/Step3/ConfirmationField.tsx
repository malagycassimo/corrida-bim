import { ConfirmationField as ConfirmationFieldType } from "../types";

export const ConfirmationField = ({ field, value }: ConfirmationFieldType) => (
    <div className="border-b border-b-zinc-300 space-y-3">
        <h4 className="font-semibold text-zinc-800">{field}</h4>
        <span className="text-primary">{value}</span>
    </div>
);
