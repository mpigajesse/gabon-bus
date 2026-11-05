import Link from 'next/link';
import { Bus, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-white pt-24 pb-12">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
                <Bus className="h-6 w-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter font-heading uppercase">
                GABON<span className="text-primary">BUS</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              L'excellence du transport interprovincial au Gabon. Nous connectons les familles et les opportunités à travers les 9 provinces.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-8">Navigation</h3>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><Link href="/" className="hover:text-white transition-colors">Rechercher un trajet</Link></li>
              <li><Link href="/#destinations" className="hover:text-white transition-colors">Nos Destinations</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Administration</Link></li>
              <li><Link href="/confirmation" className="hover:text-white transition-colors">Mon billet</Link></li>
            </ul>
          </div>
          
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-8">Support</h3>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><Link href="/aide" className="hover:text-white transition-colors">Centre d'Aide</Link></li>
                <li><Link href="/aide" className="hover:text-white transition-colors">Réservations</Link></li>
                <li><Link href="/aide" className="hover:text-white transition-colors">Confidentialité</Link></li>
                <li><Link href="/aide" className="hover:text-white transition-colors">Conditions</Link></li>
              </ul>
            </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-8">Contact</h3>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>Libreville, Gabon</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+241 01 00 00 00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>contact@gabonbus.ga</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
               <div className="flex gap-1">
                 <div className="w-2 h-2 rounded-full bg-primary"></div>
                 <div className="w-2 h-2 rounded-full bg-accent"></div>
                 <div className="w-2 h-2 rounded-full bg-secondary"></div>
               </div>
             <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
               Union • Travail • Justice
             </p>
          </div>
          
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest" suppressHydrationWarning>
              © {new Date().getFullYear()} GabonBus. Fièrement développé au Gabon.
            </p>
        </div>
      </div>
    </footer>
  );
}
