import { Router } from "express";
import { participantController } from "../../Injection/Participants";

const router = Router();
router.post("/store", participantController.store);
router.post("/create", participantController.store);
router.post("/send-email", participantController.sendBulkEmail);
router.post("/send-bulk-email", participantController.sendBulkEmail);
router.get("/fetch", participantController.fetch);
router.get("/get/:id", participantController.get);
router.delete("/destroy/:id", participantController.destroy);
router.put("/update/:id", participantController.update);

export { router as participantsRouter };
//TODO: Add auth middleware to remaining routes
