"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-background relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-50/10 to-transparent dark:from-purple-950/10 -z-10" />

      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden -z-5">
        <motion.div
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-purple-300/5 dark:bg-purple-600/5 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-300/5 dark:bg-blue-600/5 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Back to top button */}
      <div className="container mx-auto px-4 relative">
        <div className="absolute right-4 -top-6 z-10">
          <Button
            onClick={scrollToTop}
            size="icon"
            className="rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-lg group"
          >
            <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform duration-300" />
            <span className="sr-only">Back to top</span>
          </Button>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                WebifyIt
              </span>
            </Link>
            <p className="text-foreground/70 mb-6">
              Transform your business with cutting-edge web & app solutions. We build digital experiences that engage,
              convert, and retain customers.
            </p>

            {/* All social media links here */}
            {/* <div className="flex space-x-4">
              <Link
                href=""
                className="text-foreground/60 hover:text-purple-600 transition-colors duration-300 hover:scale-110 transform"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://x.com/zrf_abhi"
                className="text-foreground/60 hover:text-purple-600 transition-colors duration-300 hover:scale-110 transform"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://instagram.com/_zrf_abhi"
                className="text-foreground/60 hover:text-purple-600 transition-colors duration-300 hover:scale-110 transform"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://linkedin.com/in/abhishekgautam475/"
                className="text-foreground/60 hover:text-purple-600 transition-colors duration-300 hover:scale-110 transform"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-purple-700 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-foreground/70 hover:text-purple-600 transition-colors duration-300 flex items-center group"
                >
                  <span className="bg-gradient-to-r from-purple-600 to-blue-500 w-0 h-0.5 mr-0 opacity-0 group-hover:w-2 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300"></span>
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-foreground/70 hover:text-purple-600 transition-colors duration-300 flex items-center group"
                >
                  <span className="bg-gradient-to-r from-purple-600 to-blue-500 w-0 h-0.5 mr-0 opacity-0 group-hover:w-2 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300"></span>
                  App Development
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-foreground/70 hover:text-purple-600 transition-colors duration-300 flex items-center group"
                >
                  <span className="bg-gradient-to-r from-purple-600 to-blue-500 w-0 h-0.5 mr-0 opacity-0 group-hover:w-2 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300"></span>
                  AI Integration
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-foreground/70 hover:text-purple-600 transition-colors duration-300 flex items-center group"
                >
                  <span className="bg-gradient-to-r from-purple-600 to-blue-500 w-0 h-0.5 mr-0 opacity-0 group-hover:w-2 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300"></span>
                  SEO Optimization
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-foreground/70 hover:text-purple-600 transition-colors duration-300 flex items-center group"
                >
                  <span className="bg-gradient-to-r from-purple-600 to-blue-500 w-0 h-0.5 mr-0 opacity-0 group-hover:w-2 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300"></span>
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-foreground/70 hover:text-purple-600 transition-colors duration-300 flex items-center group"
                >
                  <span className="bg-gradient-to-r from-purple-600 to-blue-500 w-0 h-0.5 mr-0 opacity-0 group-hover:w-2 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300"></span>
                  Maintenance & Support
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-purple-700 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-foreground/70 hover:text-purple-600 transition-colors duration-300 flex items-center group"
                >
                  <span className="bg-gradient-to-r from-purple-600 to-blue-500 w-0 h-0.5 mr-0 opacity-0 group-hover:w-2 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300"></span>
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-foreground/70 hover:text-purple-600 transition-colors duration-300 flex items-center group"
                >
                  <span className="bg-gradient-to-r from-purple-600 to-blue-500 w-0 h-0.5 mr-0 opacity-0 group-hover:w-2 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300"></span>
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-foreground/70 hover:text-purple-600 transition-colors duration-300 flex items-center group"
                >
                  <span className="bg-gradient-to-r from-purple-600 to-blue-500 w-0 h-0.5 mr-0 opacity-0 group-hover:w-2 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300"></span>
                  Free Website Audit
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-foreground/70 hover:text-purple-600 transition-colors duration-300 flex items-center group"
                >
                  <span className="bg-gradient-to-r from-purple-600 to-blue-500 w-0 h-0.5 mr-0 opacity-0 group-hover:w-2 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300"></span>
                  Digital Marketing Guide
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-foreground/70 hover:text-purple-600 transition-colors duration-300 flex items-center group"
                >
                  <span className="bg-gradient-to-r from-purple-600 to-blue-500 w-0 h-0.5 mr-0 opacity-0 group-hover:w-2 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300"></span>
                  SEO Checklist
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-foreground/70 hover:text-purple-600 transition-colors duration-300 flex items-center group"
                >
                  <span className="bg-gradient-to-r from-purple-600 to-blue-500 w-0 h-0.5 mr-0 opacity-0 group-hover:w-2 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300"></span>
                  FAQ
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            
              <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-purple-700 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                Contact Us
              </h3>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-foreground/70 group-hover:text-foreground transition-colors duration-300">
                  webifyit.in@gmail.com
                </span>
              </li>
              <li className="flex items-start group">
                <Phone className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-foreground/70 group-hover:text-foreground transition-colors duration-300">
                  +91 63945 75814
                </span>
              </li>
              <li className="flex items-start group">
                <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-foreground/70 group-hover:text-foreground transition-colors duration-300">
                  Kanpur Uttar Pradesh

                  <br />
                  India
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-foreground/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} WebifyIt. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-foreground/60 hover:text-purple-600 transition-colors duration-300 text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-foreground/60 hover:text-purple-600 transition-colors duration-300 text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-foreground/60 hover:text-purple-600 transition-colors duration-300 text-sm">
              Sitemap
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
