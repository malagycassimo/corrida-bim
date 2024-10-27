import type { Participant } from "../../models/types";
import type { MailerService } from "../Mailer";
import type { ParticipantService } from "../types";
import * as MailDefaults from "../Mailer/defaults";
const ParticipantServ = (
    Participants: Participant.ParticipantRepository,
    Mail: MailerService,
): ParticipantService => {
    const store = async (participant: Participant.ParticipantRequest) => {
        const particp = await Participants.store(participant);
        await Mail.sendEmail(MailDefaults.WELCOME(particp));
        return particp;
    };
    const get = async (id: string) => {
        return await Participants.get(id);
    };
    const fetch = async () => {
        return await Participants.fetch();
    };
    const destroy = async (id: string) => {
        return await Participants.destroy(id);
    };
    const update = async (
        id: string,
        parcipant: Participant.ParticipantRequest,
    ) => {
        return await Participants.update(id, parcipant);
    };
    return {
        store,
        get,
        fetch,
        destroy,
        update,
    };
};

export { ParticipantServ };
