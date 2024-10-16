import type { NextFunction, Request, Response } from "express";
import type { Participant } from "../models/types";
import { ErrorImpl } from "../utils/error";

const validationMiddleware = (): ((
    req: Request,
    res: Response,
    next: NextFunction,
) => void) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { name, email, age } = req.body as Participant.ParticipantRequest;
        try {
            if (!name || !email || !age) {
                throw new ErrorImpl(
                    "Todos os campos devem ser preenchidos",
                    400,
                    "Bad Request",
                );
            }
            if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
                throw new ErrorImpl("Email inválido", 400, "Bad Request");
            }
            next();
        } catch (e) {
            next(e);
        }
    };
};

export { validationMiddleware };
