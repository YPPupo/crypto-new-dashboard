// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/SideBar";
import Navbar from "@/components/NavBar";
import LayoutWrapper from '@/components/LayoutWrapper';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Admin Dashboard",
//   description: "Dashboard de criptomonedas con Next.js",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Eliminamos el flex container del body */}
        <Sidebar />
        <div className="ml-64 min-h-screen">
          {" "}
          {/* Margen izquierdo igual al ancho del sidebar */}
          <div className="flex flex-col">
            <Navbar />
            <main className="p-6 bg-gray-900 min-h-[calc(100vh-4rem)]">
              <LayoutWrapper>{children}</LayoutWrapper>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
