import { PedestrianRaceConstraints } from "@/app/inscricao/action";

export function isAvailable(
    value: string,
    constraints: PedestrianRaceConstraints,
) {
    if (!constraints) return true;

    // 1. Limite Máximo Geral do Evento Online (3.000 participantes)
    if (constraints.total >= 3000) {
        return false;
    }

    // 2. Limite da Caminhada 7.2km (1.000 participantes)
    if (value.includes("7") || value.toLowerCase().includes("caminhada")) {
        return constraints.caminhada7k < 1000;
    }

    // 3. Limite Geral da Corrida 15km (2.000 atletas)
    if (value.includes("15km") || value.toLowerCase().includes("corrida")) {
        return constraints.corrida15k < 2000;
    }

    return constraints.total < 3000;
}

export function isEventFullySoldOut(
    constraints?: PedestrianRaceConstraints,
): boolean {
    if (!constraints) return false;
    const caminhadaEsgotada = !isAvailable("7.2km", constraints);
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

export function calculateAge(dob: Date | string, referenceDate?: Date): number {
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) return 0;
    const ref = referenceDate || new Date(new Date().getFullYear(), 9, 25);
    let age = ref.getFullYear() - birthDate.getFullYear();
    const m = ref.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && ref.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export function determineCategory({
    dob,
    gender,
    country,
}: {
    dob?: Date | string | null;
    gender?: string | null;
    country?: string | null;
}): string {
    if (!dob) return "";
    const age = calculateAge(dob);

    const isMozambique =
        !country ||
        country.trim().toLowerCase() === "moçambique" ||
        country.trim().toLowerCase() === "mocambique";

    const isFemale = gender === "F";

    // Menores de 18 anos não se inscrevem online (devem se inscrever na Federação/Associação de Atletismo)
    if (age < 18) {
        return "";
    }

    // Estrangeiros
    if (!isMozambique) {
        if (isFemale) {
            if (age < 45) {
                return "Estrangeiros - Feminino menor de 45 anos";
            }
            return "Estrangeiros - Feminino maior de 45 anos";
        } else {
            if (age < 50) {
                return "Estrangeiros - Masculino menor de 50 anos";
            }
            return "Estrangeiros - Masculino maior de 50 anos";
        }
    }

    // Nacionais / Moçambique
    if (isFemale) {
        if (age <= 34) {
            return "Populares - Feminino (18–34 anos)";
        } else if (age <= 45) {
            return "Veteranos - Feminino (35–45 anos)";
        } else {
            return "Veteranos - Feminino (>45 anos)";
        }
    } else {
        if (age <= 39) {
            return "Populares - Masculino (18–39 anos)";
        } else if (age <= 50) {
            return "Veteranos - Masculino (40–50 anos)";
        } else {
            return "Veteranos - Masculino (>50 anos)";
        }
    }
}
