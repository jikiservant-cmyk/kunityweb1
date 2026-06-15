'use client';

import Image from "next/image"
import { Shield, Target, Award, ArrowRight, School, Users, Landmark, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { KineticHeadline } from "@/components/KineticHeadline"
import { InkFlowText } from "@/components/InkFlowText"
import { MagneticButton } from "@/components/MagneticButton"
import { BlurFocusText } from "@/components/BlurFocusText"
import { Separator } from "@/components/ui/separator"
import { ImageReveal } from "@/components/ImageReveal"

const cabinet = [
  {
    name: "Morris Wise",
    role: "Chairperson",
    bio: "Presides over meetings, represents the SACCO, and ensures all strategic decisions are implemented for the benefit of our youth members.",
    image: "/images/cp kunity.jpeg"
  },
  {
    name: "Vice Chairperson",
    role: "Assists the chairperson in all leadership duties.",
    bio: "Acts on behalf of the chairperson and supports committee coordination and youth mobilization.",
    image: "https://image.shutterstock.com/image-vector/user-profile-icon-flat-style-260nw-2748799073.jpg"
  },
  {
    name: "Treasurer",
    role: "Receives and records all savings and transactions.",
    bio: "Ensures financial transparency, accountability, and provides detailed financial statements to all investors.",
    image: "https://image.shutterstock.com/image-vector/user-profile-icon-flat-style-260nw-2748799073.jpg"
  },
  {
    name: "Secretary",
    role: "Records and keeps meeting minutes.",
    bio: "Handles all official correspondence and maintains the integrity of the SACCO's administrative records.",
    image: "https://image.shutterstock.com/image-vector/user-profile-icon-flat-style-260nw-2748799073.jpg"
  },
  {
    name: "Coordinator",
    role: "Mobilizes members and organizes programs.",
    bio: "Acts as a vital link between the youth members and the cabinet to ensure effective communication.",
    image: "https://image.shutterstock.com/image-vector/user-profile-icon-flat-style-260nw-2748799073.jpg"
  },
  {
    name: "Agent",
    role: "Field Operations & Mobilization",
    bio: "Collects savings and delivers them to the treasurer while helping members meet their financial obligations.",
    image: "https://image.shutterstock.com/image-vector/user-profile-icon-flat-style-260nw-2748799073.jpg"
  }
]

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      <section className="relative h-[50vh] lg:h-[70vh] w-full overflow-hidden flex items-center justify-center bg-[#0b1f3a]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ clipPath: 'inset(0)' }}>
          <div 
            className="fixed inset-0 w-full h-full bg-center bg-cover -z-10 brightness-[0.25]"
            style={{
              backgroundImage: `url(https://mulengeranews.com/wp-content/uploads/2026/03/20260316_141702-750x422.jpg)`,
            }}
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <KineticHeadline 
            lines={["OUR CONSTITUTION", "OUR MISSION"]} 
            className="text-4xl sm:text-7xl lg:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] font-serif text-[#c9922a]"
            staggerDelay={0.2}
          />
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-[#0b1f3a] text-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center space-y-8 lg:space-y-12">
            <BlurFocusText>
              <h2 className="text-[#c9922a] text-2xl sm:text-3xl md:text-5xl font-black uppercase font-serif tracking-tight leading-tight">
                Empowering Youths
              </h2>
            </BlurFocusText>
            
            <div className="space-y-6 lg:space-y-8">
              <InkFlowText delay={0.8} className="text-lg sm:text-xl md:text-2xl font-body leading-relaxed text-white/90 italic">
                "To build a financially responsible youth in our community by promoting a culture of saving, responsible borrowing, and financial literacy."
              </InkFlowText>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-white text-[#0b1f3a] overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 lg:space-y-8 slide-up">
              <KineticHeadline 
                lines={["THE SACCO", "OBJECTIVES"]} 
                className="text-3xl sm:text-4xl lg:text-6xl font-black uppercase font-headline tracking-tighter text-[#0b1f3a] leading-tight"
              />
              <Separator className="bg-[#0b1f3a]/10 w-32 h-[2px]" />
              <div className="space-y-4 text-muted-foreground text-base sm:text-lg leading-relaxed font-body">
                <p>1. Promote a culture of regular saving among members.</p>
                <p>2. Provide affordable credit for welfare and development.</p>
                <p>3. Assist members in starting small enterprises through expert guidance.</p>
                <p>4. Support members transitioning to university with bridge financing.</p>
                <p>5. Foster a network of financially independent and disciplined youths.</p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl slide-up" style={{ animationDelay: '0.4s' }}>
              <ImageReveal 
                src="https://media.gettyimages.com/id/1151368592/photo/taxi-with-the-taxi-driver-posing-in-hillbrow-johannesburg.jpg?s=612x612&w=0&k=20&c=4m9x8pDnLB3I2OogORjG_t4rxzAFyx4Tp_jvq1zUcac=" 
                alt="Entrepreneurial Spirit" 
                className="w-full h-full transition-all duration-1000"
                maskColor="bg-[#0b1f3a]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-[#faf8f3] overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12 lg:mb-16 slide-up">
            <KineticHeadline 
              lines={["OUR CABINET"]} 
              className="text-3xl sm:text-4xl font-black uppercase font-headline text-[#0b1f3a] mb-4"
            />
            <InkFlowText className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              K-unity Finance SACCO is governed by a General Assembly and an Executive Committee dedicated to financial integrity and professional excellence.
            </InkFlowText>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {cabinet.map((member, i) => (
              <div key={i} className="flex flex-col space-y-6 slide-up" style={{ animationDelay: `${i * 0.2}s` }}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg bg-gray-100">
                  <ImageReveal 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full transition-all duration-700"
                    maskColor="bg-[#c9922a]"
                  />
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-black font-headline text-[#0b1f3a] uppercase leading-tight">{member.name}</h3>
                  <p className="text-[#c9922a] font-bold uppercase tracking-widest text-[10px] sm:text-xs">{member.role}</p>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-[#0b1f3a] text-white text-center px-6 overflow-hidden">
        <div className="container mx-auto">
          <KineticHeadline 
            lines={["INVEST IN YOUR", "FUTURE LEGACY"]} 
            className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase font-headline mb-8 leading-tight"
          />
          <MagneticButton className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-[#c9922a] text-white hover:bg-[#e8b455] font-black h-16 sm:h-20 px-10 rounded-full text-lg sm:text-xl group">
              JOIN AS INVESTOR <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </MagneticButton>
        </div>
      </section>
    </div>
  )
}
