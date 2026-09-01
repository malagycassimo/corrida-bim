import { PrismaClient } from "@prisma/client";
import type { IDatabase } from "../types";
import type { Participant } from "../../models/types";
import { ErrorImpl } from "../../utils/error";

const prismaDatabase = (): IDatabase => {
    const prisma = new PrismaClient({ log: ["info", "warn", "error"] });
    prisma.$connect();
    console.log("Conexão com banco de dados estabelecida");
    return {
        store: async (participant: Participant.ParticipantRequest) => {
            try {
                const setting = await prisma.setting.findUnique({
                    where: { key: "registrations_open" },
                });
                if (setting && setting.value === "false") {
                    throw new ErrorImpl(
                        "As inscrições estão temporariamente fechadas.",
                        403,
                        "Inscrições temporariamente fechadas pelo administrador",
                    );
                }
                const { accept, acceptterms, ...participantData } = participant as any;
                return await prisma.participant.create({ data: participantData });
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
    };
};

export { prismaDatabase };
