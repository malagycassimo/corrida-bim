import { Router } from "express";
import { settingsController } from "../../Injection/Settings";

const router = Router();

router.get("/registration-status", settingsController.getRegistrationStatus);
router.post("/registration-status", settingsController.updateRegistrationStatus);
router.put("/registration-status", settingsController.updateRegistrationStatus);

export { router as settingsRouter };
