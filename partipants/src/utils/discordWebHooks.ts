import { routingKeys } from "../models/types";

export const discordWebhooks: Record<routingKeys, string> = {
    [routingKeys.UNHADLED]: process.env.DISCORD_URL as string,
    [routingKeys.PARTICIPANT_CREATED]: process.env.DISCORD_URL as string,
    [routingKeys.PARTICIPANT_UPDATED]: process.env.DISCORD_URL as string,
};
