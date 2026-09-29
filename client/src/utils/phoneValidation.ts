export const MOZAMBIQUE_MOBILE_PREFIXES = [
    "82",
    "83",
    "84",
    "85",
    "86",
    "87",
    "88",
];

export const MOZAMBIQUE_PHONE_ERROR =
    "Para Moçambique, use o indicativo +258 e um número iniciado por 82, 83, 84, 85, 86, 87 ou 88.";

const getPhoneParts = (phone: string) => {
    const [callingCode = "", ...numberParts] = phone.trim().split(/\s+/);
    return {
        callingCode: callingCode.replace(/\D/g, ""),
        nationalNumber: numberParts.join("").replace(/\D/g, ""),
    };
};

export const isValidMozambiqueMobilePhone = (phone: string): boolean => {
    const { callingCode, nationalNumber } = getPhoneParts(phone);
    return (
        callingCode === "258" &&
        MOZAMBIQUE_MOBILE_PREFIXES.some((prefix) => nationalNumber.startsWith(prefix))
    );
};

export const canBecomeValidMozambiqueMobilePhone = (phone: string): boolean => {
    const { callingCode, nationalNumber } = getPhoneParts(phone);
    return (
        callingCode === "258" &&
        MOZAMBIQUE_MOBILE_PREFIXES.some(
            (prefix) =>
                prefix.startsWith(nationalNumber) || nationalNumber.startsWith(prefix),
        )
    );
};