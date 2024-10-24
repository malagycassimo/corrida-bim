import type { Participant } from "../../models/types";
import type { ParticipantService } from "../types";

const ParticipantServ = (
    Participants: Participant.ParticipantRepository,
): ParticipantService => {
    const store = async (user: Participant.ParticipantRequest) => {
        return await Participants.store(user);
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
