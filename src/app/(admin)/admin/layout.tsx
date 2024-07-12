import { Metadata } from "next";

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
      <main>{children}</main>
    </>
  );
}
