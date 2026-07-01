import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anas Khan | Full Stack & AI Engineer",
  description:
    "Full Stack Software Engineer specializing in AI-powered applications. Explore my projects, skills, and experience.",
  keywords: [
    "Anas Khan",
    "Full Stack Engineer",
    "AI Engineer",
    "Software Developer",
    "Portfolio",
  ],
  openGraph: {
    title: "Anas Khan | Full Stack & AI Engineer",
    description: "Specializing in AI-powered applications",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
