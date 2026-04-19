import type { Metadata } from "next";
import { Space_Grotesk, Orbitron, Fuzzy_Bubbles } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  variable: "--font-space-grotesk",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-orbitron",
})

const fuzzyBubbles = Fuzzy_Bubbles({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fuzzy-bubbles",   
})


export const metadata: Metadata = {
  title: "Phoenix Token - THE ORDINARY MAN'S TOKEN | FIRST TRUE AI MEME TOKEN | CHARITY & LOVE",
  description: "Phoenix Token was born from the idea that crypto should belong to everyone, not just whales and insiders. We rise from the ashes stronger every time. We combine unbreakable community resilience, meaningful charity work, and relentless product development to create something different: THE ORDINARY MAN'S TOKEN",
   alternates: {
    canonical: 'https://www.phoenixtoken.community',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${orbitron.variable} ${fuzzyBubbles.variable} antialiased`}
      >
        <Header />
        <AuthProvider>
          <Toaster position="top-right" />
          {children}
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
