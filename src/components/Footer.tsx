import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, MapPin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#060f1e] text-white/50 pt-24 pb-12 px-6 lg:px-[6%]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-4">
              <img 
                src="/images/Adobe Express - file.png" 
                alt="K-unity Logo" 
                className="h-20 w-auto object-contain brightness-110"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-serif text-white tracking-tight leading-none">
                  K-unity
                </span>
                <span className="text-[#c9922a] text-[10px] uppercase tracking-widest font-bold mt-1">
                  Finance SACCO
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed font-body font-light max-w-xs">
              Promoting a culture of regular saving, responsible borrowing, and financial literacy among the youth.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-white mb-8">Saving Tiers</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><span className="hover:text-[#c9922a] transition-colors cursor-default">Basic (2.5K/wk)</span></li>
              <li><span className="hover:text-[#c9922a] transition-colors cursor-default">Moderate (5K/wk)</span></li>
              <li><span className="hover:text-[#c9922a] transition-colors cursor-default">Super (10K/wk)</span></li>
              <li><span className="hover:text-[#c9922a] transition-colors cursor-default">Premium (15K/wk)</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-white mb-8">SACCO Links</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href="/about" className="hover:text-[#c9922a] transition-colors">Cabinet Structure</Link></li>
              <li><Link href="/contact" className="hover:text-[#c9922a] transition-colors">Join as Investor</Link></li>
              <li><Link href="/sermons" className="hover:text-[#c9922a] transition-colors">Loan Policy</Link></li>
              <li><Link href="/savings" className="hover:text-[#c9922a] transition-colors">Saving Cycles</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-white mb-8">Connect</h4>
            <ul className="space-y-6 text-sm font-light">
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-[#c9922a] mt-1 shrink-0" />
                <span>Kampala, Uganda</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-[#c9922a] shrink-0" />
                <span>Morriswise940@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[12px] font-light">© {new Date().getFullYear()} K-unity Finance SACCO. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="#" className="text-white/20 hover:text-[#c9922a] transition-colors"><Facebook className="h-5 w-5" /></Link>
            <Link href="#" className="text-white/20 hover:text-[#c9922a] transition-colors"><Twitter className="h-5 w-5" /></Link>
            <Link href="#" className="text-white/20 hover:text-[#c9922a] transition-colors"><Instagram className="h-5 w-5" /></Link>
            <Link href="#" className="text-white/20 hover:text-[#c9922a] transition-colors"><Youtube className="h-5 w-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
