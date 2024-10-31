import * as z from "zod";
import { categories, routes } from "@/utils/statics";

export const raceFormSchema = z.object({
    category: z.enum(
        categories.map(({ value }) => value) as unknown as readonly [
            string,
            ...string[],
        ],
        { message: "Selecione uma categoria válida." },
    ),
    route: z.enum(
        routes.map(({ value }) => value) as unknown as readonly [
            string,
            ...string[],
        ],
        { message: "Selecione um percurso válida" },
    ),
    shirt: z.string(),
    accept: z.boolean().refine((val) => val === true, {
        message: "Concorde com o regulamento para prosseguir",
    }),
    acceptterms: z.boolean().refine((val) => val === true, {
        message: "Concorde com os termos para prosseguir",
    }),
});
