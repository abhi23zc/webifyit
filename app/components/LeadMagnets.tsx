"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Send, Bot, HelpCircle, Calculator, CheckCircle2, ArrowRight, Sparkles, RefreshCw, BarChart2, ShieldCheck, PhoneCall } from "lucide-react";
import Card3D from "./Card3D";
import { saveNewLead } from "../lib/leadStore";

interface LeadMagnetsProps {
  onLeadCaptured: (name: string, auditFocus: string) => void;
}

export default function LeadMagnets({ onLeadCaptured }: LeadMagnetsProps) {
  const [activeTab, setActiveTab] = useState<"architect" | "quiz" | "calculator">("architect");

  // --- 1. AI BUSINESS ARCHITECT STATE ---
  const [userInput, setUserInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<{ proposal: string; stack: string[]; savings: string } | null>(null);
  const [architectPhone, setArchitectPhone] = useState("");
  const [architectCaptured, setArchitectCaptured] = useState(false);

  // Web Speech API Voice Recognition setup
  const toggleListening = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as unknown as Record<string, unknown>).SpeechRecognition || (window as unknown as Record<string, unknown>).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in your browser. Please type your business description below!");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const recognition = new (SpeechRecognition as any)();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "hi-IN"; // English or Hindi support

      recognition.onstart = () => setIsListening(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleRunArchitect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    setIsAnalyzing(true);
    setAiResult(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      const textLower = userInput.toLowerCase();

      if (textLower.includes("inventory") || textLower.includes("order") || textLower.includes("shop") || textLower.includes("pos") || textLower.includes("dukan") || textLower.includes("samajh")) {
        setAiResult({
          proposal: "We can engineer a custom Cloud POS & real-time inventory engine paired with an autonomous AI WhatsApp Agent for automated customer order tracking & support 24/7.",
          stack: ["Next.js 16 Web Dashboard", "PostgreSQL Inventory DB", "WhatsApp MsgZone API", "Voice AI Bot"],
          savings: "Reduces manual order entry overhead by 82% & cuts human error to 0%.",
        });
      } else if (textLower.includes("restaurant") || textLower.includes("khana") || textLower.includes("dine") || textLower.includes("hotel")) {
        setAiResult({
          proposal: "Deploy Dineezy QR digital menu dispatch with automated kitchen order management and instant WhatsApp bill delivery.",
          stack: ["Dineezy Engine", "Real-Time WebSocket Kitchen Display", "Razorpay Payment Gateway"],
          savings: "Accelerates table turnaround by 4.8x and boosts average order value by 24%.",
        });
      } else {
        setAiResult({
          proposal: "We can engineer a high-frequency bespoke web app integrated with a custom GPT-4o autonomous lead agent to capture, qualify, and convert incoming leads instantly.",
          stack: ["Next.js 16 Enterprise App", "Multilingual Voice/Text AI Agent", "MsgZone WhatsApp Drip"],
          savings: "Increases lead response speed from hours to <500ms, doubling appointment bookings.",
        });
      }
    }, 1200);
  };

  const handleCaptureArchitectLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!architectPhone.trim()) return;
    setArchitectCaptured(true);

    saveNewLead({
      name: "Architect Lead",
      contact: architectPhone,
      businessDescription: userInput,
      auditFocus: "AI Integration Feasibility",
      source: "AI Architect",
      taggedDomain: "AI Agent",
    });

    onLeadCaptured("Architect User", "AI Architect Blueprint");
  };

  // --- 2. BUSINESS BOTTLENECK QUIZ STATE ---
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizPhone, setQuizPhone] = useState("");
  const [quizCaptured, setQuizCaptured] = useState(false);

  const quizQuestions = [
    {
      q: "How many hours per day does your staff spend on manual data entry, order logging, or paperwork?",
      options: [
        { label: "< 1 hour", points: 1 },
        { label: "1 – 3 hours", points: 3 },
        { label: "3 – 5 hours", points: 5 },
        { label: "5+ hours daily", points: 8 },
      ],
    },
    {
      q: "How long does it take for your team to respond to a new customer inquiry or lead?",
      options: [
        { label: "Instant (< 5 minutes)", points: 1 },
        { label: "30 minutes – 2 hours", points: 3 },
        { label: "Same day (4 – 8 hours)", points: 5 },
        { label: "Next day or longer", points: 8 },
      ],
    },
    {
      q: "What is your primary software stack for daily business operations?",
      options: [
        { label: "Custom scalable web application", points: 1 },
        { label: "Basic Excel / WhatsApp groups", points: 7 },
        { label: "Generic off-the-shelf software with limitations", points: 5 },
        { label: "No unified software (mostly manual)", points: 9 },
      ],
    },
    {
      q: "Have you ever lost potential sales due to delayed response times or unorganized inventory/order records?",
      options: [
        { label: "Rarely / Never", points: 1 },
        { label: "Occasionally (5 – 10% lost)", points: 4 },
        { label: "Frequently (10 – 25% lost)", points: 7 },
        { label: "Major issue (>25% lost revenue)", points: 10 },
      ],
    },
  ];

  const handleAnswerQuiz = (points: number) => {
    const nextAnswers = [...quizAnswers, points];
    setQuizAnswers(nextAnswers);
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const getQuizAnalysis = () => {
    const total = quizAnswers.reduce((a, b) => a + b, 0);
    if (total <= 8) {
      return {
        level: "Low Friction (Optimized)",
        score: "85%",
        waste: "₹25,000 / yr",
        recommendation: "Deploy WebifyIt Bespoke Web Architecture to maintain sub-100ms speed & competitive advantage.",
      };
    } else if (total <= 18) {
      return {
        level: "Moderate Bottleneck",
        score: "58%",
        waste: "₹1,40,000 / yr",
        recommendation: "Deploy WebifyIt Autonomous AI WhatsApp Agent & Centralized SaaS Dashboard to eliminate manual delays.",
      };
    } else {
      return {
        level: "CRITICAL OPERATIONAL BOTTLENECK",
        score: "28%",
        waste: "₹3,80,000+ / yr",
        recommendation: "Urgent engineering upgrade required: Build Custom Cloud Operating System + Multilingual Voice AI Agent.",
      };
    }
  };

  const handleCaptureQuizLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizPhone.trim()) return;
    setQuizCaptured(true);

    const report = getQuizAnalysis();
    saveNewLead({
      name: "Quiz Lead",
      contact: quizPhone,
      businessDescription: `Quiz Bottleneck Score: ${report.score} - ${report.level}`,
      auditFocus: "Custom SaaS Architecture",
      source: "Bottleneck Quiz",
      taggedDomain: "Custom SaaS",
    });

    onLeadCaptured("Quiz Participant", "Business Bottleneck Quiz");
  };

  // --- 3. OPERATIONAL SAVINGS CALCULATOR STATE ---
  const [dailyInquiries, setDailyInquiries] = useState<number>(80);
  const [staffCount, setStaffCount] = useState<number>(3);
  const [hourlyWage, setHourlyWage] = useState<number>(250); // INR per hr

  const manualMonthlyCost = Math.round(staffCount * 8 * 26 * hourlyWage);
  const webifyItAiCost = Math.round(manualMonthlyCost * 0.15); // 85% savings
  const monthlySavings = manualMonthlyCost - webifyItAiCost;
  const yearlySavings = monthlySavings * 12;

  const [calcPhone, setCalcPhone] = useState("");
  const [calcCaptured, setCalcCaptured] = useState(false);

  const handleCaptureCalcLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!calcPhone.trim()) return;
    setCalcCaptured(true);

    saveNewLead({
      name: "Calculator Lead",
      contact: calcPhone,
      businessDescription: `Operational Savings Calc: Saving ₹${monthlySavings.toLocaleString("en-IN")}/mo`,
      auditFocus: "AI Integration Feasibility",
      source: "Savings Calculator",
      taggedDomain: "AI Agent",
    });

    onLeadCaptured("Calculator User", "Savings Calculator Blueprint");
  };

  return (
    <section id="lead-magnets" className="py-20 bg-[#F5F6F1] border-b border-[#DCDDD6]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-[#FF4B23] tracking-widest uppercase">
              FIG. 04 — INTERACTIVE LEAD MAGNETS
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#12151B] tracking-tight">
            Interactive engineering tools for founders
          </h2>
          <p className="font-body text-base text-[#585D67] mt-3">
            Test our live AI architect, diagnose operational bottlenecks, or calculate your exact cost savings with our intelligent interactive tools.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-3 border-b border-[#DCDDD6] pb-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("architect")}
            className={`font-mono text-xs px-4 py-2.5 rounded-xs border font-semibold flex items-center gap-2 transition-all shrink-0 ${activeTab === "architect"
                ? "bg-[#1F3D8C] text-white border-[#1F3D8C] shadow-2xs"
                : "bg-white text-[#585D67] border-[#C7C9C0] hover:border-[#12151B]"
              }`}
          >
            <Bot className="w-4 h-4 text-[#FF4B23]" />
            1. AI Business Architect (Chat/Voice)
          </button>

          <button
            onClick={() => setActiveTab("quiz")}
            className={`font-mono text-xs px-4 py-2.5 rounded-xs border font-semibold flex items-center gap-2 transition-all shrink-0 ${activeTab === "quiz"
                ? "bg-[#1F3D8C] text-white border-[#1F3D8C] shadow-2xs"
                : "bg-white text-[#585D67] border-[#C7C9C0] hover:border-[#12151B]"
              }`}
          >
            <HelpCircle className="w-4 h-4 text-[#FF4B23]" />
            2. Business Bottleneck Diagnostic
          </button>

          <button
            onClick={() => setActiveTab("calculator")}
            className={`font-mono text-xs px-4 py-2.5 rounded-xs border font-semibold flex items-center gap-2 transition-all shrink-0 ${activeTab === "calculator"
                ? "bg-[#1F3D8C] text-white border-[#1F3D8C] shadow-2xs"
                : "bg-white text-[#585D67] border-[#C7C9C0] hover:border-[#12151B]"
              }`}
          >
            <Calculator className="w-4 h-4 text-[#FF4B23]" />
            3. Operational Savings Calculator
          </button>
        </div>

        {/* --- TAB CONTENT 1: AI BUSINESS ARCHITECT --- */}
        {activeTab === "architect" && (
          <Card3D intensity={5}>
            <div className="xmark bg-white border border-[#C7C9C0] p-6 sm:p-8 rounded-xs shadow-3d">
              <div className="flex items-center justify-between pb-4 border-b border-[#DCDDD6] mb-6">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF4B23] animate-ping" />
                  <span className="font-bold text-[#12151B] uppercase tracking-wider">
                    WEBIFYIT AI BUSINESS ADVISOR (Chat/Voice)
                  </span>
                </div>
                <span className="tag-pill tag-pill-accent text-[10px]">
                  EN / HI VOICE SUPPORTED
                </span>
              </div>

              <p className="font-body text-sm text-[#585D67] mb-6">
                Describe your business problem or operational goals in <strong>English</strong> or <strong>Hindi</strong>. Click the microphone to speak or type directly below.
              </p>

              <form onSubmit={handleRunArchitect} className="space-y-4">
                <div className="relative">
                  <textarea
                    rows={3}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder='e.g., "Mera business hai, mujhe inventory aur orders track karne hain aur customer support automate karna hai."'
                    className="w-full bg-[#F5F6F1] border border-[#C7C9C0] p-4 pr-14 rounded-xs font-body text-sm text-[#12151B] focus:border-[#FF4B23] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`absolute right-3 top-3 p-3 rounded-xs transition-colors ${isListening
                        ? "bg-red-500 text-white animate-pulse"
                        : "bg-[#1F3D8C] text-white hover:bg-[#FF4B23]"
                      }`}
                    title={isListening ? "Listening..." : "Click to speak in Hindi/English"}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-[#8A8E96] flex items-center gap-2">
                    {isListening && (
                      <span className="text-[#FF4B23] font-bold animate-pulse">
                        Listening to audio dictation... Speak now!
                      </span>
                    )}
                    {!isListening && (
                      <span>Sample input preset: &quot;Wholesale Kanpur textile business needing AI orders&quot;</span>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isAnalyzing || !userInput.trim()}
                    className="btn-primary text-xs py-3 px-6 shadow-3d-accent disabled:opacity-50 flex items-center gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Thinking...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Get My Plan</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* AI Architecture Output Result */}
              {aiResult && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 pt-6 border-t-2 border-[#12151B] bg-[#EEF2FB]/80 p-6 rounded-xs border"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#1F3D8C] uppercase tracking-wider flex items-center gap-1.5">
                      <Bot className="w-4 h-4 text-[#FF4B23]" />
                      YOUR SUGGESTED SOLUTION
                    </span>
                    <span className="tag-pill tag-pill-blue text-[10px] font-bold">100% FEASIBLE</span>
                  </div>

                  <p className="font-body text-base font-semibold text-[#12151B] mb-4 leading-relaxed">
                    {aiResult.proposal}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-3.5 rounded-xs border border-[#DCDDD6]">
                      <div className="font-mono text-[11px] text-[#8A8E96] font-bold mb-2">TOOLS WE RECOMMEND:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {aiResult.stack.map((s) => (
                          <span key={s} className="tag-pill text-[10px] bg-[#F5F6F1]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-3.5 rounded-xs border border-[#DCDDD6]">
                      <div className="font-mono text-[11px] text-[#8A8E96] font-bold mb-2">WHAT THIS WILL DO FOR YOU:</div>
                      <div className="font-body text-xs text-[#12151B] font-medium flex items-start gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{aiResult.savings}</span>
                      </div>
                    </div>
                  </div>

                  {/* Lead Capture Step */}
                  {!architectCaptured ? (
                    <form onSubmit={handleCaptureArchitectLead} className="bg-[#12151B] text-white p-4 rounded-xs space-y-3">
                      <div className="font-mono text-xs text-[#25D366] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <PhoneCall className="w-4 h-4 text-[#25D366]" />
                        GET YOUR FREE DETAILED PLAN ON WHATSAPP
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="tel"
                          required
                          placeholder="Enter your WhatsApp number (+91...)"
                          value={architectPhone}
                          onChange={(e) => setArchitectPhone(e.target.value)}
                          className="flex-1 bg-[#202C33] border border-white/20 p-2.5 rounded-xs font-mono text-xs text-white focus:outline-none focus:border-[#25D366]"
                        />
                        <button
                          type="submit"
                          className="btn-primary py-2.5 px-5 text-xs font-semibold shadow-3d-accent shrink-0"
                        >
                          <span>Send Plan via WhatsApp</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xs font-mono text-xs text-emerald-800 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>Roadmap sent! Check your WhatsApp for instant MsgZone dispatch.</span>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </Card3D>
        )}

        {/* --- TAB CONTENT 2: BUSINESS BOTTLENECK QUIZ --- */}
        {activeTab === "quiz" && (
          <Card3D intensity={5}>
            <div className="xmark bg-white border border-[#C7C9C0] p-6 sm:p-8 rounded-xs shadow-3d">
              {!quizFinished ? (
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#DCDDD6] mb-6">
                    <div className="font-mono text-xs font-bold text-[#FF4B23] uppercase tracking-wider">
                      QUESTION {quizStep + 1} OF {quizQuestions.length}
                    </div>
                    <div className="w-36 bg-[#F5F6F1] h-2 rounded-full overflow-hidden border border-[#DCDDD6]">
                      <div
                        className="bg-[#FF4B23] h-full transition-all duration-300"
                        style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#12151B] mb-6 leading-snug">
                    {quizQuestions[quizStep].q}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {quizQuestions[quizStep].options.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => handleAnswerQuiz(opt.points)}
                        className="p-4 text-left border border-[#C7C9C0] rounded-xs font-body text-sm font-semibold text-[#12151B] hover:border-[#1F3D8C] hover:bg-[#EEF2FB] transition-all flex items-center justify-between group"
                      >
                        <span>{opt.label}</span>
                        <ArrowRight className="w-4 h-4 text-[#8A8E96] group-hover:text-[#1F3D8C] group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {(() => {
                    const analysis = getQuizAnalysis();
                    return (
                      <div className="space-y-6">
                        <div className="p-4 bg-[#EEF2FB] border border-[#1F3D8C]/20 rounded-xs flex items-center justify-between">
                          <div>
                            <div className="font-mono text-xs text-[#8A8E96] font-bold">HOW EFFICIENTLY IS YOUR BUSINESS RUNNING?</div>
                            <div className="font-display text-3xl font-extrabold text-[#1F3D8C]">{analysis.score}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono text-xs text-[#FF4B23] font-bold uppercase">{analysis.level}</div>
                            <div className="font-mono text-xs text-[#585D67]">Est. Revenue Lost: <span className="font-bold text-[#12151B]">{analysis.waste}</span></div>
                          </div>
                        </div>

                        <div className="bg-[#F5F6F1] p-5 rounded-xs border border-[#DCDDD6] space-y-3">
                          <div className="font-mono text-xs font-bold text-[#12151B] uppercase">OUR RECOMMENDED SOLUTION:</div>
                          <p className="font-body text-sm text-[#585D67] leading-relaxed">
                            {analysis.recommendation}
                          </p>
                        </div>

                        {!quizCaptured ? (
                          <form onSubmit={handleCaptureQuizLead} className="bg-[#12151B] text-white p-5 rounded-xs space-y-3">
                            <div className="font-mono text-xs text-[#25D366] font-bold uppercase tracking-wider">
                              GET YOUR FREE BUSINESS REPORT ON WHATSAPP
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                              <input
                                type="tel"
                                required
                                placeholder="Enter your WhatsApp number (+91...)"
                                value={quizPhone}
                                onChange={(e) => setQuizPhone(e.target.value)}
                                className="flex-1 bg-[#202C33] border border-white/20 p-2.5 rounded-xs font-mono text-xs text-white focus:outline-none focus:border-[#25D366]"
                              />
                              <button
                                type="submit"
                                className="btn-primary py-2.5 px-5 text-xs font-semibold shadow-3d-accent"
                              >
                                Request Bottleneck Report
                              </button>
                            </div>
                          </form>
                        ) : (
                          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xs font-mono text-xs text-emerald-800 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                            <span>Bottleneck Report requested! Sent to your WhatsApp.</span>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </div>
          </Card3D>
        )}

        {/* --- TAB CONTENT 3: OPERATIONAL SAVINGS CALCULATOR --- */}
        {activeTab === "calculator" && (
          <Card3D intensity={5}>
            <div className="xmark bg-white border border-[#C7C9C0] p-6 sm:p-8 rounded-xs shadow-3d">
              <div className="flex items-center justify-between pb-4 border-b border-[#DCDDD6] mb-6">
                <div className="font-mono text-xs font-bold text-[#1F3D8C] uppercase tracking-wider flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#FF4B23]" />
                  SEE HOW MUCH YOU CAN SAVE WITH AI
                </div>
                <span className="tag-pill tag-pill-blue text-[10px] font-bold">REAL-TIME MATH</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Inputs */}
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <div className="flex justify-between font-mono text-xs text-[#12151B] mb-2 font-bold">
                      <span>Daily Customer Inquiries / Leads:</span>
                      <span className="text-[#FF4B23]">{dailyInquiries} / day</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={500}
                      step={10}
                      value={dailyInquiries}
                      onChange={(e) => setDailyInquiries(Number(e.target.value))}
                      className="w-full accent-[#FF4B23] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-mono text-xs text-[#12151B] mb-2 font-bold">
                      <span>Support & Operations Staff Count:</span>
                      <span className="text-[#1F3D8C]">{staffCount} Persons</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={15}
                      step={1}
                      value={staffCount}
                      onChange={(e) => setStaffCount(Number(e.target.value))}
                      className="w-full accent-[#1F3D8C] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-mono text-xs text-[#12151B] mb-2 font-bold">
                      <span>Average Hourly Operational Wage:</span>
                      <span className="text-[#12151B]">₹{hourlyWage} / hr</span>
                    </div>
                    <input
                      type="range"
                      min={100}
                      max={1000}
                      step={50}
                      value={hourlyWage}
                      onChange={(e) => setHourlyWage(Number(e.target.value))}
                      className="w-full accent-[#12151B] cursor-pointer"
                    />
                  </div>
                </div>

                {/* Graph Visualizer */}
                <div className="lg:col-span-6 bg-[#F5F6F1] p-6 rounded-xs border border-[#DCDDD6] space-y-4">
                  <div className="font-mono text-xs font-bold text-[#8A8E96] uppercase">MONTHLY COST COMPARISON</div>

                  {/* Manual Bar */}
                  <div>
                    <div className="flex justify-between font-mono text-xs mb-1">
                      <span className="text-[#585D67]">Manual Operations Cost</span>
                      <span className="font-bold text-red-600">₹{manualMonthlyCost.toLocaleString("en-IN")} / mo</span>
                    </div>
                    <div className="w-full bg-white h-4 rounded-xs overflow-hidden border border-[#DCDDD6]">
                      <div className="bg-red-500 h-full transition-all duration-300 w-full" />
                    </div>
                  </div>

                  {/* AI Agent Bar */}
                  <div>
                    <div className="flex justify-between font-mono text-xs mb-1">
                      <span className="text-[#585D67]">WebifyIt AI Agent System Cost</span>
                      <span className="font-bold text-emerald-600">₹{webifyItAiCost.toLocaleString("en-IN")} / mo</span>
                    </div>
                    <div className="w-full bg-white h-4 rounded-xs overflow-hidden border border-[#DCDDD6]">
                      <div className="bg-emerald-500 h-full transition-all duration-300 w-[15%]" />
                    </div>
                  </div>

                  {/* Net Savings Box */}
                  <div className="bg-white p-4 rounded-xs border border-emerald-300 text-center space-y-1">
                    <div className="font-mono text-[10px] font-bold text-emerald-600 uppercase">NET MONTHLY SAVINGS</div>
                    <div className="font-display text-2xl font-extrabold text-[#12151B]">
                      ₹{monthlySavings.toLocaleString("en-IN")} <span className="text-xs font-normal text-[#585D67]">/ month</span>
                    </div>
                    <div className="font-mono text-xs text-[#8A8E96]">
                      Annual Savings: <strong className="text-emerald-700">₹{yearlySavings.toLocaleString("en-IN")}</strong> (85% Cost Reduction)
                    </div>
                  </div>

                  {!calcCaptured ? (
                    <form onSubmit={handleCaptureCalcLead} className="pt-2 flex flex-col sm:flex-row gap-2">
                      <input
                        type="tel"
                        required
                        placeholder="WhatsApp number to receive ROI breakdown..."
                        value={calcPhone}
                        onChange={(e) => setCalcPhone(e.target.value)}
                        className="flex-1 bg-white border border-[#C7C9C0] p-2 rounded-xs font-mono text-xs text-[#12151B] focus:outline-none focus:border-[#FF4B23]"
                      />
                      <button
                        type="submit"
                        className="btn-primary py-2 px-4 text-xs font-semibold shrink-0 shadow-3d-accent"
                      >
                        Send ROI Report
                      </button>
                    </form>
                  ) : (
                    <div className="p-2.5 bg-emerald-50 text-emerald-800 font-mono text-xs rounded-xs text-center font-bold">
                      ✓ ROI Savings Report sent to your WhatsApp!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card3D>
        )}
      </div>
    </section>
  );
}
