import { PedestrianRaceConstraints } from "@/app/inscricao/action";

export function isAvailable(
    value: string,
    constraints: PedestrianRaceConstraints,
) {
    // 1. Limite Máximo Geral do Evento (5.000 participantes)
    if (constraints.total >= 5000) {
        return false;
    }

    // 2. Limite da Caminhada (3.000 participantes)
    if (value.includes("7km")) {
        return constraints.caminhada7k < 3000;
    }

    // 3. Limite Geral da Corrida (2.000 atletas) para todas as categorias da corrida (15km)
    return constraints.corrida15k < 2000;
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
