// Contact.tsx
"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CalendarIcon, FileTextIcon, MessageSquareIcon } from "lucide-react";
import { Alert } from "./ui/alert";
import toast from "react-hot-toast";

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
  const [isLoading, setisLoading] = useState(false)
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
    alert(data.message);
  };
  
  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true)
    try{
      
      await sendMail()
    }catch(e){
      alert("Something error occured")
    }
    setisLoading(false)

    // console.log("Form submitted:", formData);

    
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen bg-black text-white mt-10">
      <div className="max-w-6xl mx-auto px-4 py-12">
{/*         
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-pink-400 bg-clip-text text-transparent mb-4">
            Ready to Transform Your Digital Presence?
          </h1>
          <p className="text-lg text-gray-300">
            Take the first step towards digital success. Choose the option that works best for you.
          </p>
          <Button variant="outline" className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
            Get Started
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-gray-900 border-gray-800 overflow-hidden">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <CalendarIcon className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Book a Strategy Call</h3>
              <p className="text-gray-400 mb-6">
                Schedule a 15-minute call with our experts to discuss your project and goals.
              </p>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
                Book Your Call →
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 overflow-hidden">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                <FileTextIcon className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Get a Free Audit</h3>
              <p className="text-gray-400 mb-6">
                Receive a comprehensive audit of your current website with actionable insights.
              </p>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0">
                Request Audit →
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 overflow-hidden">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-4">
                <MessageSquareIcon className="h-6 w-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Start a Conversation</h3>
              <p className="text-gray-400 mb-6">
                Have questions? Send us a message and we'll get back to you within 24 hours.
              </p>
              <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0">
                Contact Us →
              </Button>
            </CardContent>
          </Card>
        </div> */}

        <div className="mb-16">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <h2 className="text-2xl font-bold text-center mb-6">Request a Free Estimate</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name*</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name*</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email*</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company name</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="referralSource">How did you hear about us?*</Label>
                    <Input
                      id="referralSource"
                      name="referralSource"
                      value={formData.referralSource}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectDetails">Tell us more about your project*</Label>
                  <Textarea
                    id="projectDetails"
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleChange}
                    className="min-h-32 bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 space-y-2">
                    <Label>Do you need an NDA first?</Label>
                    <RadioGroup
                      defaultValue="no"
                      onValueChange={(value) => setFormData(prev => ({ ...prev, needNDA: value === "yes" }))}
                    >
                      <div className="flex space-x-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem id="yes" value="yes" />
                          <Label htmlFor="yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem id="no" value="no" />
                          <Label htmlFor="no">No</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="md:col-span-2">
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
                      ].map((service) => (
                        <div key={service} className="flex items-center space-x-2">
                          <Checkbox
                            id={service}
                            checked={formData.services.includes(service)}
                            onCheckedChange={() => handleCheckboxChange(service)}
                          />
                          <Label htmlFor={service}>{service}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* <div className="flex items-center space-x-2">
                  <Checkbox id="marketing" />
                  <Label htmlFor="marketing">I agree to receive marketing communication from us.</Label>
                </div> */}

                {
                  !isLoading ?

                <Button type="submit" className="w-full py-6 bg-green-500 hover:bg-green-600 text-white">
                  Request Free Estimate
                </Button> : 
                <Button disabled={true} type="submit" className="w-full py-6 bg-green-500 hover:bg-green-600 text-white">
                Processing....
              </Button> 

                }
              </form>
            </CardContent>
          </Card>
        </div>

      
      </div>
    </div>
  );
}