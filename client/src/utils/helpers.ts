import { PedestrianRaceConstraints } from "@/app/inscricao/action";

export function isAvailable(
    value: string,
    constraints: PedestrianRaceConstraints,
) {
    switch (value) {
        case "Populares":
            return constraints.populares >= 1220 ? false : true;
        case "Veteranos 35-45 (F) & 40-50 (M) anos (a)":
            return constraints.veteranosI >= 50 ? false : true;
        case "Veteranos maior de 45 (F) & maior de 50 (M) anos (a)":
            return constraints.veteranosII >= 50 ? false : true;
        case "Estrangeiros menor de 50 anos (M) / menor de 45 anos (F) (c)":
            return constraints.estrangeiros >= 50 ? false : true;
        case "Estrangeiros maior de 50 anos (M) / maior de 45 anos (F) (c)":
            return constraints.estrangeiros >= 50 ? false : true;
        default:
            return true;
    }
}
