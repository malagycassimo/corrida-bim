import { MESSAGES } from "./constants";

export const StatusMessage = ({ isAllowed }: { isAllowed: boolean }) => (
    <>
        <h2 className="text-center text-2xl font-semibold">
            {isAllowed ? MESSAGES.SUCCESS.TITLE : MESSAGES.FAILURE.TITLE}
        </h2>
        <p className="text-center text-zinc-600">
            {isAllowed
                ? MESSAGES.SUCCESS.DESCRIPTION
                : MESSAGES.FAILURE.DESCRIPTION}
        </p>
    </>
);
