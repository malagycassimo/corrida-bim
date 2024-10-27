"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, router]);

    return <AuthProvider>{children}</AuthProvider>;
}
