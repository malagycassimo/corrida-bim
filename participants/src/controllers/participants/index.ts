import type { ParticipantService } from "../../services/types";
import type { Participant } from "../types";
import type { NextFunction, Request, Response } from "express";

const participantsController = (
    participantService: ParticipantService,
): Participant => {
    const store = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const request = req.body;
            const participant = await participantService.store(request);
            res.status(201).json({
                message: "Participante criado com sucesso",
                data: participant,
            });
        } catch (e) {
            next(e);
        }
    };
    const get = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const participant = await participantService.get(req.params.id);
            res.status(200).json(participant);
        } catch (e) {
            next(e);
        }
    };
    const fetch = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const participants = await participantService.fetch();
            res.status(200).json(participants);
        } catch (e) {
            next(e);
        }
    };
    const destroy = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const wallet = await participantService.destroy(req.params.id);
            res.status(200).json(wallet);
        } catch (e) {
            next(e);
        }
    };
    const update = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const wallet = await participantService.update(
                req.params.id,
                req.body,
            );
            res.status(200).json(wallet);
        } catch (e) {
            next(e);
        }
    };

    return {
        store,
        get,
        fetch,
        destroy,
        update,
    };
};

export { participantsController };
