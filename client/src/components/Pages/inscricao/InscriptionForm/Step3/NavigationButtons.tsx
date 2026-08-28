import { IconPack } from "@/components/common/IconPack";

export const NavigationButtons = ({
    onPrevious,
    onNext,
    isSubmitting = false,
}: {
    onPrevious: () => void;
    onNext: () => void;
    isSubmitting?: boolean;
}) => (
    <div className="flex justify-between items-center">
        <button
            onClick={onPrevious}
            disabled={isSubmitting}
            className="btn border-2 text-zinc-600 from-primary to-secondary flex disabled:opacity-50"
        >
            <IconPack.ArrowRight className="rotate-180" stroke="#52525b" />
            <span className="hidden sm:inline-block">Anterior</span>
        </button>
        <button
            onClick={onNext}
            disabled={isSubmitting}
            className="ml-auto btn text-white bg-gradient-to-br from-primary to-secondary flex disabled:opacity-50 items-center gap-2"
        >
            <span>{isSubmitting ? "A submeter..." : "Seguinte"}</span>
            {!isSubmitting && <IconPack.ArrowRight />}
        </button>
    </div>
);
