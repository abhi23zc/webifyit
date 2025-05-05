"use client"

import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, CheckCircle } from "lucide-react"
import HeroAnimation from "@/components/hero-animation"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

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

  // Handle hydration issues by only rendering client-side elements after mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Generate random particles only after component is mounted
  const particles = isMounted
    ? Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      width: Math.random() * 10 + 5,
      height: Math.random() * 10 + 5,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
    }))
    : [];

  return (
    <section ref={sectionRef} className="relative pt-24 pb-20  md:pb-28 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/20 via-blue-50/10 to-pink-50/20 dark:from-purple-950/20 dark:via-blue-950/10 dark:to-pink-950/20 animate-gradient -z-10" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-300/10 dark:bg-purple-600/10 blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-300/10 dark:bg-blue-600/10 blur-xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full bg-pink-300/10 dark:bg-pink-600/10 blur-xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 9,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Floating particles - only rendered after client-side hydration */}
      {/* {isMounted && (
        <div className="absolute inset-0 -z-5">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-purple-500/10 dark:bg-purple-500/20"
              style={{
                width: particle.width,
                height: particle.height,
                left: particle.left,
                top: particle.top,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: particle.duration,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      )} */}

      <motion.div style={{ y, opacity }} className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-1/2 space-y-6"
          >
            <motion.div variants={itemVariants} className="inline-block">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-800 dark:text-purple-300 text-sm font-medium shadow-sm">
                Digital Services Agency
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-purple-700 via-blue-600 to-purple-600 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent animate-gradient bg-300%">
                Transform Your Business
              </span>
              <br />
              <span className="text-foreground">with Cutting-Edge Solutions</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg text-foreground/80 max-w-xl">
              We build modern, high-performance digital solutions that help businesses grow, engage customers, and stay
              ahead of the competition.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href={"/contact"}>
                <Button

                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white group relative overflow-hidden shadow-md"
                >
                  <span className="relative z-10 flex items-center">
                    Get Your Free Website Audit
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </Link>
              <Link href={"https://wa.me/+916394575814"}>

                <Button size="lg" variant="outline" className="border-2 relative overflow-hidden group">
                  <span className="relative z-10">Book a 30-Minute Strategy Call</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </Link >
            </motion.div>

            <motion.div variants={itemVariants} className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-foreground/80">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-foreground/80">SEO Optimized</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-foreground/80">24/7 Support</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-300/20 to-blue-300/20 dark:from-purple-700/20 dark:to-blue-700/20 rounded-full blur-3xl animate-pulse-slow"></div>
              {/* <HeroAnimation /> */}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-sm text-foreground/60 mb-2">Scroll to explore</span>
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
          className="w-6 h-10 rounded-full border-2 border-foreground/20 flex justify-center p-1"
        >
          <motion.div
            animate={{
              y: [0, 6, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            className="w-1.5 h-1.5 rounded-full bg-purple-500"
          />
        </motion.div>
      </motion.div> */}
    </section>
  )
}

export default HeroSection
