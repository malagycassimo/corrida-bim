import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Layout/Providers";

const font = Titillium_Web({
    subsets: ["latin"],
    weight: ["200", "300", "400", "600", "900"],
});

export const metadata: Metadata = {
    title: {
        template: "%s | Millenium BIM",
        default: "15ª Corrida | Millenium BIM",
    },
    description:
        "Participe da 15ª Corrida Millennium BIM, um evento esportivo emocionante que promove saúde, bem-estar e espírito competitivo. Junte-se a nós nesta celebração única do esporte e da comunidade.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${font.className} antialiased`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
