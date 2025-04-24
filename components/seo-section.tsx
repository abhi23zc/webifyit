"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Zap, Search, BarChart } from "lucide-react"

const SeoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={sectionRef} className="py-20 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-blue-950/30 dark:to-purple-950/30 -z-10" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div style={{ y, opacity }} className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <Search className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-3" />
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-full max-w-xs"></div>
              </div>

              <div className="space-y-4 mb-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-full"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-5/6"></div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm font-medium">98/100 Page Speed</span>
                </div>
                <div className="flex items-center">
                  <BarChart className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm font-medium">Top 3 Rankings</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 order-1 lg:order-2"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Lightning-Fast, Mobile-First Experience</h2>
            <p className="text-foreground/70 mb-6">
              Our websites are built with performance in mind, ensuring your visitors have a seamless experience
              regardless of their device. We optimize every aspect of your site to achieve top search engine rankings
              and lightning-fast load times.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-4">
                  <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Optimized Performance</h3>
                  <p className="text-foreground/70 text-sm">
                    We build websites that load in under 2 seconds, keeping your visitors engaged and reducing bounce
                    rates.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-4">
                  <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">SEO Optimization</h3>
                  <p className="text-foreground/70 text-sm">
                    Our SEO strategies help your business rank higher in search results, driving more organic traffic to
                    your website.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-full mr-4">
                  <BarChart className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Conversion Focused</h3>
                  <p className="text-foreground/70 text-sm">
                    We design with conversion in mind, ensuring your website not only attracts visitors but turns them
                    into customers.
                  </p>
                </div>
              </li>
            </ul>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              Get Your Free Site Speed Test
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SeoSection
