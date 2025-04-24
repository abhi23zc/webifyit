"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart, LineChart, PieChart, Activity } from "lucide-react"

const AnalyticsSection = () => {
  return (
    <section className="py-20 bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/20 to-blue-50/20 dark:from-purple-950/20 dark:to-blue-950/20 -z-10" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Track. Analyze. Optimize.</h2>
            <p className="text-foreground/70 mb-6">
              Gain valuable insights into your website's performance and visitor behavior with our comprehensive
              analytics solutions. Make data-driven decisions to continuously improve your digital presence.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Card className="border border-border/50 bg-background/50 backdrop-blur-sm">
                <CardContent className="p-6 flex items-start">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-4">
                    <BarChart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">User Behavior</h3>
                    <p className="text-foreground/70 text-sm">Understand how visitors interact with your site</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-border/50 bg-background/50 backdrop-blur-sm">
                <CardContent className="p-6 flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-4">
                    <LineChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Conversion Tracking</h3>
                    <p className="text-foreground/70 text-sm">Monitor goals and conversion rates</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-border/50 bg-background/50 backdrop-blur-sm">
                <CardContent className="p-6 flex items-start">
                  <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-full mr-4">
                    <PieChart className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Audience Insights</h3>
                    <p className="text-foreground/70 text-sm">Learn about your audience demographics</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-border/50 bg-background/50 backdrop-blur-sm">
                <CardContent className="p-6 flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-4">
                    <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Performance Metrics</h3>
                    <p className="text-foreground/70 text-sm">Track page speed and site performance</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg">
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Website Traffic Overview</h3>
                <div className="h-64 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg flex items-end p-4">
                  {[35, 55, 40, 70, 85, 60, 75, 65, 90, 80, 95, 70].map((height, index) => (
                    <div
                      key={index}
                      className="w-full bg-purple-500/70 dark:bg-purple-500/50 rounded-t mx-1"
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-foreground/60">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dec</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background/50 p-4 rounded-lg border border-border/30">
                  <h4 className="text-sm font-medium text-foreground/60 mb-1">Visitors</h4>
                  <p className="text-2xl font-bold">12,543</p>
                  <p className="text-green-500 text-sm">+24% from last month</p>
                </div>
                <div className="bg-background/50 p-4 rounded-lg border border-border/30">
                  <h4 className="text-sm font-medium text-foreground/60 mb-1">Conversions</h4>
                  <p className="text-2xl font-bold">3,827</p>
                  <p className="text-green-500 text-sm">+18% from last month</p>
                </div>
                <div className="bg-background/50 p-4 rounded-lg border border-border/30">
                  <h4 className="text-sm font-medium text-foreground/60 mb-1">Avg. Session</h4>
                  <p className="text-2xl font-bold">3:42</p>
                  <p className="text-green-500 text-sm">+1:12 from last month</p>
                </div>
                <div className="bg-background/50 p-4 rounded-lg border border-border/30">
                  <h4 className="text-sm font-medium text-foreground/60 mb-1">Bounce Rate</h4>
                  <p className="text-2xl font-bold">28.3%</p>
                  <p className="text-green-500 text-sm">-5.7% from last month</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AnalyticsSection
