import DataTable from "@/components/DataTable";

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
            <h1 className="text-2xl font-bold mb-4">Millennium BIM</h1>
            <DataTable initialData={data} />
        </main>
    );
}
