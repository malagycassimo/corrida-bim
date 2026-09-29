export interface RouteLimits {
    corrida15k: number;
    caminhada7k: number;
}

export interface RouteCounts extends RouteLimits {
    total: number;
}

export interface RouteAvailability {
    registrationOpen: boolean;
    routeLimits: RouteLimits;
    routeCounts: RouteCounts;
}

export type RouteLimitKey = keyof RouteLimits;

export const DEFAULT_ROUTE_LIMITS: RouteLimits = {
    corrida15k: 2000,
    caminhada7k: 1000,
};

export const ROUTE_LIMIT_SETTING_KEYS: Record<RouteLimitKey, string> = {
    corrida15k: "route_limit_corrida_15k",
    caminhada7k: "route_limit_caminhada_7k",
};

export const parseRouteLimit = (value: string | null, fallback: number): number => {
    if (value === null) return fallback;
    const parsed = Number(value);
    return Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : fallback;
};

export const getRouteLimitKey = (route: string): RouteLimitKey | null => {
    const normalizedRoute = route.toLowerCase().replace(/\s/g, "");
    if (normalizedRoute.includes("15km")) return "corrida15k";
    if (
        normalizedRoute.includes("7.2km") ||
        normalizedRoute.includes("7km") ||
        normalizedRoute.includes("caminhada")
    ) {
        return "caminhada7k";
    }
    return null;
};

export const getRouteCountFilter = (key: RouteLimitKey) =>
    key === "corrida15k"
        ? { route: { contains: "15km", mode: "insensitive" as const } }
        : {
              OR: [
                  { route: { contains: "7.2km", mode: "insensitive" as const } },
                  { route: { contains: "7km", mode: "insensitive" as const } },
                  { route: { contains: "caminhada", mode: "insensitive" as const } },
              ],
          };