"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Dipak Bhargav",
    company: "Helpkey",
    content:
      "The team at WebifyIt delivered our mobile app ahead of schedule and under budget. Their attention to detail and user experience expertise is unmatched.",
    
    rating: 5,
  },
  {
    name: "Vinod Bajpai",
    company: "Renascence Hosiers",
    content:
      "WebifyIt transformed our outdated website into a modern, high-converting platform. Our leads increased by 150% in just two months!",
    rating: 5,
  },

]

const logos = ["Helpkey", "Renascence Hosiers", "Goodgut", "OyeStore", "GrowPlus" ]

const TrustSection = () => {
  return (
    <section id="trust" className="py-20 bg-background/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Businesses</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            See what our clients have to say about our services and how we've helped them achieve their digital goals.
          </p>
        </motion.div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-8 mb-16"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-center justify-center h-16 px-6"
            >
              <div className="text-xl font-bold text-foreground/60 dark:text-foreground/40">{logo}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full border border-border/50 bg-background/50 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mb-4 text-foreground/80 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-foreground/60">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustSection
