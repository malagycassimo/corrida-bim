/**
 * Helper to obtain the base URL for API calls from the Dashboard.
 * In the browser: uses relative path "/api/server", which is proxied
 * via Nginx (in production) or Next.js rewrites (direct access) to the backend.
 * On the server: uses the internal Docker network URL (http://server:3002).
 */
export function getApiBaseUrl(): string {
    if (process.env.NEXT_PUBLIC_API_URL) {
        return process.env.NEXT_PUBLIC_API_URL;
    }
    if (typeof window !== "undefined") {
        return "/api/server";
    }
    return process.env.INTERNAL_API_URL || "http://server:3002";
}
