import { ConfirmationField as ConfirmationFieldType } from "../types";

export const ConfirmationField = ({
    field,
    value,
    className = "",
}: ConfirmationFieldType & { className?: string }) => (
    <div className={`flex flex-col py-1 ${className}`}>
        <span className="text-[10px] sm:text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
            {field}
        </span>
        <span className="text-xs sm:text-[13px] font-medium text-zinc-800 break-words mt-0.5 leading-snug">
            {value || "—"}
        </span>
    </div>
);
