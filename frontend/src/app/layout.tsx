import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "./components/component/navbar/navbar";
import Footer from "./components/component/footer/footer";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "IEEE-PC",
  description: "A technical and communication club of SIT",
};

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
        <Navbar />
        <main>{children}</main> {/* Render the content of each page here */}
        <Footer />
      </body>
    </html>
  );
}
