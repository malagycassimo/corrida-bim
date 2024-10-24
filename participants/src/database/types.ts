import type { Participant } from "../models/types";

export interface IDatabase {
    store: (
        participant: Participant.ParticipantRequest,
    ) => Promise<Participant.ParticipantSchema>;
    get: (id: string) => Promise<Participant.ParticipantSchema>;
    fetch: () => Promise<Participant.ParticipantSchema[]>;
    destroy: (id: string) => Promise<void>;
    update: (
        id: string,
        participant: Participant.ParticipantRequest,
    ) => Promise<Participant.ParticipantSchema>;
}
