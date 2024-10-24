import { rabbitMqServer } from "../../services/Messanger";

const uri = process.env.RABBIT_URI || "amqp://admin:admin@localhost:5672";
const { start, publishToDiscord } = rabbitMqServer(uri);
export { start, publishToDiscord };
