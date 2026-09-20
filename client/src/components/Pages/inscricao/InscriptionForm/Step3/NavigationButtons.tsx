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
    <div className="flex justify-between items-center pt-4">
        <button
            type="button"
            onClick={onPrevious}
            disabled={isSubmitting}
            className="btn border-2 text-zinc-600 from-primary to-secondary flex items-center gap-2 disabled:opacity-50"
        >
            <IconPack.ArrowRight className="rotate-180" stroke="#52525b" />
            <span className="hidden sm:inline-block">Anterior</span>
        </button>
        <button
            type="button"
            onClick={onNext}
            disabled={isSubmitting}
            className="ml-auto btn text-white bg-gradient-to-br from-primary to-secondary flex disabled:opacity-50 items-center gap-2 cursor-pointer shadow-md shadow-primary/20"
        >
            {isSubmitting ? (
                <>
                    <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    <span>A submeter inscrição...</span>
                </>
            ) : (
                <>
                    <span>Confirmar Inscrição</span>
                    <IconPack.ArrowRight stroke="white" />
                </>
            )}
        </button>
    </div>
);
