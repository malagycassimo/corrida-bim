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

export interface RouteLimits {
    corrida15k: number;
    caminhada7k: number;
}

export interface AvailabilityResponse {
    codes: string[];
    constraints: PedestrianRaceConstraints;
    routeLimits: RouteLimits;
    registrationOpen?: boolean;
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
            const errorData = await response.json().catch(() => null);
            return {
                success: false,
                error: errorData?.message || "Erro ao realizar inscrição.",
            };
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
        const [availabilityResponse, participantsResponse] = await Promise.all([
            fetch("http://server:3002/settings/availability", { cache: "no-store" }),
            fetch("http://server:3002/participants/fetch", { cache: "no-store" }),
        ]);
        if (!availabilityResponse.ok || !participantsResponse.ok) {
            throw new Error("Não foi possível obter a disponibilidade das inscrições.");
        }

        const availability = await availabilityResponse.json();
        const data: Participant[] = await participantsResponse.json();
        const safeData = Array.isArray(data) ? data : [];

        return {
            codes: safeData.map((participant) => participant.IDCode),
            constraints: availability.routeCounts,
            routeLimits: availability.routeLimits,
            registrationOpen: availability.registrationOpen !== false,
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
            routeLimits: {
                corrida15k: 2000,
                caminhada7k: 1000,
            },
            registrationOpen: false,
        };
    }
}

export async function getRegistrationStatus(): Promise<boolean> {
    try {
        const response = await fetch("http://server:3002/settings/registration-status", {
            cache: "no-store",
        }).catch(() =>
            fetch("http://localhost:3002/settings/registration-status", {
                cache: "no-store",
            })
        );
        if (!response.ok) return true;
        const data = await response.json();
        return data.registrationOpen !== false;
    } catch {
        return false;
    }
}

