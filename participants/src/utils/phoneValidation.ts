const MOZAMBIQUE_MOBILE_PREFIXES = ["82", "83", "84", "85", "86", "87", "88"];

export const isValidMozambiqueMobilePhone = (phone: string): boolean => {
    const [callingCode = "", ...numberParts] = phone.trim().split(/\s+/);
    const nationalNumber = numberParts.join("").replace(/\D/g, "");

    return (
        callingCode.replace(/\D/g, "") === "258" &&
        MOZAMBIQUE_MOBILE_PREFIXES.some((prefix) => nationalNumber.startsWith(prefix))
    );
};