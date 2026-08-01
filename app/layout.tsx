import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "WebifyIt — Digital Services Agency | Web, App, AI & Lead Gen",
  description:
    "Kanpur-based digital services agency crafting high-performance web & app solutions, AI integrations, SEO, lead generation, and custom SaaS platforms.",
  keywords: [
    "WebifyIt",
    "Digital Agency Kanpur",
    "Web Development",
    "App Development",
    "AI Integration",
    "SEO Optimization",
    "Lead Generation",
    "Custom SaaS",
  ],
  authors: [{ name: "WebifyIt Team" }],
  openGraph: {
    title: "WebifyIt — Digital Services Agency",
    description: "Transform your business with cutting-edge web, mobile, and AI solutions.",
    url: "https://webifyit.in",
    siteName: "WebifyIt",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F5F6F1] text-[#12151B] selection:bg-[#FF4B23] selection:text-white font-body">
        {children}
      </body>
    </html>
  );
}
