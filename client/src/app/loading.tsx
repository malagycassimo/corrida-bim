import Image from "next/image";

export default function Loading() {
    return (
        <div className="min-h-svh flex justify-center items-center bg-white z-50 fixed inset-0">
            <Image
                alt="Millennium bim"
                src={"assets/brand/brand-red.svg"}
                width={70.96}
                height={75.78}
                className="animate-bounce"
            />
        </div>
    );
}
