import type { ConsumeMessage } from "amqplib";

export enum EventTypes {
    USER_CREATED = "USER_CREATED",
    USER_DELETED = "USER_DELETED",
    USER_UPDATED = "USER_UPDATED",
    ERROR_THROWN = "ERROR_THROWN",
}

export namespace Participant {
    export interface ParticipantSchema {
        id: string;
        IDCode: string;
        firstName: string;
        email: string;
        lastName: string;
        phone: string;
        province: string;
        dob: string;
        country: string;
        gender: string;
        emergencyName: string;
        emergencyPhone: string;
        emergencyFamiliarity: string;
        category: string;
        route: string;
        shirt: string;
    }
    export interface ParticipantRequest {
        IDCode: string;
        firstName: string;
        email: string;
        lastName: string;
        phone: string;
        province: string;
        dob: string;
        country: string;
        gender: string;
        emergencyName: string;
        emergencyPhone: string;
        emergencyFamiliarity: string;
        category: string;
        route: string;
        shirt: string;
    }
    export interface ParticipantRepository {
        store: (participant: ParticipantRequest) => Promise<ParticipantSchema>;
        get: (id: string) => Promise<ParticipantSchema>;
        fetch: () => Promise<ParticipantSchema[]>;
        destroy: (id: string) => Promise<void>;
        update: (
            id: string,
            participant: ParticipantRequest,
        ) => Promise<ParticipantSchema>;
    }
}
export interface Messager {
    start: () => void;
    publishInExchange: (routingKey: routingKeys, message: string) => boolean;
    publishToDiscord: (
        routingKey: routingKeys,
        message: string,
    ) => Promise<boolean>;
    consume: (callback: (message: ConsumeMessage | null) => void) => void;
}

export namespace Event {
    interface EventyPayload {
        message: string;
        data?: any;
    }
    export interface EventSchema {
        eventType: EventTypes;
        payload: EventyPayload;
    }
}

export enum routingKeys {
    UNHADLED = "unhandled",
    PARTICIPANT_CREATED = "user_created",
    PARTICIPANT_UPDATED = "user_updated",
}
