import type { EmailOptions } from ".";
import type { Participant } from "../../models/types";

const WELCOME = ({
    email,
    firstName,
}: Participant.ParticipantRequest): EmailOptions => {
    return {
        from: "info@corridamillenniumbim.co.mz",
        to: email,
        subject: "Parabéns, você se inscreveu a 15 Corrida do Millenium BIM",
        template: {
            id: "d-4a916931b8d54ae4aa620a7398980b28",
            data: { name: firstName },
        },
    };
};

export { WELCOME };
