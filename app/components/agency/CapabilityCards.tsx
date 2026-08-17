"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Smartphone, Cpu, CloudCog } from "lucide-react";

export default function CapabilityCards() {
  const capabilities = [
    {
      title: "Enterprise Web Apps & SaaS",
      desc: "Complex, scalable web applications with advanced dashboards, multi-tenant architectures, and complex data models.",
      tech: "Next.js, React, Node.js, PostgreSQL",
      icon: <Code2 className="w-6 h-6 text-[#1F3D8C]" />
    },
    {
      title: "Native & Cross-Platform Mobile",
      desc: "High-performance iOS and Android applications with offline support, complex state, and custom UI.",
      tech: "React Native, Swift, Kotlin",
      icon: <Smartphone className="w-6 h-6 text-[#1F3D8C]" />
    },
    {
      title: "AI Automation & Agents",
      desc: "LLM integration, autonomous agents, RAG systems, and AI-powered data processing pipelines.",
      tech: "OpenAI, Pinecone, LangChain, Python",
      icon: <Cpu className="w-6 h-6 text-[#1F3D8C]" />
    },
    {
      title: "Backend & Cloud Architecture",
      desc: "Secure, high-availability APIs, microservices, and serverless architectures engineered for scale.",
      tech: "AWS, Vercel, Docker, GraphQL",
      icon: <CloudCog className="w-6 h-6 text-[#1F3D8C]" />
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-[#DCDDD6]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#12151B] tracking-tight">
            Our technical capabilities
          </h2>
          <p className="font-body text-base text-[#585D67] mt-3">
            We don't do marketing. We just write production-grade code. Here is what you can confidently sell to your clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group border border-[#DCDDD6] rounded-xl p-6 sm:p-8 hover:border-[#1F3D8C] hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-[#F5F6F1] flex items-center justify-center mb-6 group-hover:bg-[#E8EBF2] transition-colors">
                {cap.icon}
              </div>
              <h3 className="font-display font-bold text-xl text-[#12151B] mb-3">
                {cap.title}
              </h3>
              <p className="font-body text-sm text-[#585D67] leading-relaxed mb-6">
                {cap.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {cap.tech.split(", ").map((t, i) => (
                  <span key={i} className="font-mono text-[10px] bg-[#F5F6F1] text-[#12151B] px-2 py-1 rounded-sm border border-[#C7C9C0]">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
