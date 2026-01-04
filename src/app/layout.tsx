import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "INMOBILIARIA SARO - Bienes Raíces de Lujo",
    description: "Encuentra tu propiedad ideal con Saro Inmobiliaria. Casas y terrenos de alta calidad en las mejores ubicaciones.",
    keywords: ["bienes raíces", "casas", "terrenos", "propiedades", "inmobiliaria"],
    authors: [{ name: "AL Development" }],
    openGraph: {
        title: "Saro Inmobiliaria - Bienes Raíces de Lujo",
        description: "Encuentra tu propiedad ideal con Saro Inmobiliaria",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={inter.className}>
                <Navbar />
                <main className="min-h-screen">
                    {children}
                </main>
                <Footer />
                <WhatsAppButton />
            </body>
        </html>
    );
}
