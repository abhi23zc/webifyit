"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Bot, Cpu, Smartphone, Check, ArrowRight, X, SquareArrowOutUpLeft } from "lucide-react";
import Card3D from "./Card3D";

export default function Services() {
  const [selectedService, setSelectedService] = useState<null | typeof servicesData[0]>(null);

  const servicesData = [
    {
      id: "SPEC-01",
      title: "Custom Website Development",
      description:
        "Fast, modern websites built with the latest technology. We make sure your site loads quickly, looks great, and works perfectly on all devices.",
      icon: <Code2 className="w-6 h-6 text-[#1F3D8C]" />,
      techSpecs: ["Next.js 16 App Router", "React 19 & TypeScript", "PostgreSQL & Prisma", "Fast Global Hosting"],
      deliverables: ["Super-Fast Website", "REST & GraphQL API", "Fast Global Hosting", "100/100 Google Speed Score"],
      timeline: "2 – 4 Weeks",
      widget: (
        <div className="space-y-2 mt-4 pt-4 border-t border-[#DCDDD6] translate-z-20">
          <div className="flex justify-between items-center font-mono text-xs">
            <span className="text-[#585D67]">Build & Test Pipeline</span>
            <span className="font-bold text-[#1F3D8C]">99.8% AUTOMATED</span>
          </div>
          <div className="w-full bg-[#F5F6F1] h-2 rounded-full overflow-hidden border border-[#DCDDD6]">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "99%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-[#1F3D8C] h-full"
            />
          </div>
          <div className="flex gap-2 pt-1 flex-wrap">
            <span className="tag-pill tag-pill-blue text-[10px]">Next.js 16</span>
            <span className="tag-pill tag-pill-blue text-[10px]">React 19</span>
            <span className="tag-pill tag-pill-blue text-[10px]">TypeScript</span>
          </div>
        </div>
      ),
    },
    {
      id: "SPEC-02",
      title: "AI Chatbots & Voice Assistants",
      description:
        "Custom AI chatbots and voice assistants that talk to your customers 24/7 in English and Hindi — on WhatsApp or your website.",
      icon: <Bot className="w-6 h-6 text-[#FF4B23]" />,
      techSpecs: ["OpenAI GPT-4o & Claude 3.5", "Voice AI & Speech Technology", "Smart AI Memory & Search", "WhatsApp API Integration"],
      deliverables: ["24/7 AI Voice Assistant", "Document & Image AI", "Hindi + English Support", "Live CRM Updates"],
      timeline: "3 – 5 Weeks",
      widget: (
        <div className="space-y-2 mt-4 pt-4 border-t border-[#DCDDD6] translate-z-20">
          <div className="flex justify-between items-center font-mono text-xs">
            <span className="text-[#585D67]">Voice AI Response Latency</span>
            <span className="tag-pill tag-pill-accent text-[10px] font-bold">&lt; 220ms LATENCY</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono bg-[#EEF2FB] p-2 rounded-xs border border-[#1F3D8C]/20">
            <span className="text-[#585D67]">Multi-lingual Bot</span>
            <span className="font-bold text-[#FF4B23]">English + Hindi</span>
          </div>
          <div className="w-full bg-[#F5F6F1] h-2 rounded-full overflow-hidden border border-[#DCDDD6]">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "95%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-[#FF4B23] h-full"
            />
          </div>
        </div>
      ),
    },
    {
      id: "SPEC-03",
      title: "Cloud SaaS Platforms",
      description:
        "Full-featured cloud software (SaaS) with user accounts, subscription payments, admin dashboards, and the ability to grow as your business scales.",
      icon: <Cpu className="w-6 h-6 text-[#12151B]" />,
      techSpecs: ["Multi-Tenant Architecture", "Razorpay / Stripe Payments", "Docker & Kubernetes Hosting", "AWS / Vercel Cloud"],
      deliverables: ["Full Admin Dashboard", "Subscription & Billing System", "Usage Analytics", "User Role Management"],
      timeline: "4 – 8 Weeks",
      widget: (
        <div className="space-y-2 mt-4 pt-4 border-t border-[#DCDDD6] translate-z-20">
          <div className="flex justify-between items-center font-mono text-xs">
            <span className="text-[#585D67]">Cloud SLA Uptime</span>
            <span className="font-bold text-[#12151B]">99.99% GUARANTEE</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-mono text-[#8A8E96]">
              <span>Auto-Scaling Clusters</span>
              <span>Active</span>
            </div>
            <div className="w-full bg-[#F5F6F1] h-2 rounded-full overflow-hidden border border-[#DCDDD6]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-[#12151B] h-full"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "SPEC-04",
      title: "Mobile Apps for iOS & Android",
      description:
        "Mobile apps that work on both iPhone and Android. Includes offline mode, push notifications, camera access, and listing on app stores.",
      icon: <Smartphone className="w-6 h-6 text-[#1F3D8C]" />,
      techSpecs: ["React Native & Expo", "TypeScript Core", "Offline Data Storage", "Push Notifications"],
      deliverables: ["iOS & Android App", "Camera & Bluetooth APIs", "Offline Mode", "App Store & Play Store Launch"],
      timeline: "3 – 6 Weeks",
      widget: (
        <div className="space-y-2 mt-4 pt-4 border-t border-[#DCDDD6] translate-z-20">
          <div className="flex justify-between items-center font-mono text-xs">
            <span className="text-[#585D67]">Cross-Platform Deployment</span>
            <span className="font-bold text-emerald-600">iOS + ANDROID</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-[#EEF2FB] p-2 rounded-xs border border-[#1F3D8C]/20">
              <div className="font-mono text-[10px] text-[#8A8E96]">APP STORE</div>
              <div className="font-display font-bold text-xs text-[#1F3D8C]">Ready</div>
            </div>
            <div className="bg-[#F5F6F1] p-2 rounded-xs border border-[#DCDDD6]">
              <div className="font-mono text-[10px] text-[#8A8E96]">PLAY STORE</div>
              <div className="font-display font-bold text-xs text-[#12151B]">Published</div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="services" className="py-20 bg-[#F5F6F1] border-b border-[#DCDDD6]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-[#FF4B23] tracking-widest uppercase">
              FIG. 01 — CORE ENGINEERING CAPABILITIES
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#12151B] tracking-tight">
            What we build for your business
          </h2>
          <p className="font-body text-base text-[#585D67] mt-3">
            We build reliable software solutions tailored to help your business grow. Hover over any card to see details, or click to see what’s included.
          </p>
        </div>

        {/* 3D Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesData.map((service, idx) => (
            <Card3D key={service.id} intensity={10} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedService(service)}
                className="xmark bg-white border border-[#C7C9C0] p-6 sm:p-8 rounded-xs hover:shadow-3d transition-all duration-300 flex flex-col justify-between cursor-pointer group h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 translate-z-10">
                    <div className="p-3 bg-[#F5F6F1] border border-[#DCDDD6] rounded-xs group-hover:border-[#FF4B23] transition-colors shadow-2xs">
                      {service.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#8A8E96] border border-[#DCDDD6] px-2 py-0.5 rounded-xs">
                        {service.id}
                      </span>
                      <span className="font-mono text-xs font-semibold text-[#FF4B23] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details →
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#12151B] group-hover:text-[#FF4B23] transition-colors mb-2 translate-z-20">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-[#585D67] leading-relaxed translate-z-10">
                    {service.description}
                  </p>
                </div>

                {service.widget}
              </motion.div>
            </Card3D>
          ))}
        </div>

      </div>

      {/* Service Spec Drawer */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12151B]/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white border-2 border-[#12151B] w-full max-w-xl rounded-xs p-6 sm:p-8 relative xmark shadow-2xl"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 border border-[#C7C9C0] rounded-xs text-[#12151B] hover:bg-[#FF4B23] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-[#F5F6F1] border border-[#DCDDD6] rounded-xs">
                  {selectedService.icon}
                </div>
                <div>
                  <span className="font-mono text-xs font-bold text-[#FF4B23]">
                    {selectedService.id} SPECIFICATION
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#12151B]">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              <p className="font-body text-sm text-[#585D67] mb-6 leading-relaxed">
                {selectedService.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 pt-4 border-t border-[#DCDDD6]">
                <div>
                  <div className="font-mono text-xs font-bold text-[#1F3D8C] uppercase mb-3 flex items-center gap-1.5">
                    <SquareArrowOutUpLeft className="w-3.5 h-3.5" />
                    TOOLS WE USE
                  </div>
                  <ul className="space-y-2 font-body text-xs text-[#12151B]">
                    {selectedService.techSpecs.map((spec) => (
                      <li key={spec} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#FF4B23] shrink-0" />
                        <span className="font-medium">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="font-mono text-xs font-bold text-[#1F3D8C] uppercase mb-3 flex items-center gap-1.5">
                    <SquareArrowOutUpLeft className="w-3.5 h-3.5" />
                    WHAT YOU GET
                  </div>
                  <ul className="space-y-2 font-body text-xs text-[#12151B]">
                    {selectedService.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#1F3D8C] shrink-0" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#F5F6F1] border border-[#DCDDD6] rounded-xs">
                <div className="font-mono text-xs">
                  <span className="text-[#8A8E96]">DELIVERY TIME: </span>
                  <span className="font-bold text-[#12151B]">{selectedService.timeline}</span>
                </div>
                <a
                  href={`https://wa.me/916394575814?text=Hi%20WebifyIt!%20I%20want%20to%20discuss%20${encodeURIComponent(selectedService.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs py-2.5 px-4 flex items-center gap-1.5 shadow-3d-accent"
                >
                  <span>Start This Project</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
