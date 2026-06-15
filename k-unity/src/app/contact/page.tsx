"use client"

import * as React from "react"
import { Mail, Phone, MapPin, Send, MessageSquare, Landmark, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { KineticHeadline } from "@/components/KineticHeadline"
import { MagneticButton } from "@/components/MagneticButton"
import { InkFlowText } from "@/components/InkFlowText"

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out to K-unity Finance. Our advisors will contact you shortly via Morriswise940@gmail.com.",
      })
    }, 1500)
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative h-[40vh] w-full overflow-hidden flex items-center justify-center bg-[#0b1f3a]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ clipPath: 'inset(0)' }}>
          <div 
            className="fixed inset-0 w-full h-full bg-center bg-cover -z-10 brightness-[0.25]"
            style={{
              backgroundImage: `url(https://www.4x4uganda.com/wp-content/uploads/2023/01/Nakasero-Market-Kampala.jpg)`,
            }}
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <KineticHeadline 
            lines={["VISIT OUR", "OFFICE"]} 
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] font-serif text-[#c9922a]"
            staggerDelay={0.2}
          />
        </div>
      </section>

      {/* 2. Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="text-center mb-20 space-y-6">
            <KineticHeadline 
              lines={["WE'RE HERE TO HELP"]} 
              className="text-4xl md:text-5xl font-black text-[#0b1f3a] uppercase font-headline"
            />
            <InkFlowText className="text-muted-foreground text-xl font-body max-w-2xl mx-auto leading-relaxed">
              Have a question about our financial products, or need a customized savings plan? 
              Reach out and let our expert advisors guide you toward financial freedom.
            </InkFlowText>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Info Sidebar */}
            <div className="space-y-12">
              <div className="space-y-8">
                <span className="text-[#c9922a] font-black tracking-[0.4em] text-xs uppercase block">Information</span>
                
                <div className="flex items-start space-x-6 group">
                  <div className="bg-[#faf8f3] p-4 rounded-sm transition-transform group-hover:scale-110 duration-500">
                    <MapPin className="h-6 w-6 text-[#c9922a]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-[#0b1f3a] uppercase tracking-wide">Location</h3>
                    <p className="text-muted-foreground font-body text-sm">Kampala, Uganda</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 group">
                  <div className="bg-[#faf8f3] p-4 rounded-sm transition-transform group-hover:scale-110 duration-500">
                    <Phone className="h-6 w-6 text-[#c9922a]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-[#0b1f3a] uppercase tracking-wide">Phone</h3>
                    <p className="text-muted-foreground font-body text-sm">(+256) 763 019052</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 group">
                  <div className="bg-[#faf8f3] p-4 rounded-sm transition-transform group-hover:scale-110 duration-500">
                    <Mail className="h-6 w-6 text-[#c9922a]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-[#0b1f3a] uppercase tracking-wide">Email</h3>
                    <p className="text-muted-foreground font-body text-sm">Morriswise940@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="p-10 bg-[#0b1f3a] text-white space-y-6 rounded-sm shadow-xl border-l-4 border-[#c9922a]">
                <ShieldCheck className="h-10 w-10 text-[#c9922a]" />
                <h3 className="text-2xl font-black uppercase font-headline">Member Support</h3>
                <InkFlowText delay={1} className="text-white/70 font-body leading-relaxed text-sm">
                  Our dedicated support team is here to help you manage your shares and savings. 
                  We prioritize transparency and professional cooperative standards.
                </InkFlowText>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="first-name" className="text-xs font-black uppercase tracking-widest text-[#0b1f3a]/50">First Name</Label>
                    <Input id="first-name" placeholder="John" required className="h-14 bg-[#faf8f3] border-none rounded-none focus-visible:ring-1 focus-visible:ring-[#c9922a] placeholder:text-gray-300" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="last-name" className="text-xs font-black uppercase tracking-widest text-[#0b1f3a]/50">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" required className="h-14 bg-[#faf8f3] border-none rounded-none focus-visible:ring-1 focus-visible:ring-[#c9922a] placeholder:text-gray-300" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-[#0b1f3a]/50">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required className="h-14 bg-[#faf8f3] border-none rounded-none focus-visible:ring-1 focus-visible:ring-[#c9922a] placeholder:text-gray-300" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-[#0b1f3a]/50">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+256 700 000000" required className="h-14 bg-[#faf8f3] border-none rounded-none focus-visible:ring-1 focus-visible:ring-[#c9922a] placeholder:text-gray-300" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="location" className="text-xs font-black uppercase tracking-widest text-[#0b1f3a]/50">Location</Label>
                    <Input id="location" placeholder="e.g. Kampala, Nakawa" required className="h-14 bg-[#faf8f3] border-none rounded-none focus-visible:ring-1 focus-visible:ring-[#c9922a] placeholder:text-gray-300" />
                  </div>
                </div>

                <div className="space-y-6">
                  <Label className="text-xs font-black uppercase tracking-widest text-[#0b1f3a]/50">Reason for inquiry</Label>
                  <RadioGroup defaultValue="inquiry" className="flex flex-col sm:flex-row sm:space-x-12 space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-3 group cursor-pointer">
                      <RadioGroupItem value="inquiry" id="r1" className="border-2 border-[#c9922a] text-[#c9922a]" />
                      <Label htmlFor="r1" className="font-bold text-[#0b1f3a] uppercase tracking-wide text-sm cursor-pointer group-hover:text-[#c9922a] transition-colors">General Inquiry</Label>
                    </div>
                    <div className="flex items-center space-x-3 group cursor-pointer">
                      <RadioGroupItem value="loan" id="r2" className="border-2 border-[#c9922a] text-[#c9922a]" />
                      <Label htmlFor="r2" className="font-bold text-[#0b1f3a] uppercase tracking-wide text-sm cursor-pointer group-hover:text-[#c9922a] transition-colors">Loan Application</Label>
                    </div>
                    <div className="flex items-center space-x-3 group cursor-pointer">
                      <RadioGroupItem value="membership" id="r3" className="border-2 border-[#c9922a] text-[#c9922a]" />
                      <Label htmlFor="r3" className="font-bold text-[#0b1f3a] uppercase tracking-wide text-sm cursor-pointer group-hover:text-[#c9922a] transition-colors">Membership Setup</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="message" className="text-xs font-black uppercase tracking-widest text-[#0b1f3a]/50">How can we help?</Label>
                  <Textarea id="message" placeholder="Your inquiry here..." className="min-h-[200px] bg-[#faf8f3] border-none rounded-none focus-visible:ring-1 focus-visible:ring-[#c9922a] placeholder:text-gray-300 p-6 text-lg resize-none" required />
                </div>

                <div className="pt-4">
                  <MagneticButton strength={20} className="w-full">
                    <Button type="submit" className="w-full h-20 text-xl font-black bg-[#c9922a] text-white hover:bg-[#c9922a]/90 rounded-none shadow-xl group" disabled={isSubmitting}>
                      {isSubmitting ? "SENDING..." : (
                        <span className="flex items-center justify-center">
                          SEND INQUIRY
                          <Send className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                        </span>
                      )}
                    </Button>
                  </MagneticButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Footer Map Placeholder Section */}
      <section className="h-[50vh] w-full bg-[#f0ece2] relative group overflow-hidden">
        <div 
          className="absolute inset-0 brightness-90 transition-all duration-1000 bg-center bg-cover"
          style={{ backgroundImage: `url(https://www.4x4uganda.com/wp-content/uploads/2023/01/Nakasero-Market-Kampala.jpg)` }}
        />
        <div className="absolute inset-0 bg-[#0b1f3a]/40 group-hover:bg-transparent transition-all duration-1000 flex items-center justify-center">
          <div className="bg-white p-8 shadow-2xl space-y-2 text-center border-t-4 border-[#c9922a]">
            <h3 className="text-xl font-black uppercase font-headline text-[#0b1f3a]">Our Headquarters</h3>
            <p className="text-muted-foreground text-sm font-body">Main Office open Mon-Fri, 8:30am - 5:00pm</p>
          </div>
        </div>
      </section>
    </div>
  )
}
