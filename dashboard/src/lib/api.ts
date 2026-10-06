/**
 * Helper to obtain the base URL for API calls from the Dashboard.
 */
export function getApiBaseUrl(): string {
    if (process.env.NEXT_PUBLIC_API_URL) {
        return process.env.NEXT_PUBLIC_API_URL;
    }
    if (typeof window !== "undefined") {
        return `${window.location.protocol}//${window.location.hostname}:3002`;
    }
    return process.env.INTERNAL_API_URL || "http://server:3002";
}
