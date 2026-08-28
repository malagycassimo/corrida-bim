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
        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to: email,
        subject: "Parabéns! Sua inscrição na 16ª Corrida Millennium bim foi confirmada",
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
