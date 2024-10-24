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
        name: string;
        email: string;
        age: number;
    }
    export interface ParticipantRequest {
        name: string;
        email: string;
        age: number;
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
