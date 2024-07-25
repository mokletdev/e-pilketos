import { Metadata } from "next";
import Sidebar from "@/app/components/general/Sidebar";

export const metadata: Metadata = {
  title: "Admin | E-Pilketos Moklet",
  description: "Admin | E-Pilketos SMK Telkom Malang",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main>
        <div className="flex">
          <Sidebar />
          {children}
        </div>
      </main>
    </>
  );
}
