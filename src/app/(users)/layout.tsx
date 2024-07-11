import Footer from "../components/general/Footer";
import Navbar from "../components/general/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main>
        <Navbar />
        {children}
        <Footer />
      </main>
    </>
  );
}
