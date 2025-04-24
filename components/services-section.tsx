"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Code, Smartphone, Cpu, Wrench, AtomIcon } from "lucide-react"

const services = [
  {
    title: "Web & App Development",
    description:
      "Custom websites and app  built with the latest technologies for optimal performance and user experience.",
    icon: <Code className="h-10 w-10 text-purple-600 dark:text-purple-400" />,
  },

  {
    title: "AI Integration",
    description:
      "Implement cutting-edge AI solutions to automate processes, analyze data, and enhance customer experiences.",
    icon: <Cpu className="h-10 w-10 text-pink-600 dark:text-pink-400" />,
  },
  {
    title: "Lead Generation",
    description:
      "Strategic campaigns and optimized funnels to attract qualified prospects and convert them into valuable customers for your business.",
    icon: <Wrench className="h-10 w-10 text-green-600 dark:text-green-400" />,
  },
  {
    title: "Custom SaaS",
    description:
      "Tailored software-as-a-service solutions designed to meet your specific business needs with scalable, cloud-based architecture.",
    icon: <AtomIcon className="h-10 w-10 text-green-600 dark:text-green-400" />,
  },
]

const ServicesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section id="services" className="py-20 bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-blue-50/20 to-pink-50/30 dark:from-purple-950/30 dark:via-blue-950/20 dark:to-pink-950/30 animate-gradient -z-10" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent z-10"></div>

      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-800 dark:text-purple-300 text-sm font-medium shadow-sm">
              Our Expertise
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-700 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
            Comprehensive Digital Services
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            We offer a comprehensive range of digital services to help your business thrive in the digital landscape.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants} whileHover={{ y: -10 }} className="h-full">
              <Card className="h-full glass-effect border-white/10 dark:border-white/5 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-500 overflow-hidden group">
                <CardHeader className="relative">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700"></div>
                  <div className="mb-4 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl relative z-10">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/70 relative z-10">{service.description}</CardDescription>
                </CardContent>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-500"></div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection
