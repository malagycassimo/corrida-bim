import { IconPack } from "@/components/common/IconPack";
import { SubmitButton } from "./SubmitButton";

export const NavigationButtons = ({
    onPrevious,
}: {
    onPrevious: () => void;
}) => (
    <div className="flex justify-between items-center">
        <button
            onClick={onPrevious}
            className="btn border-2 text-zinc-600 from-primary to-secondary flex"
        >
            <IconPack.ArrowRight className="rotate-180" stroke="#52525b" />
            <span className="hidden sm:inline-block">Anterior</span>
        </button>
        <SubmitButton />
    </div>
);
