import { Table } from "@/components/LazyTable";
import { Metrics } from "@/components/Metrics";
import { RegistrationToggle } from "@/components/RegistrationToggle";
import { RouteLimitsManager } from "@/components/RouteLimitsManager";
import Image from "next/image";

interface RouteAvailability {
    registrationOpen: boolean;
    routeLimits: {
        corrida15k: number;
        caminhada7k: number;
    };
    routeCounts: {
        corrida15k: number;
        caminhada7k: number;
        total: number;
    };
}

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

async function getRouteAvailability(): Promise<RouteAvailability | null> {
    try {
        const res = await fetch("http://server:3002/settings/availability", {
            cache: "no-store",
        });
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Erro ao buscar limites dos percursos:", error);
        return null;
    }
}

export default async function Home() {
    const [data, availability] = await Promise.all([getData(), getRouteAvailability()]);

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

            <div className="grid gap-4 lg:grid-cols-12 lg:items-stretch">
                <div className="flex items-center lg:col-span-5">
                    <RegistrationToggle initialStatus={availability?.registrationOpen} />
                </div>
                {availability ? (
                    <div className="lg:col-span-7">
                        <RouteLimitsManager initialAvailability={availability} />
                    </div>
                ) : (
                    <p className="flex items-center text-sm text-rose-700 lg:col-span-7" role="alert">
                        Não foi possível carregar os limites dos percursos.
                    </p>
                )}
            </div>

            <Metrics data={data} />
            <Table initialData={data} />
        </main>
    );
}
