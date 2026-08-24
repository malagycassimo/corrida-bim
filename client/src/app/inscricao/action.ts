"use server";

interface Participant {
    id: string;
    IDCode: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    province: string;
    dob: string;
    country: string;
    gender: string;
    emergencyName: string;
    emergencyPhone: string;
    emergencyFamiliarity: string;
    category: string;
    route: string;
    shirt: string;
}

export interface PedestrianRaceConstraints {
    populares: number;
    veteranosI: number;
    veteranosII: number;
    estrangeiros: number;
    total: number;
}

export interface AvailabilityResponse {
    codes: string[];
    constraints: PedestrianRaceConstraints;
}

export const submitData = async (data: Record<string, string | boolean>) => {
    const { accept, acceptterms, ...rest } = data;
    try {
        await fetch("http://server:3002/participants/store", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rest),
        });
    } catch (e) {
        if (e instanceof Error) {
            await fetch(process.env.DISCORD_URL as string, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        source: "CLIENT",
                        data,
                        e: e.message,
                        accept,
                        acceptterms,
                    },
                    null,
                    2,
                ),
            });
        }
        console.error(e);
    }
};

export async function getIsAvailable(): Promise<AvailabilityResponse> {
    try {
        const response = await fetch("http://server:3002/participants/fetch");
        const data: Participant[] = await response.json();

        const codes = data.map((participant) => participant.IDCode);

        const pedestrianRace15km = data.filter(
            (participant) => participant.route === "Corrida Pedestre - 15km",
        );

        const constraints = {
            populares: pedestrianRace15km.filter(
                (p) => p.category === "Populares",
            ).length,
            veteranosI: pedestrianRace15km.filter(
                (p) => p.category === "Veteranos 1",
            ).length,
            veteranosII: pedestrianRace15km.filter(
                (p) => p.category === "Veteranos 2",
            ).length,
            estrangeiros: pedestrianRace15km.filter((p) =>
                p.category.includes("Estrangeiros"),
            ).length,
            get total() {
                return data.length;
            },
        };


        return {
            codes,
            constraints,
        };
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return {
            codes: [],
            constraints: {
                populares: 0,
                veteranosI: 0,
                veteranosII: 0,
                estrangeiros: 0,
                total: 0,
            },
        };
    }
}
