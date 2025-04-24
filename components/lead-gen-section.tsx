"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Mail, MessageSquare, Download } from "lucide-react"

const leadGenItems = [
  {
    title: "Gated Content that Converts",
    description:
      "High-value downloadable resources that capture leads while providing immediate value to your audience.",
    icon: <FileText className="h-10 w-10 text-purple-600 dark:text-purple-400" />,
    cta: "Download the '10-Point Digital Audit' Checklist",
  },
  {
    title: "Drip Campaigns, Big Results",
    description:
      "Automated email sequences that nurture leads through the sales funnel with targeted, valuable content.",
    icon: <Mail className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
    // cta: "Sign Up for Our Newsletter",
  },
  {
    title: "Popups that Pop (In All the Right Ways)",
    description: "Strategic, non-intrusive popups that capture leads at the perfect moment in the user journey.",
    icon: <MessageSquare className="h-10 w-10 text-pink-600 dark:text-pink-400" />,
    cta: "Get Your Free Website Audit",
  },
  {
    title: "Offer, Capture, Nurture, Convert",
    description:
      "Complete lead generation systems that take prospects from awareness to conversion with minimal friction.",
    icon: <Download className="h-10 w-10 text-green-600 dark:text-green-400" />,
    cta: "Start Your 7-Day Trial",
  },
]

const LeadGenSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/50 dark:to-blue-950/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Lead-Gen Enhancements</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Convert more visitors into leads and customers with our proven lead generation strategies and tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {leadGenItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full border border-border/50 bg-background/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-shrink-0">{item.icon}</div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="text-foreground/70">{item.description}</p>
                      {item?.cta && <Button variant="outline" className="group">
                        {item.cta}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </Button>
                      }
                    </div>
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

export default LeadGenSection
