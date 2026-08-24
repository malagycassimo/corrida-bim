import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
    title: "16ª Corrida Millennium BIM",
    description: "Millennium BIM, aqui consigo!",
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
