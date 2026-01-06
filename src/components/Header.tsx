'use client';

import Link from 'next/link';
import { Bus, User, LogOut, LayoutDashboard, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const user = { name: 'Admin GabonBus', role: 'admin' };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      {/* National Flag Gradient */}
      <div className="absolute top-0 left-0 w-full h-1.5 flex">
        <div className="flex-1 bg-primary" />
        <div className="flex-1 bg-accent" />
        <div className="flex-1 bg-secondary" />
      </div>
      
      <div className="container flex h-20 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white transition-transform group-hover:scale-110">
            <Bus className="h-6 w-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-zinc-950 font-heading">
            GABON<span className="text-primary">BUS</span>
          </span>
        </Link>

          <nav className="hidden md:flex items-center gap-8">
              {[
                { label: 'Rechercher', href: '/' },
                { label: 'Récupérer mon billet', href: '/tickets/retrieve' },
                { label: 'Aide', href: '/aide' },
              ].map((link) => (
              <Link 
                key={link.label}
                href={link.href} 
                className="text-sm font-black uppercase tracking-widest text-zinc-500 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            {user && (user.role === 'admin' || user.role === 'transporter') && (
              <Link href="/dashboard" className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Tableau de bord
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-zinc-400 mr-4">
              <Globe className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">FR | GAB</span>
            </div>
            
            {user && (user.role === 'admin' || user.role === 'transporter') ? (
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-2xl border-2 border-zinc-100 p-2 h-12 w-12 hover:bg-zinc-50 transition-all">
                      <User className="h-6 w-6 text-zinc-900" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 p-3 rounded-2xl border-zinc-100 shadow-2xl">
                    <div className="px-2 py-3 mb-2">
                      <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">Utilisateur</p>
                      <p className="font-bold text-zinc-900">{user.name}</p>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{user.role}</p>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-zinc-50 font-bold">
                        <LayoutDashboard className="h-5 w-5 text-primary" />
                        Tableau de bord
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500 flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-red-50 font-bold">
                      <LogOut className="h-5 w-5" />
                      Déconnexion
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="ghost" className="font-black text-xs uppercase tracking-widest px-6 h-12 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Accès Pro
                </Button>
              </Link>
            )}
          </div>
      </div>
    </header>
  );
}
