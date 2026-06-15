'use client';

import React from "react";
import { ArrowRight, Calendar as CalendarIcon, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/MagneticButton";
import { KineticHeadline } from "@/components/KineticHeadline";
import { InkFlowText } from "@/components/InkFlowText";
import { ImageReveal } from "@/components/ImageReveal";
import { cn } from "@/lib/utils";

const events = [
  {
    day: "03",
    month: "NOV",
    title: "Youth Night: Glow in the Dark",
    location: "Youth Center",
    time: "6:30 PM",
    image: "https://picsum.photos/seed/event-youth/600/800"
  },
  {
    day: "05",
    month: "NOV",
    title: "Community Outreach Lunch",
    location: "Main Hall",
    time: "12:30 PM",
    image: "https://picsum.photos/seed/event-outreach/600/800"
  },
  {
    day: "12",
    month: "NOV",
    title: "Marriage Seminar Weekend",
    location: "Sanctuary",
    time: "7:00 PM",
    image: "https://picsum.photos/seed/event-marriage/600/800"
  },
  {
    day: "15",
    month: "NOV",
    title: "Choir Rehearsal & Christmas",
    location: "Music Room",
    time: "7:00 PM",
    image: "https://picsum.photos/seed/event-choir/600/800"
  },
  {
    day: "18",
    month: "NOV",
    title: "Women's Coffee Morning",
    location: "Fellowship Cafe",
    time: "10:00 AM",
    image: "https://picsum.photos/seed/event-women/600/800"
  },
  {
    day: "26",
    month: "NOV",
    title: "Baptism Service",
    location: "North Garden",
    time: "2:00 PM",
    image: "https://picsum.photos/seed/event-baptism/600/800"
  }
];

export default function EventsPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F5F5F5]">
      {/* Parallax Background Wrapper */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0" style={{ clipPath: 'inset(0)' }}>
        <div 
          className="fixed inset-0 w-full h-full bg-center bg-cover brightness-[0.25]"
          style={{
            backgroundImage: `url(https://www.4x4uganda.com/wp-content/uploads/2023/01/Nakasero-Market-Kampala.jpg)`,
          }}
        />
      </div>

      {/* 1. Featured Event Hero */}
      <section className="relative z-10 w-full min-h-[80vh] flex flex-col lg:flex-row overflow-hidden border-b border-white/10">
        {/* Left: Moody Photo with subtle zoom */}
        <div className="w-full lg:w-3/5 relative min-h-[400px] lg:min-h-full overflow-hidden group">
          <ImageReveal 
            src="https://www.4x4uganda.com/wp-content/uploads/2023/01/Nakasero-Market-Kampala.jpg" 
            alt="Local Community Trade" 
            className="w-full h-full brightness-75 transition-transform duration-[10000ms] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:hidden" />
        </div>

        {/* Right: Solid Green Date/Title block */}
        <div className="w-full lg:w-2/5 bg-[#003322] flex flex-col justify-center p-12 md:p-20 text-white">
          <div className="space-y-6 slide-up">
            <span className="text-[#FFB800] font-serif text-3xl md:text-5xl font-black tracking-tighter block border-b-2 border-[#FFB800] w-fit pb-2">
              OCT 24
            </span>
            <KineticHeadline 
              lines={["ANNUAL", "GALA NIGHT"]} 
              className="text-5xl md:text-7xl font-black uppercase font-headline leading-[0.85]"
            />
            <InkFlowText className="text-white/80 text-lg md:text-xl font-body leading-relaxed max-w-md">
              A night of celebration and vision casting for the upcoming year. Join us for an evening of inspiration and community impact.
            </InkFlowText>
            <div className="pt-8">
              <MagneticButton>
                <Button className="bg-[#FFB800] text-[#003322] hover:bg-[#FFB800]/90 font-black h-16 px-10 rounded-full text-xl group">
                  RESERVE A SEAT <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Grid Header */}
      <section className="relative z-10 py-24 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <KineticHeadline 
            lines={["UPCOMING", "GATHERINGS"]} 
            className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter font-headline mb-6"
          />
          <div className="h-1 w-24 bg-[#FFB800] mx-auto" />
        </div>
      </section>

      {/* 3. Event Grid */}
      <section className="relative z-10 pb-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {events.map((event, i) => (
              <div 
                key={i} 
                className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-2xl slide-up"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {/* Top: Big Date */}
                <div className="p-8 bg-white flex flex-col items-center justify-center border-b border-gray-100">
                  <span className="text-sm font-black tracking-[0.3em] text-gray-400 uppercase">{event.month}</span>
                  <span className="text-6xl font-black text-[#FFB800] font-headline">{event.day}</span>
                </div>

                {/* Middle: Thumbnail */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageReveal 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full transition-all duration-700"
                  />
                </div>

                {/* Bottom: Charcoal Title/Button block */}
                <div className="p-8 bg-[#3E3E4E] text-white flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold font-headline leading-tight">{event.title}</h3>
                    <div className="space-y-1 text-white/60 text-sm font-body">
                      <div className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-[#FFB800]" /> {event.location}</div>
                      <div className="flex items-center"><Clock className="h-4 w-4 mr-2 text-[#FFB800]" /> {event.time}</div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <MagneticButton className="w-full">
                      <Button className="w-full h-12 bg-white text-[#3E3E4E] hover:bg-[#FFB800] hover:text-[#003322] font-black uppercase tracking-wider rounded-full transition-colors group">
                        REGISTER <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative z-10 py-32 bg-[#003322] text-white text-center">
        <div className="container mx-auto px-6">
          <KineticHeadline 
            lines={["NEVER MISS A MOMENT"]} 
            className="text-4xl md:text-7xl font-black uppercase font-headline mb-12"
          />
          <MagneticButton>
            <Button variant="outline" className="border-[#FFB800] text-[#FFB800] hover:bg-[#FFB800] hover:text-[#003322] font-black h-20 px-12 rounded-full text-2xl group">
              SUBSCRIBE TO CALENDAR <ArrowRight className="ml-2 h-8 w-8 group-hover:translate-x-2 transition-transform" />
            </Button>
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
