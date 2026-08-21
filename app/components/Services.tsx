"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Bot, Cpu, Smartphone, Check, ArrowRight, X, SquareArrowOutUpLeft } from "lucide-react";
import Card3D from "./Card3D";

export default function Services() {
  const [selectedService, setSelectedService] = useState<null | typeof servicesData[0]>(null);

  const servicesData = [
    {
      title: "Custom Web Applications",
      description:
        "Fast, scalable web applications built to handle your business needs. We ensure your platform handles high traffic seamlessly and works perfectly on all devices.",
      icon: <Code2 className="w-6 h-6 text-[#1F3D8C]" />,
      trustLogos: [
        { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
        { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" }
      ],
      techSpecs: ["React & Next.js", "Node.js Backend", "Secure Databases", "Fast Cloud Hosting"],
      deliverables: ["Custom Web App", "Admin Dashboard", "Mobile Responsive", "SEO Optimized"],
      timeline: "2 – 4 Weeks",
      imageSrc: "/images/services/web-app-mockup.png",
    },
    {
      title: "AI Chatbots & Voice",
      description:
        "Smart AI chatbots and voice assistants that talk to your customers 24/7 in English and Hindi — directly on WhatsApp or your website.",
      icon: <Bot className="w-6 h-6 text-[#FF4B23]" />,
      trustLogos: [
        { name: "OpenAI", url: "https://cdn.worldvectorlogo.com/logos/openai-2.svg" },
        { name: "n8n", url: "https://cdn.worldvectorlogo.com/logos/n8n.svg" },
        { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" }
      ],
      techSpecs: ["OpenAI GPT-4", "n8n Automation", "Python AI Models", "WhatsApp API"],
      deliverables: ["24/7 Customer Support", "WhatsApp Integration", "Hindi + English", "Automated Lead Capture"],
      timeline: "3 – 5 Weeks",
      imageSrc: "/images/services/ai-chat-mockup.png",
    },
    {
      title: "Cloud SaaS Platforms",
      description:
        "Full-featured cloud software with user accounts, subscription payments, and admin dashboards. Built to scale as your business grows.",
      icon: <Cpu className="w-6 h-6 text-[#12151B]" />,
      trustLogos: [
        { name: "AWS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
        { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
        { name: "Stripe", url: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg" }
      ],
      techSpecs: ["AWS Cloud", "Docker Containers", "Stripe Payments", "Secure Authentication"],
      deliverables: ["User Dashboards", "Subscription Billing", "Usage Analytics", "Role Management"],
      timeline: "4 – 8 Weeks",
      imageSrc: "/images/services/saas-dashboard-mockup.png",
    },
    {
      title: "Mobile Apps (iOS & Android)",
      description:
        "High-performance mobile apps that work on both iPhone and Android. Give your users a native experience with push notifications and offline mode.",
      icon: <Smartphone className="w-6 h-6 text-[#1F3D8C]" />,
      trustLogos: [
        { name: "Apple", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg" },
        { name: "Android", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg" },
        { name: "Kotlin", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg" }
      ],
      techSpecs: ["iOS Native", "Android Native", "React Native", "Kotlin"],
      deliverables: ["App Store Launch", "Play Store Launch", "Push Notifications", "Camera Integration"],
      timeline: "3 – 6 Weeks",
      imageSrc: "/images/services/hisab_ai_mockup.png",
    },
  ];

  return (
    <section id="services" className="py-20 bg-[#F5F6F1] border-b border-[#DCDDD6]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 xl:px-12">

        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-[#FF4B23] tracking-widest uppercase">
              WHAT WE BUILD
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#12151B] tracking-tight">
            What we build for your business
          </h2>
          <p className="font-body text-base text-[#585D67] mt-3">
            We build reliable software solutions tailored to help your business grow. Hover over any card to see details, or click to see what’s included.
          </p>
        </div>

        {/* Visual Grid - 4 Column Wide Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {servicesData.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedService(service)}
              className="bg-white border border-[#DCDDD6] hover:border-[#1F3D8C] rounded-[1.25rem] hover:shadow-3d transition-all duration-300 flex flex-col justify-between cursor-pointer group h-full relative overflow-hidden"
            >
              {/* Subtle gradient glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#EEF2FB] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              {/* Service Mockup Image */}
              <div className="w-full h-40 sm:h-44 bg-[#F5F6F1] border-b border-[#DCDDD6] overflow-hidden relative">
                {service.imageSrc ? (
                  <img
                    src={service.imageSrc}
                    alt={service.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#8A8E96] font-mono text-xs">Image Placeholder</div>
                )}
              </div>

              <div className="relative z-10 p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-blue-50 text-[#1F3D8C] border border-blue-100 rounded-xl group-hover:bg-[#1F3D8C] group-hover:text-white transition-colors duration-300 shadow-sm inline-flex">
                    {React.cloneElement(service.icon as React.ReactElement<{ className?: string }>, { className: "w-4 h-4" })}
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold text-[#12151B] group-hover:text-[#1F3D8C] transition-colors mb-2 leading-tight">
                  {service.title}
                </h3>

                <div className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-[#FF4B23] bg-[#FF4B23]/10 border border-[#FF4B23]/20 px-2 py-0.5 rounded-sm mb-3 w-fit">
                  <span>⚡ {service.timeline}</span>
                </div>

                <p className="font-body text-[13px] text-[#585D67] leading-relaxed mb-4 flex-1 line-clamp-3">
                  {service.description}
                </p>

                {/* Core Tech Stack Section */}
                <div className="mb-4">
                  <div className="font-mono text-[9px] font-bold text-[#8A8E96] uppercase tracking-wider mb-2.5">
                    Core Tech Stack
                  </div>
                  <div className="flex items-center gap-4">
                    {service.trustLogos.map(logo => (
                      <div key={logo.name} className="h-6 flex items-center justify-center transition-transform duration-300 hover:scale-110 drop-shadow-sm" title={logo.name}>
                        <img src={logo.url} alt={logo.name} className="h-full w-auto object-contain" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Minimal interaction hint */}
                <div className="mt-auto flex items-center justify-between border-t border-[#DCDDD6]/60 pt-3">
                  <div className="text-[11px] font-medium text-[#8A8E96] flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-500" />
                    {service.deliverables.length} features
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[#1F3D8C] group-hover:text-[#FF4B23] transition-colors">
                    View Details →
                  </span>
                </div>
              </div>
            </motion.div>
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
              className="bg-white border border-[#DCDDD6] w-full max-w-xl rounded-[1.5rem] p-6 sm:p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 bg-[#F5F6F1] border border-[#DCDDD6] rounded-full text-[#585D67] hover:bg-[#FF4B23] hover:text-white hover:border-[#FF4B23] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-50 text-[#1F3D8C] border border-blue-100 rounded-xl">
                  {selectedService.icon}
                </div>
                <div>
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
                  <div className="font-mono text-[10px] font-bold text-[#8A8E96] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <SquareArrowOutUpLeft className="w-3.5 h-3.5 text-[#1F3D8C]" />
                    TECH STACK
                  </div>
                  <ul className="space-y-2.5 font-body text-xs text-[#12151B]">
                    {selectedService.techSpecs.map((spec) => (
                      <li key={spec} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-emerald-600" />
                        </div>
                        <span className="font-medium text-[13px]">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="font-mono text-[10px] font-bold text-[#8A8E96] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#1F3D8C]" />
                    WHAT YOU GET
                  </div>
                  <ul className="space-y-2.5 font-body text-xs text-[#12151B]">
                    {selectedService.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                          <Check className="w-2.5 h-2.5 text-[#1F3D8C]" />
                        </div>
                        <span className="font-medium text-[13px]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between p-5 bg-[#EEF2FB] border border-blue-100 rounded-xl mt-2">
                <div className="font-mono text-[11px] mb-3 sm:mb-0">
                  <span className="text-[#8A8E96] uppercase font-bold tracking-wider">Estimated Timeline: </span>
                  <span className="font-bold text-[#1F3D8C]">{selectedService.timeline}</span>
                </div>
                <a
                  href={`https://wa.me/919026665814?text=Hi%20WebifyIt!%20I%20want%20to%20discuss%20${encodeURIComponent(selectedService.title)}.`}
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
