import { AuthContext } from "@/contexts/AuthContext";
import { use } from "react";

export const useAuth = () => {
    const context = use(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
};
