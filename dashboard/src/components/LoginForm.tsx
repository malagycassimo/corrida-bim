"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export const LoginForm = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const success = await login(password);
        if (success) {
            router.push("/dashboard");
        } else {
            setError("Senha incorreta");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-10/12 md:w-7/12 lg:w-4/12 xl:w-3/12"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-full flex justify-center mb-4"
            >
                <div className="p-3 rounded-full">
                    <Image
                        alt="16ª Corrida Millennium bim"
                        src={"/assets/brand/logo-16-color.png"}
                        width={90}
                        height={90}
                        className="mx-auto my-5 object-contain"
                    />
                </div>
            </motion.div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full"
                        placeholder="Digite sua senha"
                    />
                </div>
                {error && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-red-500"
                    >
                        {error}
                    </motion.p>
                )}
                <Button type="submit" className="w-full" variant="default">
                    Entrar
                </Button>
            </form>
        </motion.div>
    );
};
