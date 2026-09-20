import * as z from "zod";
import { getIsAvailable } from "@/app/inscricao/action";
import { countries, provinces } from "@/utils/statics";
import { calculateAge } from "@/utils/helpers";

const provinceValues = provinces.map(({ value }) => value);

export const formSchema = z
    .object({
        IDCode: z
            .string({
                required_error: "Insira o seu documento de identificação",
            })
            .trim()
            .min(9, {
                message: "O documento de identificação deve ter no mínimo 9 caracteres",
            })
            .max(25, {
                message: "O documento de identificação deve ter no máximo 25 caracteres",
            })
            .refine(
                async (val) => {
                    const cleanVal = val.trim().toUpperCase();
                    const response = await getIsAvailable();
                    return !response.codes.some(
                        (code) => code.trim().toUpperCase() === cleanVal,
                    );
                },
                { message: "Este documento de identificação já foi registrado" },
            ),
        firstName: z
            .string({
                required_error: "Insira o seu primeiro nome",
            })
            .trim()
            .min(2, {
                message: "O nome deve conter no mínimo 2 caracteres",
            })
            .max(50, {
                message: "O nome deve conter no máximo 50 caracteres",
            }),
        lastName: z
            .string({
                required_error: "Insira o seu apelido",
            })
            .trim()
            .min(2, {
                message: "O apelido deve conter no mínimo 2 caracteres",
            })
            .max(50, {
                message: "O apelido deve conter no máximo 50 caracteres",
            }),
        email: z
            .string({
                required_error: "Insira o seu endereço de email",
            })
            .trim()
            .toLowerCase()
            .email({ message: "Insira um endereço de email válido" }),
        phone: z
            .string({
                required_error: "Insira o seu número de telefone",
            })
            .trim()
            .refine(
                (val) => {
                    const digits = val.replace(/\D/g, "");
                    return digits.length >= 8;
                },
                {
                    message:
                        "Insira um número de telefone válido (mínimo de 8 dígitos)",
                },
            ),
        country: z.enum(
            countries.map(({ value }) => value) as unknown as readonly [
                string,
                ...string[],
            ],
            { message: "Selecione um país válido" },
        ),
        province: z.string().optional().default("Maputo"),
        dob: z
            .date({
                required_error: "Selecione a sua data de nascimento",
                invalid_type_error: "Selecione uma data válida",
            })
            .refine((date) => date <= new Date(), {
                message: "A data de nascimento não pode ser futura",
            })
            .refine((date) => calculateAge(date) >= 18, {
                message:
                    "Inscrições online são exclusivas para maiores de 18 anos. Atletas juvenis devem se inscrever na Federação de Atletismo.",
            })
            .refine((date) => calculateAge(date) <= 110, {
                message: "Insira uma data de nascimento válida",
            }),
        gender: z.enum(["M", "F", "N"], {
            message: "Selecione o seu gênero",
        }),
        emergencyName: z
            .string({
                required_error: "Insira o nome do contacto de emergência",
            })
            .trim()
            .min(2, {
                message:
                    "O nome de emergência deve conter no mínimo 2 caracteres",
            })
            .max(70, {
                message:
                    "O nome de emergência deve conter no máximo 70 caracteres",
            }),
        emergencyPhone: z
            .string({
                required_error: "Insira o telefone de emergência",
            })
            .trim()
            .refine(
                (val) => {
                    const digits = val.replace(/\D/g, "");
                    return digits.length >= 8;
                },
                {
                    message:
                        "Insira um telefone de emergência válido (mínimo de 8 dígitos)",
                },
            ),
        emergencyFamiliarity: z
            .string({
                required_error: "Selecione o grau de parentesco",
            })
            .min(2, {
                message: "Selecione o grau de parentesco",
            }),
    })
    .superRefine((data, ctx) => {
        if (data.country === "Moçambique") {
            if (!data.province || !provinceValues.includes(data.province)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Selecione uma província válida de Moçambique",
                    path: ["province"],
                });
            }
        }
    });
