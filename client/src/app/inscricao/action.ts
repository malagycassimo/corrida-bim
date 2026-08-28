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
    corrida15k: number;
    caminhada7k: number;
    total: number;
}

export interface AvailabilityResponse {
    codes: string[];
    constraints: PedestrianRaceConstraints;
}

export async function submitData(payload: Record<string, unknown>) {
    try {
        const cleanPayload = { ...payload };
        delete cleanPayload.accept;
        delete cleanPayload.acceptterms;
        const response = await fetch("http://server:3002/participants/store", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cleanPayload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Erro do servidor:", response.status, errorText);
            throw new Error(`Erro ao registrar participante: ${response.status}`);
        }

        return { success: true };
    } catch (error) {
        console.error("Erro no submitData:", error);
        return { success: false, error: "Erro ao realizar inscrição." };
    }
}

export const submitRegistration = submitData;

export async function getIsAvailable(): Promise<AvailabilityResponse> {
    try {
        const response = await fetch("http://server:3002/participants/fetch");
        const data: Participant[] = await response.json();

        const safeData = Array.isArray(data) ? data : [];
        const codes = safeData.map((participant) => participant.IDCode);

        const constraints: PedestrianRaceConstraints = {
            corrida15k: safeData.filter(
                (p) => p.route && p.route.includes("15km"),
            ).length,
            caminhada7k: safeData.filter(
                (p) => p.route && p.route.includes("7km"),
            ).length,
            total: safeData.length,
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
                corrida15k: 0,
                caminhada7k: 0,
                total: 0,
            },
        };
    }
}
