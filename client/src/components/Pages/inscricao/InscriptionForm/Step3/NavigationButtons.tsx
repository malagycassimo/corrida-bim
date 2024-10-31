import { IconPack } from "@/components/common/IconPack";

export const NavigationButtons = ({
    onPrevious,
    onNext,
}: {
    onPrevious: () => void;
    onNext: () => void;
}) => (
    <div className="flex justify-between items-center">
        <button
            onClick={onPrevious}
            className="btn border-2 text-zinc-600 from-primary to-secondary flex"
        >
            <IconPack.ArrowRight className="rotate-180" stroke="#52525b" />
            <span className="hidden sm:inline-block">Anterior</span>
        </button>
        <button
            onClick={onNext}
            className="ml-auto btn text-white bg-gradient-to-br from-primary to-secondary flex"
        >
            <span>Seguinte</span>
            <IconPack.ArrowRight />
        </button>
    </div>
);
