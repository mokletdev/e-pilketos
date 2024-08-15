import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import InitialTransition from "@/lib/InitialTransition";
import NextAuthProviders from "@/lib/NextAuthProvider";
import ProgressBarProvider from "@/lib/ProgressBar";
import { AdminDisablePathname } from "@/lib/disablePathNames";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Pilketos Moklet",
  description:
    "Aplikasi pemilihan Ketua OSIS SMK Telkom Malang Masa Bakti 2024/2025",
  keywords: [
    "E-Pilketos",
    "E-Voting",
    "Pemilihan Ketua Osis",
    "SMK Telkom Malang",
    "Moklet",
    "E-Pilketos Moklet",
    "MokletDev",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  minimumScale: 1.0,
  maximumScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <InitialTransition>
        <AdminDisablePathname />
        <body
          className={`${inter.className} selection:bg-red-light-2 bg-red-light-6`}
        >
          <NextAuthProviders>
            <ProgressBarProvider>{children}</ProgressBarProvider>
            <Toaster />
          </NextAuthProviders>
        </body>
      </InitialTransition>
    </html>
  );
}
