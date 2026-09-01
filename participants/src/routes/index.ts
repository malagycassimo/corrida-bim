import type { Express } from "express";
import { errorMiddleware } from "../Injection/ErrorHandler";
import { participantsRouter } from "./Participants";
import { settingsRouter } from "./Settings";
const router = (app: Express) => {
    app.use("/participants", participantsRouter);
    app.use("/settings", settingsRouter);
    app.use("/participants/settings", settingsRouter);
    app.use(errorMiddleware);
};
export { router };
