import type { NextFunction, Request, Response } from "express";
import type { IDatabase } from "../../database/types";

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

    return {
        getRegistrationStatus,
        updateRegistrationStatus,
    };
};

export { settingsController };
