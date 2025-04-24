"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Calendar, MessageSquare, FileText } from "lucide-react"
import { useRef } from "react"
import Link from "next/link"

const ConversionSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-blue-50/20 to-pink-50/30 dark:from-purple-950/30 dark:via-blue-950/20 dark:to-pink-950/30 animate-gradient -z-10" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden -z-5">
        <motion.div
          style={{ y }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-300/10 dark:bg-purple-600/10 blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-300/10 dark:bg-blue-600/10 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-800 dark:text-purple-300 text-sm font-medium shadow-sm">
              Get Started
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-700 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Take the first step towards digital success. Choose the option that works best for you.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className="glass-effect border border-white/10 dark:border-white/5 rounded-xl p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 group"
          >
            <div className="bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 p-3 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
              <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Book a Strategy Call</h3>
            <p className="text-foreground/70 mb-6">
              Schedule a 15-minute call with our experts to discuss your project and goals.
            </p>
            <Link href="/contact">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white group relative overflow-hidden">
              <span className="relative z-10 flex items-center">
                Book Your Call
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className="glass-effect border border-white/10 dark:border-white/5 rounded-xl p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group"
          >
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 p-3 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Get a Free Audit</h3>
            <p className="text-foreground/70 mb-6">
              Receive a comprehensive audit of your current website with actionable insights.
            </p>
            <Link href="/contact">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 text-white group relative overflow-hidden">
              <span className="relative z-10 flex items-center">
                Request Audit
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className="glass-effect border border-white/10 dark:border-white/5 rounded-xl p-6 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 group"
          >
            <div className="bg-gradient-to-r from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 p-3 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
              <MessageSquare className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Start a Conversation</h3>
            <p className="text-foreground/70 mb-6">
              Have questions? Send us a message and we'll get back to you within 24 hours.
            </p>
            <Link href={"https://wa.me/+916394575814"}>
            <Button  className="w-full bg-gradient-to-r from-pink-600 to-purple-500 hover:from-pink-700 hover:to-purple-600 text-white group relative overflow-hidden">
              <span className="relative z-10 flex items-center">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-700 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
            </Link>
          </motion.div>
        </motion.div>

      {/* Newsletter Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 max-w-xl mx-auto glass-effect border border-white/10 dark:border-white/5 rounded-xl p-8 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
        >
          <h3 className="text-xl font-semibold mb-6 text-center">Subscribe to Our Newsletter</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-grow bg-background/50 border-white/10 focus:border-purple-500 transition-colors duration-300"
            />
            <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white whitespace-nowrap group relative overflow-hidden">
              <span className="relative z-10 flex items-center">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
          </div>
          <p className="text-foreground/60 text-sm mt-4 text-center">
            Get the latest digital marketing tips and trends delivered to your inbox.
          </p>
        </motion.div> */}
      </div>
    </section>
  )
}

export default ConversionSection
