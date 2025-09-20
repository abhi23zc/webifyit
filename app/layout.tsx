import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/next";

// Use Inter font with latin subset
const inter = Inter({ subsets: ["latin"] });

// Enhanced SEO metadata
export const metadata: Metadata = {
  title: "WebifyIt - Digital Services Agency | Web & App Development, SEO, Branding",
  description:
    "WebifyIt is your trusted digital services agency. We specialize in web and app development, SEO, branding, and digital marketing to help your business grow online. Transform your business with cutting-edge solutions tailored to your needs.",
  keywords: [
    "WebifyIt",
    "Digital Services Agency",
    "Web Development",
    "App Development",
    "SEO",
    "Branding",
    "Digital Marketing",
    "UI/UX Design",
    "Business Solutions",
    "E-commerce",
    "Next.js",
    "React"
  ],
  authors: [{ name: "WebifyIt Team", url: "https://webifyit.in" }],
  creator: "WebifyIt",
  publisher: "WebifyIt",
  openGraph: {
    title: "WebifyIt - Digital Services Agency",
    description:
      "Transform your business with WebifyIt's web & app development, SEO, branding, and digital marketing services.",
    url: "https://webifyit.in",
    siteName: "WebifyIt",
    images: [
      {
        url: "https://webifyit.in/webifyit.png",
        width: 1200,
        height: 630,
        alt: "WebifyIt - Digital Services Agency"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "WebifyIt - Digital Services Agency",
    description:
      "Transform your business with WebifyIt's web & app development, SEO, branding, and digital marketing services.",
    images: ["https://webifyit.in/webifyit.png"]
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1
    }
  },
  alternates: {
    canonical: "https://webifyit.in"
  },
  metadataBase: new URL("https://webifyit.in")
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* SEO meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="author" content="WebifyIt Team" />
        <meta name="copyright" content="WebifyIt" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://webifyit.in" />
        {/* Open Graph & Twitter tags for social sharing */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="WebifyIt" />
        <meta property="og:url" content="https://webifyit.in" />
        <meta property="og:image" content="https://webifyit.in/webifyit.png" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@webifyit" />
        <meta name="twitter:image" content="https://webifyit.in/webifyit.png" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* Structured Data (JSON-LD) for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "WebifyIt",
              url: "https://webifyit.com",
              logo: "https://webifyit.in/webifyit.png",
              sameAs: [
                "https://www.linkedin.com/company/webifyit",
                "https://www.facebook.com/webifyit",
                "https://www.instagram.com/webify_it",
  
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+916394575814",
                  contactType: "customer service",
                  areaServed: "US",
                  availableLanguage: ["English"]
                }
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen">
            {children}
            <Analytics />
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
