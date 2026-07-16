import { Mulish, Sora } from "next/font/google";
import "./globals.css";

// Next downloads and self hosts these fonts at build time.
// "variable" exposes each one as a css variable we use in globals.css.
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

// Shown in the browser tab and used by search engines.
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
