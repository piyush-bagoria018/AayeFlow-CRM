import { Mulish, Sora } from "next/font/google";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import "./globals.css";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "AayeFlow - CRM built for growing sales teams",
  description:
    "AayeFlow is a CRM that helps sales teams capture leads, track deals and close faster. Talk to our sales team.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${mulish.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
