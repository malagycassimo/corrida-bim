import { Step1Data, Step2Data } from "../types";
import { PersonalInfoColumn } from "./PersonalInfoColumn";
import { RaceInfoColumn } from "./RaceInfoColumn";

export const ConfirmationSection = ({
    step1,
    step2,
}: {
    step1: Step1Data;
    step2: Step2Data;
}) => (
    <div className="flex flex-col space-y-4 w-full">
        <PersonalInfoColumn step1={step1} />
        <RaceInfoColumn step1={step1} step2={step2} />
    </div>
);
