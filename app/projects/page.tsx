"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ExternalLink, Apple, Play } from "lucide-react"

type DetailedProject = {
  title: string
  summary: string
  imageSrc: string
  tags: string[]
  highlights: string[]
  results?: string[]
  href?: string
  appStore?: string
  playStore?: string
}

const detailedProjects: DetailedProject[] = [
  {
    title: "Synergon AI",
    summary:
      "A unified, enterprise-grade AI suite replacing fragmented tools with an all-in-one platform for sales, CRM, voice agents, and campaigns.",
    imageSrc: "/images/synergon.png",
    tags: ["Next.js", "TypeScript", "AI Voice Agents", "WhatsApp API", "LLMs", "Node.js", "Tailwind CSS"],
    highlights: [
      "Inbound & outbound multilingual AI voice agents with real-time intent-aware CRM updates",
      "Unified omnichannel inbox across WhatsApp Business, web chat, Instagram, and Email",
      "No-code flow designer for multi-step drip journeys and custom AI knowledge base integration",
      "Fully automated pipeline forecasting and lead pre-qualification in under 30 seconds",
    ],
    results: [
      "2.4x increase in demo bookings in 28 days",
      "40% reduction in unqualified demo requests",
      "60% reduction in manual follow-up workloads",
    ],
    href: "https://www.synergon.ai",
  },
  {
    title: "HisabAI",
    summary:
      "An AI-powered expense splitting and tracking mobile app. Features hands-free voice logging, receipt scanning, auto-categorization, and a secure document/tax vault.",
    imageSrc: "/images/hisabai.png",
    tags: ["React Native", "TypeScript", "OpenAI", "AI Tools", "Tailwind CSS"],
    highlights: [
      "Hands-free AI voice logging for natural language expense tracking",
      "Smart receipt OCR scanning and automatic category allocation",
      "Secure document/tax vault with end-to-end encryption",
      "Seamless real-time peer-to-peer expense splitting and balances",
    ],
    results: [
      "Over 10,000+ active monthly users",
      "99.9% voice transcription accuracy",
      "Average expense logging time reduced to 3 seconds",
    ],
    href: "https://hisabai.in",
    appStore: "https://apps.apple.com/app/hisabai/id6756543928",
    playStore: "https://play.google.com/store/apps/details?id=ai.synergon.hisab",
  },
  {
    title: "Helpkey Hotel Booking",
    summary:
      "A scalable, user-friendly hotel booking platform with real-time availability, secure payments, and seamless UX.",
    imageSrc: "/images/helpkey.png",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Razorpay", "AWS", "Tailwind CSS"],
    highlights: [
      "Unique Pre booking feature",
      "Live room availability and instant booking confirmation",
      "Intuitive search with filters for location, price, and amenities",
      "Secure payment integration and booking management dashboard",
    ],
    results: [
      "Reduced booking time by 40%",
      "Increased conversion rate by 18%",
    ],
    href: "https://helpkey.vercel.app",
    playStore: "https://play.google.com/store/apps/details?id=com.zrf.helpkey",
  },
  {
    title: "WhatsApp Bulk Software",
    summary:
      "A robust tool for sending personalized bulk WhatsApp messages, supporting attachments, scheduling, and delivery analytics.",
    imageSrc: "/images/msgzone.png",
    tags: ["Next.js", "TypeScript", "Node.js", "Redis", "Socket.io", "Docker", "Razorpay", "Tailwind CSS"],
    highlights: [
      "Bulk personalized WhatsApp messaging",
      "Attachment support and scheduling",
      "Delivery analytics and reporting",
      "Robust backend with Redis and Docker",
    ],
    results: [
      "Enabled 10,000+ daily message throughput",
      "Improved campaign delivery rates",
    ],
    href: "https://www.msgzone.live",
  },
  {
    title: "Dineezy",
    summary:
      "A comprehensive QR-based food ordering and restaurant management system designed to streamline dining experiences and operations.",
    imageSrc: "/images/dineezy.png",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Socket.io", "Tailwind CSS"],
    highlights: [
      "Contactless QR code menu and instant ordering system",
      "Real-time kitchen display system for order management",
      "Integrated payment processing and digital receipts",
      "Advanced analytics for sales and inventory tracking",
    ],
    results: [
      "Reduced order processing time by 25%",
      "Increased table turnover rate by 15%",
    ],
    href: "https://dineezy.in",
  },
  {
    title: "Interview AI",
    summary:
      "An AI-powered mock interview platform that provides real-time feedback, sentiment analysis, and personalized improvement suggestions.",
    imageSrc: "/images/interview.png",
    tags: ["Next.js", "TypeScript", "OpenAI", "WebRTC", "AI Tools", "Firebase", "Tailwind CSS"],
    highlights: [
      "Real-time AI-powered mock interviews",
      "Sentiment analysis and feedback",
      "Personalized improvement suggestions",
      "WebRTC-based video/audio interaction",
    ],
    results: [
      "Improved user confidence in interviews",
      "Provided actionable feedback for candidates",
    ],

  },

]

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
}

const item = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 14 } },
}

export default function ProjectsPage() {
  return (
    <div className="flex flex-col w-full">
      <section className="py-20 bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-blue-50/10 to-pink-50/20 dark:from-purple-950/30 dark:via-blue-950/10 dark:to-pink-950/20 -z-10" />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-block mb-4">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-800 dark:text-purple-300 text-sm font-medium shadow-sm">
                Our Projects
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-700 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Crafted for Impact
            </h1>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              A closer look at selected builds with details on approach and outcomes.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {detailedProjects.map((project, index) => (
              <motion.div key={index} variants={item} whileHover={{ y: -8 }} className="h-full">
                <Card className="group overflow-hidden h-full glass-effect border-white/10 dark:border-white/5 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-500">
                  <CardHeader className="p-0">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={project.imageSrc}
                        alt={project.title}
                        fill
                        className=" transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        <CardDescription className="mt-2 text-foreground/70">
                          {project.summary}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {project.href && (
                          <Link href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} website`}>
                            <Button size="icon" variant="ghost" className="h-9 w-9 hover:text-purple-600 hover:bg-purple-500/10">
                              <ExternalLink className="h-5 w-5" />
                            </Button>
                          </Link>
                        )}
                        {project.appStore && (
                          <Link href={project.appStore} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} App Store`}>
                            <Button size="icon" variant="ghost" className="h-9 w-9 hover:text-blue-500 hover:bg-blue-500/10">
                              <Apple className="h-5 w-5" />
                            </Button>
                          </Link>
                        )}
                        {project.playStore && (
                          <Link href={project.playStore} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} Play Store`}>
                            <Button size="icon" variant="ghost" className="h-9 w-9 hover:text-green-500 hover:bg-green-500/10">
                              <Play className="h-5 w-5 fill-current" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-background/80">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-foreground/70">Highlights</h3>
                        <ul className="list-disc list-inside space-y-1 text-foreground/80">
                          {project.highlights.map((h) => (
                            <li key={h}>{h}</li>
                          ))}
                        </ul>
                      </div>
                      {project.results && (
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium text-foreground/70">Results</h3>
                          <ul className="list-disc list-inside space-y-1 text-foreground/80">
                            {project.results.map((r) => (
                              <li key={r}>{r}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>

                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute -right-16 -top-16 w-48 h-48 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <Link href="/contact">
              <Button className="group">
                Have a project in mind?
                <ExternalLink className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}


