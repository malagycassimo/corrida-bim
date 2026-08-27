import { PedestrianRaceConstraints } from "@/app/inscricao/action";

export function isAvailable(
    value: string,
    constraints: PedestrianRaceConstraints,
) {
    if (!constraints) return true;

    // 1. Limite Máximo Geral do Evento (5.000 participantes)
    if (constraints.total >= 5000) {
        return false;
    }

    // 2. Limite da Caminhada 7km (3.000 participantes)
    if (value.includes("7km")) {
        return constraints.caminhada7k < 3000;
    }

    // 3. Limite Geral da Corrida 15km (2.000 atletas)
    if (value.includes("15km")) {
        return constraints.corrida15k < 2000;
    }

    return constraints.total < 5000;
}

export function isEventFullySoldOut(
    constraints?: PedestrianRaceConstraints,
): boolean {
    if (!constraints) return false;
    const caminhadaEsgotada = !isAvailable("7km", constraints);
    const corridaEsgotada = !isAvailable("15km", constraints);
    return caminhadaEsgotada && corridaEsgotada;
}

export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export const isAllowedCategory = (category: string): boolean => {
    const restrictedCategories = [
        "Juvenis",
        "Federados",
        "Triciclos",
        "Cadeirantes",
        "Deficientes",
        "Thomas",
    ];
    return !restrictedCategories.some((restricted) =>
        category.includes(restricted),
    );
};
