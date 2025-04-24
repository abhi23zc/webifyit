"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X } from "lucide-react"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "trust", "packages", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
  
    { name: "About", href: "#trust" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10 dark:border-white/5"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <motion.span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent relative group">
              WebifyIt
              <motion.span
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 group-hover:w-full transition-all duration-300"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </motion.span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-foreground/80 hover:text-foreground transition-colors duration-200 relative ${
                  activeSection === link.href.substring(1) ? "text-foreground font-medium" : ""
                }`}
              >
                {link.name}
                {activeSection === link.href.substring(1) && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white relative overflow-hidden group">
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="relative z-50">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-effect fixed inset-0 top-16 z-40 flex flex-col"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-6 h-full">
              <div className="flex flex-col space-y-6 flex-grow justify-center">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className="text-2xl font-medium text-foreground/80 hover:text-foreground transition-colors duration-200 flex items-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="bg-gradient-to-r from-purple-600 to-blue-500 w-1 h-8 mr-4 rounded-full opacity-0 group-hover:opacity-100"></span>
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white">
                  Get Started
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
