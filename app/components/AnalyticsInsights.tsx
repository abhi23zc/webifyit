"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointerClick, Target, Users, Gauge, Calculator, ArrowRight, TrendingUp } from "lucide-react";
import Card3D from "./Card3D";

export default function AnalyticsInsights() {
  const [hoveredMonth, setHoveredMonth] = useState<number>(11); // Dec default
  const [activeMetric, setActiveMetric] = useState<"visitors" | "conv">("visitors");

  // ROI Calculator Interactive State
  const [monthlyVisitors, setMonthlyVisitors] = useState<number>(10000);
  const [currentConvRate, setCurrentConvRate] = useState<number>(2.0);

  const estimatedLeadsNow = Math.round((monthlyVisitors * currentConvRate) / 100);
  const projectedConvRate = 5.2; // WebifyIt average optimized funnel rate
  const estimatedLeadsOptimized = Math.round((monthlyVisitors * projectedConvRate) / 100);
  const leadDifference = estimatedLeadsOptimized - estimatedLeadsNow;

  const monthsData = [
    { month: "Jan", visitors: 4200, conv: 1100 },
    { month: "Feb", visitors: 5100, conv: 1400 },
    { month: "Mar", visitors: 5800, conv: 1650 },
    { month: "Apr", visitors: 6400, conv: 1900 },
    { month: "May", visitors: 7200, conv: 2100 },
    { month: "Jun", visitors: 8100, conv: 2450 },
    { month: "Jul", visitors: 8900, conv: 2700 },
    { month: "Aug", visitors: 9600, conv: 2950 },
    { month: "Sep", visitors: 10400, conv: 3200 },
    { month: "Oct", visitors: 11100, conv: 3450 },
    { month: "Nov", visitors: 11800, conv: 3620 },
    { month: "Dec", visitors: 14890, conv: 4210 },
  ];

  const features = [
    {
      title: "Behavioral Heatmap Telemetry",
      description: "Track precise user intent, cursor movement, scroll depth, and interaction friction in real time.",
      icon: <MousePointerClick className="w-5 h-5 text-[#1F3D8C]" />,
    },
    {
      title: "Funnel Event Conversion Engine",
      description: "Monitor multi-step funnel drop-offs, entry attribution, and instant conversion triggers.",
      icon: <Target className="w-5 h-5 text-[#FF4B23]" />,
    },
    {
      title: "Cohort Audience Segmentation",
      description: "Segment visitors by device capability, geographic origin, campaign channel, and intent profile.",
      icon: <Users className="w-5 h-5 text-[#1F3D8C]" />,
    },
    {
      title: "Real-Time Core Web Vitals Monitor",
      description: "Continuous server monitoring ensuring sub-100ms TTFB, 0ms Cumulative Layout Shift, and 99.99% uptime.",
      icon: <Gauge className="w-5 h-5 text-[#12151B]" />,
    },
  ];

  const currentData = monthsData[hoveredMonth];

  return (
    <section id="insights" className="py-20 bg-[#F5F6F1] border-b border-[#DCDDD6]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-[#FF4B23] tracking-widest uppercase">
              FIG. 05 — TELEMETRY & ROI IMPACT
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#12151B] tracking-tight">
            Data-driven conversion optimization
          </h2>
          <p className="font-body text-base text-[#585D67] mt-3">
            Every digital platform we build includes built-in telemetry tools to measure user behavior, eliminate conversion drop-offs, and maximize revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Feature Callout Cards with 3D Tilt */}
          <div className="lg:col-span-5 space-y-4">
            {features.map((feat, idx) => (
              <Card3D key={feat.title} intensity={8}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="xmark bg-white border border-[#C7C9C0] p-5 rounded-xs hover:border-[#1F3D8C] transition-all duration-200 flex items-start gap-4 hover:shadow-md"
                >
                  <div className="p-2.5 bg-[#EEF2FB] border border-[#1F3D8C]/20 rounded-xs shrink-0 translate-z-10">
                    {feat.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-[#12151B] translate-z-20">
                      {feat.title}
                    </h3>
                    <p className="font-body text-xs text-[#585D67] leading-relaxed mt-1 translate-z-10">
                      {feat.description}
                    </p>
                  </div>
                </motion.div>
              </Card3D>
            ))}
          </div>

          {/* Right Column: Interactive 3D Volumetric Analytics Dashboard & ROI Tool */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 3D Dashboard Panel */}
            <Card3D intensity={10} className="shadow-3d">
              <div className="bg-white border border-[#C7C9C0] p-6 sm:p-8 rounded-xs xmark">
                
                {/* Widget Top Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#DCDDD6] mb-6 gap-3 translate-z-10">
                  <div>
                    <span className="font-mono text-[10px] text-[#8A8E96] font-bold uppercase tracking-wider">
                      TELEMETRY ENGINE V5.0
                    </span>
                    <h3 className="font-display text-xl font-bold text-[#12151B]">
                      Volumetric Traffic & Pipeline Growth
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveMetric("visitors")}
                      className={`tag-pill transition-all ${activeMetric === "visitors" ? "tag-pill-blue font-bold shadow-xs" : ""}`}
                    >
                      VISITORS
                    </button>
                    <button
                      onClick={() => setActiveMetric("conv")}
                      className={`tag-pill transition-all ${activeMetric === "conv" ? "tag-pill-accent font-bold shadow-xs" : ""}`}
                    >
                      CONVERSIONS
                    </button>
                  </div>
                </div>

                {/* 4 Metric Tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 translate-z-20">
                  <div
                    onClick={() => setActiveMetric("visitors")}
                    className={`p-3 rounded-xs border cursor-pointer transition-all ${
                      activeMetric === "visitors"
                        ? "bg-[#EEF2FB] border-[#1F3D8C]"
                        : "bg-[#F5F6F1] border-[#DCDDD6] hover:border-[#12151B]"
                    }`}
                  >
                    <div className="font-mono text-[10px] text-[#8A8E96] uppercase font-bold">Visitors</div>
                    <div className="font-display font-bold text-lg text-[#12151B]">
                      {currentData.visitors.toLocaleString()}
                    </div>
                    <div className="font-mono text-[10px] text-emerald-600 font-bold">+32.4% MoM</div>
                  </div>

                  <div
                    onClick={() => setActiveMetric("conv")}
                    className={`p-3 rounded-xs border cursor-pointer transition-all ${
                      activeMetric === "conv"
                        ? "bg-[#FF4B23]/10 border-[#FF4B23]"
                        : "bg-[#F5F6F1] border-[#DCDDD6] hover:border-[#12151B]"
                    }`}
                  >
                    <div className="font-mono text-[10px] text-[#8A8E96] uppercase font-bold">Conversions</div>
                    <div className="font-display font-bold text-lg text-[#1F3D8C]">
                      {currentData.conv.toLocaleString()}
                    </div>
                    <div className="font-mono text-[10px] text-emerald-600 font-bold">+28.1% MoM</div>
                  </div>

                  <div className="bg-[#F5F6F1] border border-[#DCDDD6] p-3 rounded-xs">
                    <div className="font-mono text-[10px] text-[#8A8E96] uppercase font-bold">Avg Session</div>
                    <div className="font-display font-bold text-lg text-[#12151B]">3m 54s</div>
                    <div className="font-mono text-[10px] text-emerald-600 font-bold">+1m 12s</div>
                  </div>

                  <div className="bg-[#F5F6F1] border border-[#DCDDD6] p-3 rounded-xs">
                    <div className="font-mono text-[10px] text-[#8A8E96] uppercase font-bold">Bounce Rate</div>
                    <div className="font-display font-bold text-lg text-[#FF4B23]">24.1%</div>
                    <div className="font-mono text-[10px] text-emerald-600 font-bold">-8.2% drop</div>
                  </div>
                </div>

                {/* Volumetric 3D Interactive SVG Bar Chart */}
                <div className="bg-[#F5F6F1] p-4 border border-[#DCDDD6] rounded-xs relative translate-z-30">
                  <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#585D67]">
                    <span>MONTHLY TREND ({currentData.month})</span>
                    <span className="font-bold text-[#1F3D8C]">
                      {activeMetric === "visitors"
                        ? `${currentData.visitors.toLocaleString()} Active Visitors`
                        : `${currentData.conv.toLocaleString()} Qualified Leads`}
                    </span>
                  </div>

                  {/* Bar Chart Visual with Volumetric Height */}
                  <div className="h-44 flex items-end justify-between gap-1 sm:gap-2 pt-4 pb-2 px-1">
                    {monthsData.map((item, idx) => {
                      const val = activeMetric === "visitors" ? item.visitors : item.conv;
                      const maxVal = activeMetric === "visitors" ? 16000 : 4500;
                      const heightPercent = Math.round((val / maxVal) * 100);
                      const isSelected = hoveredMonth === idx;
                      return (
                        <div
                          key={item.month}
                          onMouseEnter={() => setHoveredMonth(idx)}
                          className="flex-1 flex flex-col items-center gap-1 cursor-pointer group h-full justify-end"
                        >
                          <div className="w-full bg-[#EBF0FF] group-hover:bg-[#1F3D8C]/20 rounded-xs h-full flex items-end p-0.5 transition-colors">
                            <motion.div
                              layout
                              style={{ height: `${heightPercent}%` }}
                              className={`w-full rounded-2xs transition-all duration-300 ${
                                isSelected
                                  ? activeMetric === "visitors"
                                    ? "bg-[#1F3D8C] shadow-3d-blue"
                                    : "bg-[#FF4B23] shadow-3d-accent"
                                  : "bg-[#8A8E96]/40 group-hover:bg-[#1F3D8C]"
                              }`}
                            />
                          </div>
                          <span
                            className={`font-mono text-[10px] ${
                              isSelected ? "font-bold text-[#FF4B23]" : "text-[#8A8E96]"
                            }`}
                          >
                            {item.month}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-[#8A8E96] pt-2 border-t border-[#DCDDD6]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-[#1F3D8C] rounded-2xs"></span> Visitors
                      <span className="w-2.5 h-2.5 bg-[#FF4B23] rounded-2xs ml-2"></span> Conversions
                    </div>
                    <span>Hover bars to inspect month data</span>
                  </div>
                </div>

              </div>
            </Card3D>

            {/* Interactive Live ROI Projection Calculator Widget */}
            <Card3D intensity={8}>
              <div className="bg-white border border-[#C7C9C0] p-6 rounded-xs shadow-sm xmark">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#DCDDD6]">
                  <Calculator className="w-5 h-5 text-[#FF4B23]" />
                  <h4 className="font-display text-lg font-bold text-[#12151B]">
                    Interactive Funnel ROI Calculator
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  {/* Slider 1: Monthly Traffic */}
                  <div>
                    <div className="flex justify-between font-mono text-xs mb-2">
                      <span className="text-[#585D67]">Est. Monthly Visitors:</span>
                      <span className="font-bold text-[#12151B]">{monthlyVisitors.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="100000"
                      step="1000"
                      value={monthlyVisitors}
                      onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                      className="w-full accent-[#1F3D8C] cursor-pointer"
                    />
                  </div>

                  {/* Slider 2: Current Conv Rate */}
                  <div>
                    <div className="flex justify-between font-mono text-xs mb-2">
                      <span className="text-[#585D67]">Current Conv. Rate:</span>
                      <span className="font-bold text-[#12151B]">{currentConvRate.toFixed(1)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="5.0"
                      step="0.1"
                      value={currentConvRate}
                      onChange={(e) => setCurrentConvRate(Number(e.target.value))}
                      className="w-full accent-[#FF4B23] cursor-pointer"
                    />
                  </div>
                </div>

                {/* Calculation Output Box */}
                <div className="bg-[#EEF2FB] border border-[#1F3D8C]/20 p-4 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="font-mono text-xs text-[#585D67]">PROJECTED MONTHLY LEADS:</div>
                    <div className="font-display font-bold text-2xl text-[#1F3D8C] flex items-center gap-2">
                      <span>{estimatedLeadsOptimized} Leads / Mo</span>
                      <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-2xs font-semibold flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        +{leadDifference} Additional
                      </span>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/916394575814?text=Hi%20WebifyIt!%20My%20website%20gets%20${monthlyVisitors}%20visitors%20and%20I%20want%20to%20reach%20${estimatedLeadsOptimized}%20monthly%20leads.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs py-2.5 px-4 flex items-center gap-1.5 shrink-0 shadow-3d-accent"
                  >
                    <span>Claim Your ROI Plan</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </Card3D>

          </div>

        </div>

      </div>
    </section>
  );
}
