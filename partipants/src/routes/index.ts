import type { Express } from "express";
import { errorMiddleware } from "../Injection/ErrorHandler";
import { participantsRouter } from "./Participants";
const router = (app: Express) => {
    app.use("/participants", participantsRouter);
    app.use(errorMiddleware);
};
export { router };
