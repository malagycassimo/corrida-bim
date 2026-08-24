import Image from "next/image";

export default function Loading() {
    return (
        <div className="min-h-svh flex justify-center items-center bg-white z-50 fixed inset-0">
            <Image
                alt="16ª Corrida Millennium bim"
                src={"/assets/brand/logo-16-color.png"}
                width={85}
                height={85}
                className="animate-bounce object-contain"
            />
        </div>
    );
}
