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
        <main className="container mx-auto p-4">
            <Image
                alt="16ª Corrida Millennium bim"
                src={"/assets/brand/logo-16-color.png"}
                width={85}
                height={85}
                className="mx-auto my-5 object-contain"
            />
            <h1 className="text-2xl my-4 text-brand font-bold mx-3">
                Dashboard de inscrições
            </h1>
            <Metrics data={data} />
            <Table initialData={data} />
        </main>
    );
}
