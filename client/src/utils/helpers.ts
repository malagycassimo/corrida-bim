import { PedestrianRaceConstraints } from "@/app/inscricao/action";

export function isAvailable(
    value: string,
    constraints: PedestrianRaceConstraints,
) {
    if (constraints.total >= 5000) {
        return false;
    }
    switch (value) {
        case "Populares":
            return constraints.populares < 1500;
        case "Veteranos 1":
            return constraints.veteranosI < 200;
        case "Veteranos 2":
            return constraints.veteranosII < 100;
        case "Estrangeiros 1":
        case "Estrangeiros 2":
            return constraints.estrangeiros < 100;
        default:
            return true;
    }
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
