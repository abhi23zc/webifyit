import { Metadata } from "next";
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
  metadataBase: new URL("https://webifyit.in"),
  title: {
    template: "%s | WebifyIt Engineering Studio",
    default:
      "WebifyIt — Custom Software & AI Engineering Studio | Lucknow, India",
  },
  description:
    "Custom Websites, Mobile Apps & AI Tools in Lucknow, India. We build fast websites, AI chatbots, voice assistants, cloud software, and mobile apps for restaurants, fintech, e-commerce, and manufacturing businesses.",
  keywords: [
    "WebifyIt",
    "Custom Software Studio",
    "AI Engineering",
    "Next.js Development",
    "AI Voice Agents",
    "Custom SaaS",
    "Web Architecture",
    "App Development Lucknow",
    "Restaurant Software Lucknow",
    "Fintech Software India",
    "Manufacturing ERP Lucknow",
    "Enterprise Software India",
    "Cloud ERP",
  ],
  authors: [{ name: "WebifyIt Engineering Studio" }],
  creator: "WebifyIt Engineering Studio",
  publisher: "WebifyIt Engineering Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "WebifyIt — Custom Software & AI Engineering Studio",
    description:
      "We build custom websites, AI chatbots, voice assistants, and cloud software that helps your business grow.",
    url: "https://webifyit.in",
    siteName: "WebifyIt Engineering Studio",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebifyIt — Custom Software & AI Engineering Studio",
    description:
      "Custom websites, AI chatbots, voice assistants, and mobile apps for your business.",
  },
  alternates: {
    canonical: "https://webifyit.in",
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
