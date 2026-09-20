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
        { message: "Selecione um percurso válido" },
    ),
    shirt: z
        .string({
            required_error: "Selecione o tamanho da camiseta",
        })
        .min(1, {
            message: "Selecione o tamanho da camiseta",
        }),
    accept: z.boolean().refine((val) => val === true, {
        message: "É obrigatório aceitar o regulamento da prova",
    }),
    acceptterms: z.boolean().refine((val) => val === true, {
        message: "É obrigatório aceitar o termo de responsabilidade",
    }),
});
