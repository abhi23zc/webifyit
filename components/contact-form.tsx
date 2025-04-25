
"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CalendarIcon, FileTextIcon, MessageSquareIcon, Sparkles } from "lucide-react";
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

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, type: "spring", stiffness: 80 }
  })
};

const gradientBorder =
  "bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 p-[2px] rounded-3xl";

export default function ContactPage() {
  const [isLoading, setisLoading] = useState(false);
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
      toast.error("Something error occurred");
    }
    setisLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white pt-10"
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="mb-12 text-center"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-blue-500 to-pink-400 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-2"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          >
            <Sparkles className="w-8 h-8 text-pink-400 animate-pulse" />
            Ready to Transform Your Digital Presence?
          </motion.h1>
          <motion.p
            className="text-lg text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Take the first step towards digital success. Fill out the form below and let's build something amazing together.
          </motion.p>
        </motion.div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <div className={gradientBorder}>
            <Card className="bg-[#181824] border-0 rounded-3xl shadow-2xl">
              <CardContent className="p-8">
                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mb-6 flex items-center justify-center gap-2 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-xl py-3 px-4"
                    >
                      <Sparkles className="w-6 h-6 text-green-400 animate-bounce" />
                      <span className="text-green-300 font-semibold">Thank you! We'll be in touch soon.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <motion.h2
                    className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 via-blue-500 to-pink-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Request a Free Estimate
                  </motion.h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        label: "First Name*",
                        id: "firstName",
                        name: "firstName",
                        value: formData.firstName,
                        required: true,
                        type: "text"
                      },
                      {
                        label: "Last Name*",
                        id: "lastName",
                        name: "lastName",
                        value: formData.lastName,
                        required: true,
                        type: "text"
                      }
                    ].map((field, i) => (
                      <motion.div
                        key={field.id}
                        className="space-y-2"
                        custom={i}
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                      >
                        <Label htmlFor={field.id}>{field.label}</Label>
                        <Input
                          id={field.id}
                          name={field.name}
                          value={field.value}
                          onChange={handleChange}
                          className="bg-[#23233a] border-0 focus:ring-2 focus:ring-blue-500/60 text-white transition-all duration-200"
                          required={field.required}
                          type={field.type}
                          autoComplete="off"
                        />
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      className="space-y-2"
                      custom={2}
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                    >
                      <Label htmlFor="email">Email*</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-[#23233a] border-0 focus:ring-2 focus:ring-pink-500/60 text-white transition-all duration-200"
                        required
                        autoComplete="off"
                      />
                    </motion.div>
                    <motion.div
                      className="space-y-2"
                      custom={3}
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                    >
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-[#23233a] border-0 focus:ring-2 focus:ring-purple-500/60 text-white transition-all duration-200"
                        autoComplete="off"
                      />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      className="space-y-2"
                      custom={4}
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                    >
                      <Label htmlFor="company">Company name</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="bg-[#23233a] border-0 focus:ring-2 focus:ring-blue-500/60 text-white transition-all duration-200"
                        autoComplete="off"
                      />
                    </motion.div>
                    <motion.div
                      className="space-y-2"
                      custom={5}
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                    >
                      <Label htmlFor="referralSource">How did you hear about us?*</Label>
                      <Input
                        id="referralSource"
                        name="referralSource"
                        value={formData.referralSource}
                        onChange={handleChange}
                        className="bg-[#23233a] border-0 focus:ring-2 focus:ring-pink-500/60 text-white transition-all duration-200"
                        required
                        autoComplete="off"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    className="space-y-2"
                    custom={6}
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                  >
                    <Label htmlFor="projectDetails">Tell us more about your project*</Label>
                    <Textarea
                      id="projectDetails"
                      name="projectDetails"
                      value={formData.projectDetails}
                      onChange={handleChange}
                      className="min-h-32 bg-[#23233a] border-0 focus:ring-2 focus:ring-blue-500/60 text-white transition-all duration-200"
                      required
                    />
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                      className="md:col-span-1 space-y-2"
                      custom={7}
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                    >
                      <Label>Do you need an NDA first?</Label>
                      <RadioGroup
                        defaultValue={formData.needNDA ? "yes" : "no"}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, needNDA: value === "yes" }))}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem id="yes" value="yes" />
                          <Label htmlFor="yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem id="no" value="no" />
                          <Label htmlFor="no">No</Label>
                        </div>
                      </RadioGroup>
                    </motion.div>

                    <motion.div
                      className="md:col-span-2"
                      custom={8}
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                    >
                      <Label className="mb-2 block">What can we help you with?</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          "Web Development",
                          "Mobile Development",
                          "UX / UI Design",
                          "AI Integration",
                          "Marketing",
                          "SEO",
                          "Other"
                        ].map((service, i) => (
                          <motion.div
                            key={service}
                            className="flex items-center space-x-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <Checkbox
                              id={service}
                              checked={formData.services.includes(service)}
                              onCheckedChange={() => handleCheckboxChange(service)}
                              className="accent-pink-500"
                            />
                            <Label htmlFor={service}>{service}</Label>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="pt-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button
                      type="submit"
                      className={`w-full py-6 font-bold text-lg rounded-2xl bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 shadow-lg transition-all duration-200 ${
                        isLoading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                      disabled={isLoading}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {!isLoading ? (
                          <motion.span
                            key="submit"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center justify-center gap-2"
                          >
                            <Sparkles className="w-5 h-5 animate-pulse" />
                            Request Free Estimate
                          </motion.span>
                        ) : (
                          <motion.span
                            key="loading"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center justify-center gap-2"
                          >
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                              />
                            </svg>
                            Processing...
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}