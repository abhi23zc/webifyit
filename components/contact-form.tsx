"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Check, Copy, MessageSquare, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

type ServiceType = string;

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  referralSource: string;
  projectDetails: string;
  needNDA: boolean;
  services: ServiceType[];
}

export default function ContactPage() {
  const [isLoading, setisLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    referralSource: "",
    projectDetails: "",
    needNDA: false,
    services: []
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (service: ServiceType) => {
    setFormData(prev => {
      const services = prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service];
      return { ...prev, services };
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("webifyit.in@gmail.com");
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const sendMail = async () => {
    const res = await fetch("/api/send-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    return data;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true);
    setSuccess(false);
    try {
      const data = await sendMail();
      setSuccess(true);
      toast.success(data.message || "Request sent!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        referralSource: "",
        projectDetails: "",
        needNDA: false,
        services: []
      });
    } catch (e) {
      toast.error("Something went wrong. Please try again.");
    }
    setisLoading(false);
  };

  const availableServices = [
    "Web Development",
    "Mobile Development",
    "UX / UI Design",
    "AI Integration",
    "Marketing",
    "SEO",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 pt-32 pb-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Context & Contact Details */}
          <div className="lg:col-span-5 space-y-10 flex flex-col justify-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium">
                <MessageSquare className="w-4 h-4" /> Let's Connect
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Let's build something <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">great</span> together.
              </h1>
              <p className="text-lg text-zinc-400 leading-relaxed">
                Have a project in mind? Looking to partner or just want to chat? Reach out to us and we'll get back to you within 24 hours.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-zinc-800/80">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-purple-400 group-hover:border-purple-500/30 transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-medium">Email Us</p>
                  <div className="flex items-center gap-2">
                    <a href="mailto:webifyit.in@gmail.com" className="text-zinc-200 hover:text-white font-medium transition-colors">
                      webifyit.in@gmail.com
                    </a>
                    <button 
                      onClick={copyEmail}
                      className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
                      title="Copy email"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-medium">Call Us</p>
                  <a href="tel:+916394575814" className="text-zinc-200 hover:text-white font-medium transition-colors">
                    +91 63945 75814
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-pink-400 group-hover:border-pink-500/30 transition-all duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-medium">Location</p>
                  <p className="text-zinc-200 font-medium">Kanpur, Uttar Pradesh &middot; India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form Card */}
          <div className="lg:col-span-7">
            <Card className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl shadow-xl backdrop-blur-md">
              <CardContent className="p-8 sm:p-10 space-y-6">
                
                <AnimatePresence mode="wait">
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl py-4 px-5 text-sm"
                    >
                      <Check className="w-5 h-5 shrink-0" />
                      <span>Thank you! We've received your inquiry and will respond shortly.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <h2 className="text-2xl font-semibold text-white">Request a Free Estimate</h2>
                  <p className="text-sm text-zinc-400 mt-1">Fill out the fields below and let's get started on your estimate.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* First & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-zinc-300 text-sm">First Name*</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="bg-zinc-950 border-zinc-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white rounded-lg h-11"
                        required
                        autoComplete="off"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-zinc-300 text-sm">Last Name*</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="bg-zinc-950 border-zinc-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white rounded-lg h-11"
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-zinc-300 text-sm">Email*</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-zinc-950 border-zinc-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white rounded-lg h-11"
                        required
                        autoComplete="off"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-zinc-300 text-sm">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-zinc-950 border-zinc-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white rounded-lg h-11"
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  {/* Company & Referral */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-zinc-300 text-sm">Company Name</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="bg-zinc-950 border-zinc-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white rounded-lg h-11"
                        autoComplete="off"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="referralSource" className="text-zinc-300 text-sm">How did you hear about us?*</Label>
                      <Input
                        id="referralSource"
                        name="referralSource"
                        value={formData.referralSource}
                        onChange={handleChange}
                        className="bg-zinc-950 border-zinc-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white rounded-lg h-11"
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-2">
                    <Label htmlFor="projectDetails" className="text-zinc-300 text-sm">Tell us more about your project*</Label>
                    <Textarea
                      id="projectDetails"
                      name="projectDetails"
                      value={formData.projectDetails}
                      onChange={handleChange}
                      placeholder="Describe what you want to build, timeline, or scope..."
                      className="min-h-[120px] bg-zinc-950 border-zinc-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white rounded-lg p-3 resize-y"
                      required
                    />
                  </div>

                  {/* NDA Request */}
                  <div className="space-y-3">
                    <Label className="text-zinc-300 text-sm flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-purple-400" /> Do you need an NDA first?
                    </Label>
                    <RadioGroup
                      defaultValue={formData.needNDA ? "yes" : "no"}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, needNDA: value === "yes" }))}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="yes" value="yes" className="border-zinc-800 text-purple-600 focus:ring-purple-500" />
                        <Label htmlFor="yes" className="text-zinc-300 cursor-pointer">Yes, please provide one</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="no" value="no" className="border-zinc-800 text-purple-600 focus:ring-purple-500" />
                        <Label htmlFor="no" className="text-zinc-300 cursor-pointer">No, not required</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Services Checkbox Grid */}
                  <div className="space-y-3">
                    <Label className="text-zinc-300 text-sm block">What can we help you with?</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {availableServices.map((service) => {
                        const isChecked = formData.services.includes(service);
                        return (
                          <div 
                            key={service}
                            onClick={() => handleCheckboxChange(service)}
                            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg border cursor-pointer select-none transition-all duration-200 ${
                              isChecked 
                                ? "bg-purple-600/10 border-purple-500/40 text-purple-400" 
                                : "bg-zinc-950 border-zinc-800/80 text-zinc-400 hover:border-zinc-700"
                            }`}
                          >
                            <Checkbox
                              id={service}
                              checked={isChecked}
                              onCheckedChange={() => {}} // handled by wrapper click
                              className="border-zinc-800 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                            />
                            <span className="text-sm font-medium">{service}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full h-12 font-medium text-base rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-lg transition-all duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          <span>Processing...</span>
                        </div>
                      ) : (
                        <span>Request Free Estimate</span>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}