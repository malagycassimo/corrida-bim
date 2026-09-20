import { IconPack } from "@/components/common/IconPack";

export const SubmitButton = () => (
    <button
        type="submit"
        className="ml-auto btn text-white bg-gradient-to-br from-primary to-secondary flex items-center gap-2 shadow-md shadow-primary/20 hover:opacity-95 transition-all cursor-pointer"
    >
        <span>Seguinte</span>
        <IconPack.ArrowRight stroke="white" />
    </button>
);
