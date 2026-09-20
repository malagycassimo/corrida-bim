import { IconPack } from "@/components/common/IconPack";
import { SubmitButton } from "./SubmitButton";

export const NavigationButtons = ({
    onPrevious,
}: {
    onPrevious: () => void;
}) => (
    <div className="flex justify-between items-center pt-4">
        <button
            type="button"
            onClick={onPrevious}
            className="btn border-2 text-zinc-600 from-primary to-secondary flex items-center gap-2 hover:bg-zinc-50 transition-all cursor-pointer"
        >
            <IconPack.ArrowRight className="rotate-180" stroke="#52525b" />
            <span className="hidden sm:inline-block">Anterior</span>
        </button>
        <SubmitButton />
    </div>
);
