import type { Event, EventTypes } from "../models/types";

const eventStringifier = (
  eventType: EventTypes,
  message: string,
  data?: any
): string => {
  const event: Event.EventSchema = {
    eventType,
    payload: {
      message,
      data,
    },
  };
  return JSON.stringify(event);
};

const eventParser = (event: string): Event.EventSchema => {
  return JSON.parse(event);
};

export { eventStringifier, eventParser };
