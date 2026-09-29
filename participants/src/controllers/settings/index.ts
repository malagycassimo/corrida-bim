import type { NextFunction, Request, Response } from "express";
import type { IDatabase } from "../../database/types";
import { ErrorImpl } from "../../utils/error";

const settingsController = (database: IDatabase) => {
    const getRegistrationStatus = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const value = await database.getSetting("registrations_open");
            // Default to true if setting is not explicitly set to "false"
            const registrationOpen = value !== "false";
            res.status(200).json({ registrationOpen });
        } catch (e) {
            next(e);
        }
    };

    const updateRegistrationStatus = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { registrationOpen } = req.body;
            const newValue = registrationOpen ? "true" : "false";
            await database.setSetting("registrations_open", newValue);
            res.status(200).json({
                message: "Estado das inscrições atualizado com sucesso",
                registrationOpen: newValue === "true",
            });
        } catch (e) {
            next(e);
        }
    };

    const getAvailability = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            res.status(200).json(await database.getRouteAvailability());
        } catch (e) {
            next(e);
        }
    };

    const updateRouteLimits = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { corrida15k, caminhada7k } = req.body ?? {};
            if (
                !Number.isSafeInteger(corrida15k) || corrida15k < 0 ||
                !Number.isSafeInteger(caminhada7k) || caminhada7k < 0
            ) {
                throw new ErrorImpl(
                    "Os limites devem ser números inteiros iguais ou superiores a zero.",
                    400,
                    "Limites de percurso inválidos",
                );
            }

            res.status(200).json(
                await database.setRouteLimits({ corrida15k, caminhada7k }),
            );
        } catch (e) {
            next(e);
        }
    };

    return {
        getRegistrationStatus,
        updateRegistrationStatus,
        getAvailability,
        updateRouteLimits,
    };
};

export { settingsController };
