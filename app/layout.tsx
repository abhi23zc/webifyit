import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { Toaster } from 'react-hot-toast';

import Footer from "@/components/footer"
import { Analytics } from '@vercel/analytics/next';


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WebifyIt - Digital Services Agency",
  description: "Transform Your Business with Cutting-Edge Web & App Solutions",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="min-h-screen">
            {children}
            <Analytics/>
            </main>
          <Footer />
          <Toaster />
          
        </ThemeProvider>
      </body>
    </html>
  )
}
