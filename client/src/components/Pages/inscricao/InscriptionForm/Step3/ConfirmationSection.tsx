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
    <div className="flex sm:flex-row flex-col justify-between space-y-3 sm:space-y-0 sm:space-x-10">
        <PersonalInfoColumn step1={step1} />
        <RaceInfoColumn step1={step1} step2={step2} />
    </div>
);
