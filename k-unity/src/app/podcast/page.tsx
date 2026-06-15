'use client';

import React, { useEffect, useState } from "react";
import { Play, Clock, Volume2, SkipForward, SkipBack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/MagneticButton";
import { KineticHeadline } from "@/components/KineticHeadline";
import { InkFlowText } from "@/components/InkFlowText";
import { BlurFocusText } from "@/components/BlurFocusText";
import { ImageReveal } from "@/components/ImageReveal";

const episodes = [
  {
    number: "04",
    title: "The Architecture of Faith",
    description: "In this episode, we explore how our daily habits and environments shape our spiritual walk and the 'structures' we build our lives upon.",
    date: "OCT 15, 2023",
    duration: "42 MIN",
    image: "https://picsum.photos/seed/pod4/400/400"
  },
  {
    number: "03",
    title: "Grace in the Grey Areas",
    description: "Navigating complex moral landscapes with compassion and truth. A deep dive into the nuances of modern ethical challenges.",
    date: "OCT 08, 2023",
    duration: "38 MIN",
    image: "https://picsum.photos/seed/pod3/400/400"
  },
  {
    number: "02",
    title: "Quietude and the City",
    description: "Finding moments of profound silence and connection with the divine amidst the relentless noise of metropolitan life.",
    date: "OCT 01, 2023",
    duration: "45 MIN",
    image: "https://picsum.photos/seed/pod2/400/400"
  },
  {
    number: "01",
    title: "Beginnings and Anchors",
    description: "Our pilot episode discussing the fundamental pillars of NCF Church and why we believe in the power of local community.",
    date: "SEP 24, 2023",
    duration: "50 MIN",
    image: "https://picsum.photos/seed/pod1/400/400"
  }
];

export default function PodcastPage() {
  const [animationDurations, setAnimationDurations] = useState<number[]>([]);

  useEffect(() => {
    // Set random animation durations only after mounting to avoid hydration mismatch
    const durations = Array.from({ length: 10 }, () => 1 + Math.random());
    setAnimationDurations(durations);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#1A1A1A] pb-32">
      {/* 1. Latest Episode Hero */}
      <section className="relative w-full lg:h-[85vh] flex flex-col lg:flex-row border-b border-white/5">
        {/* Left: Cover Art */}
        <div className="w-full lg:w-1/2 relative flex items-center justify-center p-12 md:p-24 bg-[#141414]">
          <BlurFocusText className="relative aspect-square w-full max-w-md">
             <div className="absolute inset-0 bg-[#FFB800]/20 blur-3xl rounded-full scale-110 opacity-30 animate-pulse" />
             <ImageReveal 
              src="https://picsum.photos/seed/featured-pod/800/800" 
              alt="Latest Episode Cover" 
              className="w-full h-full shadow-2xl rounded-sm"
            />
          </BlurFocusText>
        </div>

        {/* Right: Content Block */}
        <div className="w-full lg:w-1/2 bg-[#003322] flex flex-col justify-center p-12 md:p-24 text-white">
          <div className="space-y-4 mb-8">
            <span className="text-[#FFB800] font-headline font-bold text-sm tracking-[0.4em] block uppercase">
              LATEST EPISODE
            </span>
            <div className="flex flex-col">
              <span className="text-[#FFB800] text-lg font-bold">EPISODE</span>
              <span className="text-8xl md:text-[10rem] font-black leading-none font-headline">05</span>
            </div>
          </div>
          
          <KineticHeadline 
            lines={["RHYTHMS OF", "RESTORATION"]} 
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase font-headline leading-[0.85] mb-12"
          />

          <div className="flex items-center space-x-8">
            <MagneticButton strength={30}>
              <button className="bg-[#FFB800] text-[#003322] w-24 h-24 rounded-full flex items-center justify-center shadow-lg group hover:scale-110 transition-transform">
                <Play className="h-10 w-10 fill-[#003322] ml-1 group-hover:scale-110 transition-transform" />
              </button>
            </MagneticButton>
            <div className="space-y-1">
              <p className="font-bold text-xl">Listen Now</p>
              <p className="text-white/60 font-body">48 Minutes • Oct 22, 2023</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Archive List */}
      <section className="py-24 bg-[#1A1A1A]">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="mb-16">
            <KineticHeadline 
              lines={["EPISODE", "ARCHIVE"]} 
              className="text-white text-4xl md:text-6xl font-black font-headline mb-4"
            />
            <div className="h-1 w-24 bg-[#FFB800]" />
          </div>

          <div className="space-y-0">
            {episodes.map((ep, i) => (
              <div 
                key={i} 
                className="group flex flex-col md:flex-row items-center py-12 border-b border-white/10 hover:bg-white/[0.02] transition-colors px-6 -mx-6 rounded-xl"
              >
                {/* Thumbnail */}
                <div className="w-24 h-24 shrink-0 mb-6 md:mb-0 md:mr-12">
                  <ImageReveal 
                    src={ep.image} 
                    alt={ep.title} 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-700 rounded-md"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 space-y-3 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-1">
                    <span className="text-[#FFB800] font-bold text-sm tracking-widest uppercase">EP {ep.number}</span>
                    <span className="hidden md:block text-white/20">•</span>
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest">{ep.date}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white font-headline group-hover:text-[#FFB800] transition-colors">
                    {ep.title}
                  </h3>
                  <InkFlowText className="text-white/60 font-body text-sm md:text-base max-w-2xl">
                    {ep.description}
                  </InkFlowText>
                </div>

                {/* Duration & Button */}
                <div className="mt-8 md:mt-0 md:ml-12 flex flex-col items-center md:items-end space-y-4">
                  <div className="flex items-center text-white/40 text-xs font-bold space-x-2">
                    <Clock className="h-3 w-3" />
                    <span>{ep.duration}</span>
                  </div>
                  <MagneticButton>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-[#FFB800] hover:text-[#003322] hover:border-[#FFB800] font-black rounded-full px-8 group">
                      LISTEN NOW <Play className="ml-2 h-4 w-4 fill-current" />
                    </Button>
                  </MagneticButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Floating Now Playing Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] bg-[#3E3E4E] border-t border-white/10 h-24 flex items-center shadow-2xl px-6 md:px-12 backdrop-blur-lg bg-opacity-95">
        <div className="container mx-auto flex items-center justify-between gap-8">
          {/* Track Info */}
          <div className="flex items-center space-x-4 max-w-[200px] md:max-w-md overflow-hidden">
            <div className="hidden md:block w-12 h-12 bg-[#FFB800]/20 rounded overflow-hidden">
              <img src="https://picsum.photos/seed/playing/100/100" alt="Now Playing" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm truncate uppercase tracking-wider">Rhythms of Restoration</span>
              <span className="text-white/50 text-[10px] uppercase font-bold tracking-widest">Episode 05</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center flex-1 space-y-2">
            <div className="flex items-center space-x-8">
              <button className="text-white/60 hover:text-[#FFB800] transition-colors"><SkipBack className="h-5 w-5" /></button>
              <button className="bg-white text-[#3E3E4E] hover:bg-[#FFB800] hover:text-[#003322] w-10 h-10 rounded-full flex items-center justify-center transition-colors"><Play className="h-5 w-5 fill-current ml-0.5" /></button>
              <button className="text-white/60 hover:text-[#FFB800] transition-colors"><SkipForward className="h-5 w-5" /></button>
            </div>
            {/* Visualizer & Progress */}
            <div className="w-full max-w-lg flex items-center space-x-4">
              <span className="text-[10px] text-white/40 font-mono">12:45</span>
              <div className="flex-1 h-1 bg-white/10 rounded-full relative group">
                <div className="absolute top-0 left-0 h-full w-1/3 bg-[#FFB800] rounded-full" />
                <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-[10px] text-white/40 font-mono">48:00</span>
            </div>
          </div>

          {/* Minimalist Visualizer (Right) */}
          <div className="hidden lg:flex items-end space-x-1 h-8 w-24">
            {animationDurations.length > 0 && [0.4, 0.7, 0.9, 0.5, 0.8, 0.6, 0.3, 0.8, 0.5, 0.9].map((h, i) => (
              <div 
                key={i} 
                className="w-1 bg-white opacity-20"
                style={{ 
                  height: `${h * 100}%`,
                  animation: `visualizerPulse ${animationDurations[i]}s infinite ease-in-out` 
                }}
              />
            ))}
          </div>

          {/* Volume */}
          <div className="hidden md:flex items-center space-x-4">
            <Volume2 className="h-5 w-5 text-white/60" />
            <div className="w-20 h-1 bg-white/10 rounded-full">
              <div className="h-full w-3/4 bg-white/40 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes visualizerPulse {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
