import { Table } from "@/components/LazyTable";
import { Metrics } from "@/components/Metrics";
import Image from "next/image";

async function getData() {
    const res = await fetch("http://server:3002/participants/fetch", {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

export default async function Home() {
    const data = await getData();

    return (
        <main className="container mx-auto p-4">
            <Image
                alt="Millennium bim"
                src={"assets/brand/brand-red.svg"}
                width={70.96}
                height={75.78}
                className="mx-auto my-5"
            />
            <Metrics data={data} />
            <Table initialData={data} />
        </main>
    );
}
