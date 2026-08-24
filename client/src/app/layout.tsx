import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Layout/Providers";

export const metadata: Metadata = {
    title: {
        template: "%s | Millennium bim",
        default: "16ª Corrida | Millennium bim",
    },
    description:
        "Participe da 16ª Corrida Millennium bim, um evento esportivo emocionante que promove saúde, bem-estar e espírito competitivo. Junte-se a nós nesta celebração única do esporte e da comunidade.",
    openGraph: {
        images: ["https://corridamillenniumbim.co.mz/assets/brand/cover.jpg"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
