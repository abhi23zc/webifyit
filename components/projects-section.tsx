"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

type Project = {
  title: string
  description: string
  imageSrc: string
  tags: string[]
  href?: string
}

const projects: Project[] = [
  {
    title: "Helpkey Hotel Booking",
    description:
      "A scalable, user-friendly hotel booking platform with real-time availability, secure payments, and seamless UX.",
    imageSrc: "/images/helpkey.png",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Razorpay", "AWS", "Tailwind CSS"],
    href: "https://helpkey.vercel.app",
  },
  {
    title: "WhatsApp Bulk Software",
    description:
      "A robust tool for sending personalized bulk WhatsApp messages, supporting attachments, scheduling, and delivery analytics.",
    imageSrc: "/images/msgzone.png",
    tags: ["Next.js", "TypeScript", "Node.js", "Redis", "Socket.io", "Docker" , "Razorpay", "Tailwind CSS"],
    href: "https://www.msgzone.live",
  },
  {
    title: "OyeStore",
    description:
      "A modern travel agency platform offering destination discovery, package booking, and itinerary management.",
    imageSrc: "/images/oyestore.png",
    tags: ["Next.js", "TypeScript", "Travel", "Booking", "UX"],
  },
]

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
}

const item = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/20 via-blue-50/10 to-pink-50/20 dark:from-purple-950/20 dark:via-blue-950/10 dark:to-pink-950/20 -z-10" />

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
              Featured Work
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-700 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
            Projects that Drive Results
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            A curated selection of recent builds showcasing performance, polish, and thoughtful UX.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={item} whileHover={{ y: -8 }} className="h-full">
              <Card className="group overflow-hidden h-full glass-effect border-white/10 dark:border-white/5 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-500">
                <CardHeader className="p-0">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.imageSrc}
                      alt={project.title}
                      fill
                      className=" transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription className="mt-2 text-foreground/70">
                        {project.description}
                      </CardDescription>
                    </div>
                    {project.href && (
                      <Link href={project.href} aria-label={`${project.title} link`}>
                        <Button size="icon" variant="ghost" className="hover:text-purple-600">
                          <ExternalLink className="h-5 w-5" />
                        </Button>
                      </Link>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-background/80">
                        {tag}
                      </Badge>
                    ))}
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
          className="mt-10 text-center flex items-center justify-center gap-3 flex-wrap"
        >
          <Link href="/contact">
            <Button className="group">
              Start a Project
              <ExternalLink className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Button>
          </Link>
          <Link href="/projects">
            <Button variant="outline" className="group">
              View all projects
              <ExternalLink className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}


