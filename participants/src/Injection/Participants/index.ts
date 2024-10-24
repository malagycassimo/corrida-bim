import { participantsController } from "../../controllers/participants";
import { prismaDatabase } from "../../database/prisma";
import { participantRepository } from "../../repositories/Participant";
import { ParticipantServ } from "../../services/Participant";
import { mailSrv } from "../Mailer";

const database = prismaDatabase();
const participantRepoImpl = participantRepository(database);
const ParticipantServImpl = ParticipantServ(participantRepoImpl, mailSrv);
const participantController = participantsController(ParticipantServImpl);

export { participantController };
