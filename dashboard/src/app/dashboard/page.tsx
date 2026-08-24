import { Table } from "@/components/LazyTable";
import { Metrics } from "@/components/Metrics";
import Image from "next/image";

async function getData() {
    try {
        const res = await fetch("http://server:3002/participants/fetch", {
            cache: "no-store",
        });
        if (!res.ok) {
            return [];
        }
        const json = await res.json();
        return Array.isArray(json) ? json : [];
    } catch (error) {
        console.error("Erro ao buscar dados dos participantes do servidor:", error);
        return [];
    }
}

export default async function Home() {
    const data = await getData();

    return (
        <main className="container mx-auto px-4 py-8 max-w-[1400px] space-y-6">
            <div className="flex flex-col items-center justify-center text-center space-y-3 pb-2">
                <Image
                    alt="16ª Corrida Millennium bim"
                    src={"/assets/brand/logo-16-color.png"}
                    width={100}
                    height={100}
                    className="h-24 w-24 object-contain"
                />
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Dashboard de Inscrições
                </h1>
                <p className="text-sm font-medium text-slate-500 max-w-md">
                    Painel de controle e acompanhamento em tempo real dos participantes da 16ª Corrida Millennium bim
                </p>
            </div>

            <Metrics data={data} />
            <Table initialData={data} />
        </main>
    );
}
