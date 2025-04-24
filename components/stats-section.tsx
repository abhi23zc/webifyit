"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Award, Users, Briefcase } from "lucide-react"

// Stats data
const stats = [
  {
    value: 30,
    label: "Projects Completed",
    icon: <Briefcase className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
    suffix: "+",
  },
  {
    value: 100,
    label: "Happy Clients",
    icon: <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    suffix: "+",
  },
  {
    value: 10,
    label: "Years Experience",
    icon: <Award className="h-8 w-8 text-pink-600 dark:text-pink-400" />,
    suffix: "+",
  },
  {
    value: 15,
    label: "Employees",
    icon: <Award className="h-8 w-8 text-pink-600 dark:text-pink-400" />,
    suffix: "+",
  },
  {
    value: 5000,
    label: "Leads Generated",
    icon: <Award className="h-8 w-8 text-pink-600 dark:text-pink-400" />,
    suffix: "+",
  },
]

// Fixed custom hook for animated counter
const useCounter = (end: number, start = 0, duration = 2000, delay = 0, decimals = 0) => {
  const [count, setCount] = useState(start)
  const nodeRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)
  const animationFrame = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true

          const step = (timestamp: number) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp
            const progress = Math.min((timestamp - startTimeRef.current) / duration, 1)

            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            const currentValue = start + easeOutQuart * (end - start)

            setCount(currentValue)

            if (progress < 1) {
              animationFrame.current = requestAnimationFrame(step)
            }
          }

          setTimeout(() => {
            animationFrame.current = requestAnimationFrame(step)
          }, delay)
        }
      },
      { threshold: 0.1 },
    )

    if (nodeRef.current) observer.observe(nodeRef.current)

    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
      observer.disconnect()
    }
  }, [end, start, duration, delay])

  return { count: count.toFixed(decimals), nodeRef }
}

const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-blue-50/20 to-pink-50/30 dark:from-purple-950/30 dark:via-blue-950/20 dark:to-pink-950/30 animate-gradient -z-10" />

      {/* Background shapes */}
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
              Our Impact
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-700 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
            Achievements & Milestones
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Our track record speaks for itself. Here's what we've accomplished for businesses just like yours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 flex justify-center">
          {stats.map((stat, index) => {
            const { count, nodeRef } = useCounter(stat.value, 0, 2000, index * 200, stat.decimals || 0)

            return (
              <motion.div
                key={index}
                ref={nodeRef}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
              >
                <div className="glass-effect border border-white/10 dark:border-white/5 rounded-xl p-6 h-full hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-500 overflow-hidden flex flex-col items-center text-center">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700" />

                  <div className="relative mb-4 p-4 rounded-full bg-gradient-to-br from-purple-100/50 to-blue-100/50 dark:from-purple-900/20 dark:to-blue-900/20 group-hover:scale-110 transition-all duration-500">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-200/50 to-blue-200/50 dark:from-purple-800/20 dark:to-blue-800/20"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.7, 0.9, 0.7],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                    <div className="relative z-10">{stat.icon}</div>
                  </div>

                  <div className="relative z-10 mb-2 flex items-center justify-center">
                    <span className="text-4xl font-bold bg-gradient-to-r from-purple-700 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                      {count}
                    </span>
                    <span className="text-4xl font-bold bg-gradient-to-r from-purple-700 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                      {stat.suffix}
                    </span>
                  </div>

                  <p className="text-foreground/70 relative z-10">{stat.label}</p>
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-500"></div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
