import type { IDatabase } from "../../database/types";
import type { Participant } from "../../models/types";

const participantRepository = (
    database: IDatabase,
): Participant.ParticipantRepository => {
    return {
        store: async (participant: Participant.ParticipantRequest) => {
            return await database.store(participant);
        },
        get: async (id: string) => {
            return await database.get(id);
        },
        fetch: async () => {
            return await database.fetch();
        },
        destroy: async (id: string) => {
            return await database.destroy(id);
        },
        update: async (
            id: string,
            participant: Participant.ParticipantRequest,
        ) => {
            return await database.update(id, participant);
        },
    };
};

export { participantRepository };
