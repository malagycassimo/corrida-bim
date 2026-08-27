import type { NextFunction, Request, Response } from "express";

export interface Participant {
    store: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    get: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    fetch: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    destroy: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    sendBulkEmail: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
