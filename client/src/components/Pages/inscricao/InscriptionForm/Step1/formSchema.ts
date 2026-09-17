import * as z from "zod";
import { getIsAvailable } from "@/app/inscricao/action";
import { countries, provinces } from "@/utils/statics";
import { calculateAge } from "@/utils/helpers";

export const formSchema = z.object({
    IDCode: z
        .string()
        .min(9, {
            message: "O bilhete de identidade possui no mínimo 9 caracteres",
        })
        .refine(
            async (val) => {
                const response = await getIsAvailable();
                return !response.codes.includes(val);
            },
            { message: "Bilhete de identidade já registrado" },
        ),
    firstName: z.string().min(2, {
        message: "O nome deve conter no mínimo 2 caracteres",
    }),
    email: z.string().email({ message: "Insira um email válido" }),
    lastName: z.string().min(2, {
        message: "O nome deve conter no mínimo 2 caracteres",
    }),
    phone: z.string().min(9, {
        message: "Insira um número de telefone válido com código do país",
    }),
    province: z.enum(
        provinces.map(({ value }) => value) as unknown as readonly [
            string,
            ...string[],
        ],
        {
            message: "Selecione uma província válida",
        },
    ),
    dob: z
        .date({
            required_error: "Selecione uma data válida",
            message: "Selecione uma data válida",
        })
        .refine((date) => calculateAge(date) >= 18, {
            message:
                "Inscrições online são exclusivas para maiores de 18 anos. Atletas juvenis devem se inscrever na Federação de Atletismo.",
        }),
    country: z.enum(
        countries.map(({ value }) => value) as unknown as readonly [
            string,
            ...string[],
        ],
        { message: "Selecione um país válido" },
    ),
    gender: z.enum(["M", "F", "N"], {
        message: "Selecione um valor válido",
    }),
    emergencyName: z.string().min(2, {
        message: "O nome deve conter no mínimo 2 caracteres",
    }),
    emergencyPhone: z.string().min(9, {
        message: "Insira um número de telefone válido com código do país",
    }),
    emergencyFamiliarity: z.string().min(2, {
        message: "Selecione um valor válido",
    }),
});
