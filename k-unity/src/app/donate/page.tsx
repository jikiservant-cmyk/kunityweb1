"use client"

import * as React from "react"
import { Heart, ShieldCheck, CreditCard, Banknote, Smartphone, ArrowRight, Users, PlayCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { KineticHeadline } from "@/components/KineticHeadline"
import { MagneticButton } from "@/components/MagneticButton"
import { InkFlowText } from "@/components/InkFlowText"
import { BlurFocusText } from "@/components/BlurFocusText"

export default function DonatePage() {
  const [amount, setAmount] = React.useState<string>("50")
  const [recurring, setRecurring] = React.useState(false)
  const { toast } = useToast()

  const handleDonate = () => {
    toast({
      title: "Redirecting...",
      description: "You are being redirected to our secure payment gateway.",
    })
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center bg-[#2D2B44]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ clipPath: 'inset(0)' }}>
          <div 
            className="fixed inset-0 w-full h-full bg-center bg-cover -z-10 grayscale brightness-[0.3]"
            style={{
              backgroundImage: `url(https://picsum.photos/seed/donate-hero/1920/1080)`,
            }}
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <KineticHeadline 
            lines={["SUPPORT OUR", "MISSION"]} 
            className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] font-serif text-[#FFB800]"
            staggerDelay={0.2}
          />
          <div className="mt-12 h-1 w-24 bg-[#FFB800] mx-auto opacity-60" />
        </div>
      </section>

      {/* 2. Split Content Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column: The Form */}
            <div className="fade-in">
              <Card className="bg-[#3E3E4E] border-none shadow-2xl rounded-sm overflow-hidden">
                <div className="p-8 md:p-12 space-y-10">
                  <div className="space-y-2">
                    <span className="text-[#FFB800] font-bold tracking-[0.3em] text-xs uppercase">Safe & Secure</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white font-headline">Choose your gift</h2>
                  </div>

                  {/* Big Amount Buttons */}
                  <div className="grid grid-cols-3 gap-4">
                    {["25", "50", "100", "250", "500", "Other"].map((val) => (
                      <button
                        key={val}
                        onClick={() => val !== 'Other' ? setAmount(val) : setAmount("")}
                        className={`h-20 text-2xl font-black transition-all duration-300 border-2 ${
                          (amount === val || (val === 'Other' && !["25", "50", "100", "250", "500"].includes(amount)))
                            ? "bg-[#FFB800] border-[#FFB800] text-[#3E3E4E]" 
                            : "bg-transparent border-white/10 text-white hover:border-[#FFB800] hover:text-[#FFB800]"
                        } font-serif`}
                      >
                        {val === 'Other' ? '??' : `$${val}`}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <div className="relative group">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl text-white/40 font-black font-serif">$</span>
                      <Input
                        type="number"
                        placeholder="0.00"
                        className="h-20 bg-white/5 border-2 border-white/10 text-white text-3xl font-black pl-12 focus:border-[#FFB800] transition-colors rounded-none placeholder:text-white/10"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center justify-between bg-black/20 p-6 border border-white/5">
                      <div className="flex items-center space-x-4">
                        <Heart className={`h-6 w-6 ${recurring ? 'text-[#FFB800] fill-[#FFB800]' : 'text-white/40'}`} />
                        <div>
                          <p className="font-bold text-white uppercase tracking-wider text-sm">Monthly Giving</p>
                          <p className="text-white/40 text-xs">Automate your impact</p>
                        </div>
                      </div>
                      <Switch checked={recurring} onCheckedChange={setRecurring} className="data-[state=checked]:bg-[#FFB800]" />
                    </div>

                    <MagneticButton strength={25} className="w-full">
                      <Button 
                        className="w-full h-20 text-2xl font-black bg-[#FFB800] text-[#3E3E4E] hover:bg-[#FFB800]/90 rounded-none shadow-xl group" 
                        onClick={handleDonate}
                      >
                        GIVE {recurring ? 'MONTHLY' : 'NOW'} — ${amount || '0'}
                        <ArrowRight className="ml-4 h-8 w-8 group-hover:translate-x-2 transition-transform" />
                      </Button>
                    </MagneticButton>
                  </div>

                  <div className="pt-6 flex items-center justify-center space-x-6 opacity-30">
                    <CreditCard className="h-6 w-6 text-white" />
                    <Smartphone className="h-6 w-6 text-white" />
                    <Banknote className="h-6 w-6 text-white" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column: The Impact */}
            <div className="space-y-16">
              <div className="space-y-8">
                <span className="text-[#FFB800] font-black tracking-[0.4em] text-sm uppercase block">Why Your Giving Matters</span>
                <KineticHeadline 
                  lines={["YOUR GENEROSITY", "FUELING FAITH"]} 
                  className="text-4xl md:text-6xl font-black uppercase text-[#2D2B44] font-headline"
                />
                <InkFlowText className="text-muted-foreground text-xl leading-relaxed font-body max-w-xl">
                  Every contribution, no matter the size, is a seed planted in our community. We believe in radical transparency and systemic change through collective action.
                </InkFlowText>
              </div>

              <div className="space-y-12">
                <div className="flex items-start space-x-6 group">
                  <div className="bg-[#F8F8F8] p-5 rounded-sm transition-transform group-hover:scale-110 duration-500">
                    <Users className="h-8 w-8 text-[#FFB800]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#2D2B44] uppercase tracking-wide">Community Outreach</h3>
                    <InkFlowText delay={1} className="text-muted-foreground font-body leading-relaxed">
                      Funding our local food pantry, shelter support, and educational programs for at-risk youth in the city center.
                    </InkFlowText>
                  </div>
                </div>

                <div className="flex items-start space-x-6 group">
                  <div className="bg-[#F8F8F8] p-5 rounded-sm transition-transform group-hover:scale-110 duration-500">
                    <PlayCircle className="h-8 w-8 text-[#FFB800]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#2D2B44] uppercase tracking-wide">Digital Ministry</h3>
                    <InkFlowText delay={1.2} className="text-muted-foreground font-body leading-relaxed">
                      Expanding our reach through high-quality live streaming and digital content to connect with those who cannot attend in person.
                    </InkFlowText>
                  </div>
                </div>

                <div className="flex items-start space-x-6 group">
                  <div className="bg-[#F8F8F8] p-5 rounded-sm transition-transform group-hover:scale-110 duration-500">
                    <Star className="h-8 w-8 text-[#FFB800]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#2D2B44] uppercase tracking-wide">Future Growth</h3>
                    <InkFlowText delay={1.4} className="text-muted-foreground font-body leading-relaxed">
                      Contributing to our long-term vision of building a permanent community center for arts and spiritual guidance.
                    </InkFlowText>
                  </div>
                </div>
              </div>

              <BlurFocusText delay={1.6}>
                <div className="p-8 bg-[#F8F8F8] border-l-4 border-[#FFB800] flex items-center space-x-6">
                  <ShieldCheck className="h-10 w-10 text-[#FFB800] shrink-0" />
                  <p className="text-sm font-bold text-[#2D2B44] uppercase tracking-widest leading-relaxed">
                    NCF Church is a registered 501(c)(3) nonprofit. All donations are tax-deductible.
                  </p>
                </div>
              </BlurFocusText>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Footer CTA Section */}
      <section className="py-32 bg-[#003322] text-white text-center">
        <div className="container mx-auto px-6">
          <KineticHeadline 
            lines={["THANK YOU FOR BEING", "PART OF THE STORY"]} 
            className="text-4xl md:text-7xl font-black uppercase font-headline mb-16"
          />
          <MagneticButton strength={30}>
            <Button className="bg-[#FFB800] text-[#003322] hover:bg-[#FFB800]/90 font-black h-20 px-16 rounded-full text-2xl group transition-all duration-500 shadow-2xl">
              JOIN THE MISSION <ArrowRight className="ml-4 h-8 w-8 group-hover:translate-x-2 transition-transform" />
            </Button>
          </MagneticButton>
        </div>
      </section>
    </div>
  )
}
