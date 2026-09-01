import { settingsController as createSettingsController } from "../../controllers/settings";
import { database } from "../Participants";

const settingsController = createSettingsController(database);

export { settingsController };
