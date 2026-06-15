"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "My Wallet", href: "/wallet" },
  { name: "About", href: "/about" },
  { name: "Loan Products", href: "/sermons" },
  { name: "Savings", href: "/savings" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={cn(
      "w-full z-[100] sticky top-0 transition-all duration-500 ease-in-out border-b backdrop-blur-xl",
      isScrolled 
        ? "bg-[#0b1f3a]/90 border-[#c9922a]/10 h-[80px]" 
        : "bg-[#0b1f3a]/95 border-[#c9922a]/20 h-[120px]"
    )}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-12 h-full">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center min-w-0">
            <Link href="/" className="flex items-center group shrink-0">
              <img 
                src="/images/Adobe Express - file.png" 
                alt="K-unity Logo" 
                className={cn(
                  "transition-all duration-500 object-contain",
                  isScrolled ? "h-12 sm:h-14" : "h-20 sm:h-28"
                )}
              />
              <div className={cn(
                "font-serif text-white tracking-tight transition-all duration-500 ease-in-out overflow-hidden flex flex-col justify-center",
                isScrolled 
                  ? "max-w-0 opacity-0 ml-0" 
                  : "max-w-[400px] sm:max-w-[500px] opacity-100 ml-4 sm:ml-6"
              )}>
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-none">K-unity</span>
                <span className="text-[#c9922a] text-[11px] sm:text-[12px] lg:text-[14px] uppercase tracking-[0.2em] font-bold leading-none mt-2">Finance SACCO</span>
              </div>
            </Link>

            <div className={cn(
              "hidden md:flex items-center transition-all duration-500",
              isScrolled ? "ml-8 lg:ml-12 space-x-4 lg:space-x-8" : "ml-12 lg:ml-20 space-x-6 lg:space-x-10"
            )}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-[14px] font-normal tracking-[0.02em] transition-all hover:text-white font-body whitespace-nowrap",
                    pathname === link.href ? "text-[#c9922a]" : "text-white/65"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center">
              <Link href="/join">
                <Button className={cn(
                  "bg-[#c9922a] hover:bg-[#e8b455] text-white border-none rounded-[6px] font-medium transition-all",
                  isScrolled ? "px-5 h-9 text-xs" : "px-7 h-11 text-sm"
                )}>
                  Join as Investor
                </Button>
              </Link>
            </div>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-white shrink-0"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0b1f3a] border-t border-white/5 px-6 py-8 space-y-6 absolute top-full left-0 right-0 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "block text-xl font-serif tracking-wide text-white",
                pathname === link.href ? "text-[#c9922a]" : "opacity-60"
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/join" onClick={() => setIsOpen(false)}>
            <Button className="w-full bg-[#c9922a] text-white rounded-[6px] h-14 text-lg">
              Join as Investor
            </Button>
          </Link>
        </div>
      )}
    </header>
  )
}
