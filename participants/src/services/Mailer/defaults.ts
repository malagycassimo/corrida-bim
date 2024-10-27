import type { EmailOptions } from ".";
import type { Participant } from "../../models/types";

const WELCOME = ({
    email,
    firstName,
    lastName,
    id,
    category,
    route,
    IDCode,
}: Participant.ParticipantSchema): EmailOptions => {
    return {
        from: "info@corridamillenniumbim.co.mz",
        to: email,
        subject: "Parabéns, você se inscreveu a 15 Corrida do Millenium BIM",
        template: {
            id: "d-5172b7e4cbc44152bec38bb3e52bf9d7",
            data: {
                name: `${firstName} ${lastName}`,
                id: `cb-${id.substring(0, 7)}`,
                category,
                route,
                IDCode,
            },
        },
    };
};

export { WELCOME };
