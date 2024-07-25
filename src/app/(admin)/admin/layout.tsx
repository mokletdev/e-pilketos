import { Metadata } from "next";
import Sidebar from "@/app/components/general/Sidebar";
import AdminHeaders from "./_components/AdminHeaders";

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
      <main className="bg-red-light-6">
        <div className="flex">
          <Sidebar />
          <div className="px-[28px]">
            <div className="w-full py-4">
              <AdminHeaders />
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
