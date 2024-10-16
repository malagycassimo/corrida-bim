import { participantsController } from "../../controllers/participants";
import { prismaDatabase } from "../../database/prisma";
import { participantRepository } from "../../repositories/Participant";
import { ParticipantServ } from "../../services/Participant";

const database = prismaDatabase();
const participantRepoImpl = participantRepository(database);
const ParticipantServImpl = ParticipantServ(participantRepoImpl);
const participantController = participantsController(ParticipantServImpl);

export { participantController };
