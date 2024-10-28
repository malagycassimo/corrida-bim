import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Providers from "@/components/Providers";

const font = Montserrat({
    subsets: ["latin"],
});
export const metadata: Metadata = {
    title: "15a Corrida Millennium BIM",
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
            <body className={`${font.className} antialiased`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
