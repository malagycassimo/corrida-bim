import type { Connection, Channel, Message, ConsumeMessage } from "amqplib";
import { connect } from "amqplib";
import type { Messager, routingKeys } from "../../models/types";
import axios from "axios";
import { discordWebhooks } from "../../utils/discordWebHooks";

const rabbitMqServer = (uri: string): Messager => {
    let connection: Connection;
    let channel: Channel;
    return {
        start: async () => {
            connection = await connect(uri);
            channel = await connection.createChannel();
        },
        publishInExchange: (routingKey: routingKeys, message: string) => {
            return channel.publish(
                "amq.direct",
                routingKey,
                Buffer.from(message),
            );
        },
        publishToDiscord: async (routingKey: routingKeys, message: string) => {
            const webhookUrl = discordWebhooks[routingKey];
            if (!webhookUrl) {
                console.error(
                    `No Discord webhook URL found for routing key: ${routingKey}`,
                );
                return false;
            }
            try {
                await axios.post(webhookUrl, {
                    content: `[${routingKey}] ${message}`,
                });
                return true;
            } catch (error) {
                console.error("Failed to send message to Discord:", error);
                return false;
            }
        },
        consume: (callback: (message: ConsumeMessage | null) => void) => {
            return channel.consume("Discord", (message) => {
                console.log(message?.content.toString());
                callback(message);
                channel.ack(message as Message);
            });
        },
    };
};

export { rabbitMqServer };
