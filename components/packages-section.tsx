"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Sparkles } from "lucide-react"
import { useRef } from "react"

const packages = [
  {
    name: "Free",
    description: "Perfect for small businesses just getting started",
    price: "$999",
    features: [
      "Consultancy",
      "Basic SEO Setup",
      "Contact Form",
      "Social Media Integration",
    ],
    popular: false,
    color: "from-purple-600 to-blue-500",
    hoverColor: "from-purple-700 to-blue-600",
  },
  {
    name: "Starter",
    description: "Perfect for small businesses just getting started",
    price: "$999",
    features: [
      "Responsive Website (5 pages)",
      "Basic SEO Setup",
      "Contact Form",
      "Mobile Responsive Design",
      "Social Media Integration",
      "1 Month Support",
    ],
    popular: false,
    color: "from-purple-600 to-blue-500",
    hoverColor: "from-purple-700 to-blue-600",
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses with digital needs",
    price: "$2,499",
    features: [
      "Responsive Website (up to 10 pages)",
      "Advanced SEO Optimization",
      "Content Management System",
      "Email Newsletter Setup",
      "Google Analytics Integration",
      "Lead Generation Forms",
      "Live Chat Integration",
      "3 Months Support",
    ],
    popular: true,
    color: "from-blue-600 to-purple-600",
    hoverColor: "from-blue-700 to-purple-700",
  },
  {
    name: "Enterprise",
    description: "Complete solution for established businesses",
    price: "$4,999",
    features: [
      "Custom Web Application",
      "E-commerce Functionality",
      "Custom API Integrations",
      "AI Chatbot Implementation",
      "Advanced Analytics Dashboard",
      "User Authentication System",
      "Payment Gateway Integration",
      "6 Months Priority Support",
      "Monthly Performance Reports",
    ],
    popular: false,
    color: "from-purple-600 to-pink-500",
    hoverColor: "from-purple-700 to-pink-600",
  },
]

const PackagesSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y3 = useTransform(scrollYProgress, [0, 1], [200, 0])

  return (
    <section id="packages" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-purple-950/50 dark:via-blue-950/50 dark:to-pink-950/50 animate-gradient -z-10" />

      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden -z-5">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-purple-300/10 dark:bg-purple-600/10 blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-blue-300/10 dark:bg-blue-600/10 blur-3xl"
        />
        <motion.div
          style={{ y: y3 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-pink-300/10 dark:bg-pink-600/10 blur-3xl"
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
              Pricing Plans
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-700 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
            Service Packages
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Choose the perfect package for your business needs with our transparent pricing and comprehensive solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="flex"
            >
              <Card
                className={`flex flex-col h-full glass-effect border-white/10 dark:border-white/5 ${
                  pkg.popular ? "shadow-xl shadow-purple-500/10" : ""
                } relative overflow-hidden group`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-1 rounded-bl-lg shadow-lg flex items-center gap-1 font-medium">
                      <Sparkles className="h-4 w-4" />
                      Popular
                    </div>
                  </div>
                )}

                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <CardHeader>
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <span className="text-4xl font-bold bg-gradient-to-r from-purple-700 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                      {pkg.price}
                    </span>
                    <span className="text-foreground/60 ml-2">one-time</span>
                  </div>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.05, duration: 0.3 }}
                      >
                        <div
                          className={`flex-shrink-0 h-5 w-5 rounded-full bg-gradient-to-r ${pkg.color} flex items-center justify-center mr-2 mt-0.5`}
                        >
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-foreground/80">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full relative overflow-hidden group bg-gradient-to-r ${pkg.color} hover:${pkg.hoverColor} text-white`}
                  >
                    <span className="relative z-10">Get Started</span>
                    <span
                      className={`absolute inset-0 bg-gradient-to-r ${pkg.hoverColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    ></span>
                  </Button>
                </CardFooter>

                {/* Bottom border animation */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-500"></div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PackagesSection
