import { PrismaClient } from "@prisma/client";
import type { IDatabase } from "../types";
import type { Participant } from "../../models/types";
import { ErrorImpl } from "../../utils/error";
import { isValidMozambiqueMobilePhone } from "../../utils/phoneValidation";
import {
    DEFAULT_ROUTE_LIMITS,
    getRouteCountFilter,
    getRouteLimitKey,
    parseRouteLimit,
    ROUTE_LIMIT_SETTING_KEYS,
} from "../../utils/routeLimits";

const prismaDatabase = (): IDatabase => {
    const prisma = new PrismaClient({ log: ["info", "warn", "error"] });
    prisma.$connect();
    console.log("Conexão com banco de dados estabelecida");
    return {
        store: async (participant: Participant.ParticipantRequest) => {
            try {
                return await prisma.$transaction(async (transaction) => {
                    await transaction.$executeRaw`LOCK TABLE "Participant" IN SHARE ROW EXCLUSIVE MODE`;

                    const setting = await transaction.setting.findUnique({
                        where: { key: "registrations_open" },
                    });
                    if (setting && setting.value === "false") {
                        throw new ErrorImpl(
                            "As inscrições estão temporariamente fechadas.",
                            403,
                            "Inscrições temporariamente fechadas pelo administrador",
                        );
                    }

                    if (
                        participant.country === "Moçambique" &&
                        !isValidMozambiqueMobilePhone(participant.phone)
                    ) {
                        throw new ErrorImpl(
                            "Para Moçambique, use o indicativo +258 e um número iniciado por 82, 83, 84, 85, 86, 87 ou 88.",
                            400,
                            "Prefixo de telefone moçambicano inválido",
                        );
                    }

                    const routeLimitKey = getRouteLimitKey(participant.route);
                    if (routeLimitKey) {
                        const limitSetting = await transaction.setting.findUnique({
                            where: { key: ROUTE_LIMIT_SETTING_KEYS[routeLimitKey] },
                        });
                        const limit = parseRouteLimit(
                            limitSetting?.value ?? null,
                            DEFAULT_ROUTE_LIMITS[routeLimitKey],
                        );
                        const count = await transaction.participant.count({
                            where: getRouteCountFilter(routeLimitKey),
                        });

                        if (count >= limit) {
                            const routeName = routeLimitKey === "corrida15k" ? "15 km" : "7,2 km";
                            throw new ErrorImpl(
                                `As inscrições para o percurso de ${routeName} estão esgotadas.`,
                                409,
                                "Limite de inscrições do percurso atingido",
                            );
                        }
                    }

                    const { accept, acceptterms, ...participantData } = participant as any;
                    return await transaction.participant.create({ data: participantData });
                });
            } catch (error) {
                if (error instanceof Error && !(error instanceof ErrorImpl)) {
                    throw new ErrorImpl(
                        "Erro ao criar participante",
                        500,
                        error.message,
                    );
                }
                throw error;
            }
        },
        get: async (id: string) => {
            try {
                const participant = await prisma.participant.findUnique({
                    where: { id },
                });
                if (!participant) {
                    throw new ErrorImpl(
                        "Partipante não encontrado",
                        404,
                        "Not found",
                    );
                }
                return participant;
            } catch (error) {
                if (error instanceof Error && !(error instanceof ErrorImpl)) {
                    throw new ErrorImpl(
                        "Erro ao buscar participante",
                        500,
                        error.message,
                    );
                }
                throw error;
            }
        },
        fetch: async () => {
            try {
                const participant = await prisma.participant.findMany();
                if (!participant) {
                    throw new ErrorImpl("Sem participantes", 404, "Not found");
                }
                return participant;
            } catch (error) {
                if (error instanceof Error && !(error instanceof ErrorImpl)) {
                    throw new ErrorImpl(
                        "Erro ao buscar participante",
                        500,
                        error.message,
                    );
                }
                throw error;
            }
        },
        destroy: async (id: string) => {
            try {
                await prisma.participant.delete({ where: { id } });
            } catch (error) {
                if (error instanceof Error && !(error instanceof ErrorImpl)) {
                    throw new ErrorImpl(
                        "Erro ao remover participante",
                        500,
                        error.message,
                    );
                }
                throw error;
            }
        },
        update: async (
            id: string,
            participant: Participant.ParticipantRequest,
        ) => {
            try {
                return await prisma.participant.update({
                    where: { id },
                    data: participant,
                });
            } catch (error) {
                if (error instanceof Error && !(error instanceof ErrorImpl)) {
                    throw new ErrorImpl(
                        "Erro ao atualizar o participante",
                        500,
                        error.message,
                    );
                }
                throw error;
            }
        },
        getSetting: async (key: string) => {
            try {
                const setting = await prisma.setting.findUnique({
                    where: { key },
                });
                return setting ? setting.value : null;
            } catch (error) {
                if (error instanceof Error && !(error instanceof ErrorImpl)) {
                    throw new ErrorImpl(
                        "Erro ao buscar configuração",
                        500,
                        error.message,
                    );
                }
                throw error;
            }
        },
        setSetting: async (key: string, value: string) => {
            try {
                const setting = await prisma.setting.upsert({
                    where: { key },
                    update: { value },
                    create: { key, value },
                });
                return setting.value;
            } catch (error) {
                if (error instanceof Error && !(error instanceof ErrorImpl)) {
                    throw new ErrorImpl(
                        "Erro ao salvar configuração",
                        500,
                        error.message,
                    );
                }
                throw error;
            }
        },
        getRouteAvailability: prismaDatabaseAvailability,
        setRouteLimits: async (limits) => {
            await prisma.$transaction(async (transaction) => {
                await transaction.$executeRaw`LOCK TABLE "Participant" IN SHARE ROW EXCLUSIVE MODE`;
                await Promise.all(
                    (Object.keys(ROUTE_LIMIT_SETTING_KEYS) as (keyof typeof ROUTE_LIMIT_SETTING_KEYS)[]).map((key) =>
                        transaction.setting.upsert({
                            where: { key: ROUTE_LIMIT_SETTING_KEYS[key] },
                            update: { value: String(limits[key]) },
                            create: {
                                key: ROUTE_LIMIT_SETTING_KEYS[key],
                                value: String(limits[key]),
                            },
                        }),
                    ),
                );
            });
            return await prismaDatabaseAvailability();
        },
    };

    async function prismaDatabaseAvailability() {
        const [registrationSetting, corridaLimitSetting, caminhadaLimitSetting, corridaCount, caminhadaCount, total] = await Promise.all([
            prisma.setting.findUnique({ where: { key: "registrations_open" } }),
            prisma.setting.findUnique({ where: { key: ROUTE_LIMIT_SETTING_KEYS.corrida15k } }),
            prisma.setting.findUnique({ where: { key: ROUTE_LIMIT_SETTING_KEYS.caminhada7k } }),
            prisma.participant.count({ where: getRouteCountFilter("corrida15k") }),
            prisma.participant.count({ where: getRouteCountFilter("caminhada7k") }),
            prisma.participant.count(),
        ]);

        return {
            registrationOpen: registrationSetting?.value !== "false",
            routeLimits: {
                corrida15k: parseRouteLimit(corridaLimitSetting?.value ?? null, DEFAULT_ROUTE_LIMITS.corrida15k),
                caminhada7k: parseRouteLimit(caminhadaLimitSetting?.value ?? null, DEFAULT_ROUTE_LIMITS.caminhada7k),
            },
            routeCounts: {
                corrida15k: corridaCount,
                caminhada7k: caminhadaCount,
                total,
            },
        };
    }
};

export { prismaDatabase };
