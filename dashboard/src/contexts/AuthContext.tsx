import React, { createContext, useState } from "react";

interface AuthContextData {
    isAuthenticated: boolean;
    login: (password: string) => Promise<boolean>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (password: string): Promise<boolean> => {
        try {
            const CORRECT_PASSWORD = "moz2devz";

            if (password === CORRECT_PASSWORD) {
                setIsAuthenticated(true);
                localStorage.setItem("isAuthenticated", "true");
                return true;
            }

            return false;
        } catch (error) {
            console.error("Erro no login:", error);
            return false;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
