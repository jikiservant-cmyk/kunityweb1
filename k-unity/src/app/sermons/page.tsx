'use client';

import { ArrowRight, Landmark, Briefcase, GraduationCap, Home, Car, Tractor, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { KineticHeadline } from "@/components/KineticHeadline"
import { InkFlowText } from "@/components/InkFlowText"
import { MagneticButton } from "@/components/MagneticButton"
import { ImageReveal } from "@/components/ImageReveal"
import { cn } from "@/lib/utils"

const products = [
  {
    title: "LOAN POLICY",
    description: "Members may receive loans up to 3/4 of their savings. Repayment is structured in 3 installments with a fair 5% interest rate for members.",
    image: "https://www.dhl.com/discover/adobe/dynamicmedia/deliver/dm-aid--5f9319da-2ace-494a-ad36-3cb6eff624bb/streamlining-delivery-and-logistics.jpg?width=1400&preferwebp=true&quality=82",
    icon: <Scale className="h-8 w-8 sm:h-10 sm:w-10 text-[#FFB800]" />,
    bgColor: "bg-[#3E3E4E]",
    btnClass: "bg-[#FFB800] text-[#3E3E4E]",
    stats: "5% Member / 10% Non-Member"
  },
  {
    title: "AGRI-BUSINESS LOAN",
    description: "Empowering youth entrepreneurs in agriculture. Access capital for modern tools, seeds, and livestock to build sustainable farming ventures.",
    image: "https://coffeeheads.com/wp-content/uploads/2018/04/Blog-Pic-Harvesting__1597682371_94.206.192.97.jpg",
    icon: <Tractor className="h-8 w-8 sm:h-10 sm:w-10 text-[#FFB800]" />,
    bgColor: "bg-[#003322]",
    btnClass: "border-[#FFB800] text-[#FFB800]",
    stats: "Promoting Modern Farming"
  },
  {
    title: "UNIVERSITY TUITION",
    description: "Specifically designed to support youths transitioning to higher education. Access affordable credit to bridge the gap for entry fees.",
    image: "https://blog.lendsqr.com/wp-content/uploads/2025/05/How-to-get-a-student-loan-in-Uganda.webp",
    icon: <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10 text-[#FFB800]" />,
    bgColor: "bg-[#3E3E4E]",
    btnClass: "bg-[#FFB800] text-[#3E3E4E]",
    stats: "Higher Education Support"
  },
  {
    title: "ENTERPRISE STARTUP",
    description: "For members starting small enterprises or income-generating activities. We provide the seed capital required to launch your business.",
    image: "https://media.gettyimages.com/id/1151368592/photo/taxi-with-the-taxi-driver-posing-in-hillbrow-johannesburg.jpg?s=612x612&w=0&k=20&c=4m9x8pDnLB3I2OogORjG_t4rxzAFyx4Tp_jvq1zUcac=",
    icon: <Briefcase className="h-8 w-8 sm:h-10 sm:w-10 text-[#FFB800]" />,
    bgColor: "bg-[#003322]",
    btnClass: "border-[#FFB800] text-[#FFB800]",
    stats: "Youth Entrepreneurship"
  },
  {
    title: "WELFARE SUPPORT",
    description: "Emergency support for members in need. Subject to cabinet approval to ensure fair and transparent distribution within the community.",
    image: "https://www.unicef.org/uganda/sites/unicef.org.uganda/files/styles/media_large_image/public/UNI55289396.webp?itok=yW49xO5w",
    icon: <Home className="h-8 w-8 sm:h-10 sm:w-10 text-[#FFB800]" />,
    bgColor: "bg-[#3E3E4E]",
    btnClass: "bg-[#FFB800] text-[#3E3E4E]",
    stats: "Community Well-being"
  }
]

export default function ProductsPage() {
  return (
    <div className="flex flex-col w-full">
      <section className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] w-full overflow-hidden flex items-center justify-center bg-[#0b1f3a]">
        <div className="absolute inset-0 bg-grid-lines opacity-10 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <KineticHeadline 
            lines={["OUR LOAN", "PRINCIPLES"]} 
            className="text-4xl sm:text-7xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] font-headline text-[#c9922a]"
            staggerDelay={0.2}
          />
        </div>
      </section>

      {products.map((prod, i) => (
        <section key={i} className="relative w-full overflow-hidden">
          <div className={cn(
            "flex flex-col lg:flex-row min-h-[500px] lg:min-h-[600px]",
            i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
          )}>
            <div className="w-full lg:w-1/2 relative h-[350px] sm:h-[450px] lg:h-auto overflow-hidden">
              <ImageReveal 
                src={prod.image} 
                alt={prod.title} 
                className="w-full h-full object-cover"
                maskColor={prod.bgColor === "bg-[#3E3E4E]" ? "bg-[#3E3E4E]" : "bg-[#003322]"}
              />
            </div>

            <div className={cn(
              "w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-24",
              prod.bgColor,
              "text-white"
            )}>
              <div className="max-w-md space-y-6 sm:space-y-8 w-full slide-up">
                <div className="flex items-center justify-between">
                   {prod.icon}
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFB800] border border-[#FFB800]/30 px-3 py-1 rounded-full">
                      {prod.stats}
                   </span>
                </div>
                <KineticHeadline 
                  lines={[prod.title]} 
                  className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#FFB800] leading-tight"
                />
                <InkFlowText delay={0.8} className="text-base sm:text-lg md:text-xl font-body leading-relaxed opacity-90">
                  {prod.description}
                </InkFlowText>
                <div className="pt-4">
                  <MagneticButton className="w-full sm:w-auto">
                    <Button className={cn("w-full sm:w-auto h-16 px-12 rounded-full font-black text-lg sm:text-xl group", prod.btnClass)}>
                      REQUEST FORM <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="py-20 lg:py-32 bg-[#003322] text-white text-center px-6 overflow-hidden">
        <div className="container mx-auto">
          <KineticHeadline 
            lines={["AFFORDABLE CREDIT"]} 
            className="text-3xl sm:text-5xl lg:text-7xl font-black uppercase font-headline mb-8 lg:mb-12 leading-tight"
          />
          <MagneticButton className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto border-[#FFB800] text-[#FFB800] hover:bg-[#FFB800] hover:text-[#003322] font-black h-16 sm:h-20 px-10 lg:px-12 rounded-full text-lg sm:text-2xl group transition-all duration-500">
              CONSULT THE CABINET <ArrowRight className="ml-2 h-8 w-8 group-hover:translate-x-2 transition-transform" />
            </Button>
          </MagneticButton>
        </div>
      </section>
    </div>
  )
}
