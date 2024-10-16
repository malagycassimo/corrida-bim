import type { NextFunction, Request, Response } from "express";
import { ErrorImpl } from "../utils/error";
import { EventTypes, routingKeys, type Event } from "../models/types";
import { eventStringifier } from "../utils/messagerHelpers";

const errorMiddleware = (
    publisher: (routingKey: routingKeys, message: string) => Promise<boolean>,
): ((err: any, req: Request, res: Response, next: NextFunction) => void) => {
    return (err: any, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof ErrorImpl) {
            return res.status(err.code).json({
                message: err.message,
            });
        }
        publisher(
            routingKeys.UNHADLED,
            eventStringifier(
                EventTypes.ERROR_THROWN,
                `Erro no servidor: ${err}`,
            ),
        );
        return res.status(500).json({
            message: "Erro no servidor. Tente novamente mais tarde.",
        });
    };
};

export { errorMiddleware };
