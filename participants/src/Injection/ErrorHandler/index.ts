import { errorMiddleware as errorMdl } from "../../middlewares/errorMiddleware";
import { publishToDiscord } from "../Messanger";

const errorMiddleware = errorMdl(publishToDiscord);
export { errorMiddleware };
