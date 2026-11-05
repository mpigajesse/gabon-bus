'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TripCard } from '@/components/TripCard';
import { dateLocale, getTrips } from '@/lib/api';
import { Trip } from '@/lib/types';
import { useBooking } from '@/components/BookingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Calendar, Bus, ArrowRightLeft, ShieldCheck, Smartphone, Zap, ChevronRight, Globe, TrendingUp, Award, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function HomePage() {
  const router = useRouter();
  const { setSelectedTrip } = useBooking();
  const [from, setFrom] = useState('Libreville');
  const [to, setTo] = useState('Ntoum');
  const [date, setDate] = useState('');
  const [mounted, setMounted] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchInitialTrips = async () => {
      setLoading(true);
      try {
        // En fin de journée il ne reste plus de départ : on propose ceux de
        // demain plutôt qu'une liste vide sous « Prochains départs ».
        let jour = dateLocale();
        let results = await getTrips(from, to, jour);
        if (results.length === 0) {
          jour = dateLocale(1);
          results = await getTrips(from, to, jour);
        }
        setDate(jour);
        setTrips(results);
      } catch (error) {
        console.error("Initial fetch failed", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialTrips();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const results = await getTrips(from, to, date);
      setTrips(results);
      setHasSearched(true);
      if (results.length === 0) {
        toast.info("Aucun trajet trouvé pour cette date.");
      }
      const resultsSection = document.getElementById('search-results');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      toast.error("Erreur lors de la recherche des trajets.");
    } finally {
      setLoading(false);
    }
  };

  // Carte « destination populaire » : lance la recherche vers cette ville.
  const rechercherVers = async (ville: string) => {
    const depart = from === ville ? 'Libreville' : from;
    const arrivee = ville === depart ? 'Ntoum' : ville;
    setFrom(depart);
    setTo(arrivee);
    setLoading(true);
    try {
      const jour = date || dateLocale();
      let results = await getTrips(depart, arrivee, jour);
      let jourRetenu = jour;
      if (results.length === 0) {
        jourRetenu = dateLocale(1);
        results = await getTrips(depart, arrivee, jourRetenu);
      }
      setDate(jourRetenu);
      setTrips(results);
      setHasSearched(true);
      document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTrip = (trip: Trip) => {
    setSelectedTrip(trip);
    router.push(`/trips/detail?id=${encodeURIComponent(trip.id)}`);
  };

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[75vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1523805081446-ed9a768297a0?auto=format&fit=crop&q=80&w=2000" 
            alt="Paysage du Gabon" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-accent/10 to-secondary/80 z-10 opacity-70" />
          <div className="absolute inset-0 bg-black/30 z-10" />
        </div>

        <div className="container relative z-20 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl mb-6"
            >
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
              </div>
              <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">Gabon Transport Excellence</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-[6.5rem] font-black tracking-tighter text-white mb-6 leading-[0.9]"
            >
              L'AVENTURE <br />
              <span className="text-accent">GABONAISE</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg md:text-xl text-white/90 mb-10 max-w-xl leading-relaxed font-medium"
            >
              Voyagez en toute sérénité à travers le pays. Confort premium, sécurité maximale et réservation instantanée.
            </motion.p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-30 px-4 translate-y-1/2">
          <div className="container max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2rem] shadow-[0_20px_80px_rgba(0,0,0,0.15)] border border-zinc-100 p-2"
            >
              <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-center gap-2">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 w-full">
                  <div className="relative group px-5 py-3 md:py-4 border-b md:border-b-0 md:border-r border-zinc-100 hover:bg-zinc-50 transition-colors rounded-t-[1.5rem] md:rounded-l-[1.5rem] md:rounded-tr-none">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-primary mb-1 block">Départ</Label>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <Select value={from} onValueChange={setFrom}>
                        <SelectTrigger className="border-none bg-transparent p-0 h-auto text-lg font-black text-zinc-950 focus:ring-0 shadow-none">
                          <SelectValue placeholder="Départ" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-zinc-200">
                          <SelectItem value="Libreville">Libreville</SelectItem>
                          <SelectItem value="Port-Gentil">Port-Gentil</SelectItem>
                          <SelectItem value="Franceville">Franceville</SelectItem>
                          <SelectItem value="Oyem">Oyem</SelectItem>
                          <SelectItem value="Moanda">Moanda</SelectItem>
                          <SelectItem value="Mouila">Mouila</SelectItem>
                          <SelectItem value="Lambaréné">Lambaréné</SelectItem>
                          <SelectItem value="Makokou">Makokou</SelectItem>
                          <SelectItem value="Koulamoutou">Koulamoutou</SelectItem>
                          <SelectItem value="Tchibanga">Tchibanga</SelectItem>
                          <SelectItem value="Ntoum">Ntoum</SelectItem>
                          <SelectItem value="Bitam">Bitam</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="relative group px-5 py-3 md:py-4 border-b md:border-b-0 md:border-r border-zinc-100 hover:bg-zinc-50 transition-colors">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 hidden md:block">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon" 
                        onClick={swapLocations}
                        className="rounded-full h-8 w-8 bg-white border border-zinc-100 text-primary shadow-sm"
                      >
                        <ArrowRightLeft className="h-3 w-3" />
                      </Button>
                    </div>
                    <Label className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1 block">Arrivée</Label>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <Select value={to} onValueChange={setTo}>
                        <SelectTrigger className="border-none bg-transparent p-0 h-auto text-lg font-black text-zinc-950 focus:ring-0 shadow-none">
                          <SelectValue placeholder="Arrivée" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-zinc-200">
                          <SelectItem value="Libreville">Libreville</SelectItem>
                          <SelectItem value="Port-Gentil">Port-Gentil</SelectItem>
                          <SelectItem value="Franceville">Franceville</SelectItem>
                          <SelectItem value="Oyem">Oyem</SelectItem>
                          <SelectItem value="Moanda">Moanda</SelectItem>
                          <SelectItem value="Mouila">Mouila</SelectItem>
                          <SelectItem value="Lambaréné">Lambaréné</SelectItem>
                          <SelectItem value="Makokou">Makokou</SelectItem>
                          <SelectItem value="Koulamoutou">Koulamoutou</SelectItem>
                          <SelectItem value="Tchibanga">Tchibanga</SelectItem>
                          <SelectItem value="Ntoum">Ntoum</SelectItem>
                          <SelectItem value="Bitam">Bitam</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="relative group px-5 py-3 md:py-4 hover:bg-zinc-50 transition-colors rounded-b-[1.5rem] md:rounded-r-[1.5rem] md:rounded-bl-none">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-accent mb-1 block">Date</Label>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <Input 
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border-none bg-transparent p-0 h-auto text-lg font-black text-zinc-950 focus-visible:ring-0 shadow-none cursor-pointer"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full lg:w-48 h-14 md:h-16 text-lg font-black rounded-[1.2rem] bg-primary text-white hover:bg-primary/90 transition-all shadow-lg" 
                  disabled={loading}
                >
                  {loading ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <span className="flex items-center gap-2">
                      TROUVER
                      <ChevronRight className="h-5 w-5" />
                    </span>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="h-2 w-full flex">
        <div className="flex-1 bg-primary" />
        <div className="flex-1 bg-accent" />
        <div className="flex-1 bg-secondary" />
      </div>

      <section id="destinations" className="pt-32 pb-20 bg-zinc-50">
        <div className="container px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div className="space-y-3">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-zinc-950 uppercase">
                DESTINATIONS <span className="text-primary">POPULAIRES</span>
              </h2>
              <p className="text-zinc-500 text-lg font-medium">Découvrez les joyaux du Gabon avec nos trajets réguliers.</p>
            </div>
            <Button
              variant="ghost"
              className="text-primary font-black uppercase tracking-widest flex items-center gap-2 hover:bg-primary/5"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Voir tout <ArrowRightLeft className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { city: "Lambaréné", img: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800", price: "15 000" },
              { city: "Port-Gentil", img: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&q=80&w=800", price: "25 000" },
              { city: "Franceville", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800", price: "30 000" },
            ].map((dest, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`Voir les trajets vers ${dest.city}`}
                onClick={() => rechercherVers(dest.city)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    rechercherVers(dest.city);
                  }
                }}
              >
                <div className="relative aspect-[16/10] md:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lg">
                  <img src={dest.img} alt={dest.city} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white/70 text-[10px] font-black uppercase tracking-widest mb-1">À partir de {dest.price} FCFA</p>
                    <h3 className="text-2xl font-black text-white">{dest.city}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 container px-4 md:px-8 max-w-7xl mx-auto flex-grow scroll-mt-40" id="search-results">
        {(!hasSearched && trips.length === 0) ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-zinc-100 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
               <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-xl mb-2">
                  <Bus className="h-10 w-10 text-primary" />
               </div>
               <h2 className="text-3xl md:text-4xl font-black text-zinc-950 tracking-tighter uppercase">PRÊT POUR LE DÉPART ?</h2>
               <p className="text-zinc-500 text-lg font-medium leading-relaxed">
                 Utilisez la barre de recherche ci-dessus pour trouver les meilleurs trajets <br /> à travers les 9 provinces du Gabon.
               </p>
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-100 pb-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {hasSearched ? `${trips.length} trajets trouvés` : `Prochains départs disponibles`}
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-950 leading-none uppercase">
                  {hasSearched ? (
                    <>DE <span className="text-primary">{from}</span> <br /> À <span className="text-secondary">{to}</span></>
                  ) : (
                    <>BILLETS <br /><span className="text-primary">DISPONIBLES</span></>
                  )}
                </h2>
                <div className="flex items-center gap-3 text-zinc-500 text-base font-bold">
                  <Calendar className="h-5 w-5 text-accent" />
                  <span>{date ? new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '...'}</span>
                </div>
              </div>
            </div>

            {trips.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {trips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} onSelect={handleSelectTrip} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-zinc-50 rounded-[3rem] border border-zinc-100">
                <Zap className="h-12 w-12 text-accent mx-auto mb-6" />
                <h3 className="text-3xl font-black text-zinc-950 tracking-tight uppercase">AUCUN TRAJET TROUVÉ</h3>
                <p className="text-zinc-500 mt-3 text-lg font-medium">Désolé, il n'y a pas de départ pour cette destination à cette date.</p>
                <Button variant="link" className="text-primary mt-4 font-bold" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Essayer une autre date
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </section>

      {/* Expert Design Section: Gabon Pride */}
      <section className="py-24 bg-white text-zinc-950 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-secondary/5 blur-[120px] rounded-full" />
        
        <div className="container px-4 md:px-8 max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="w-12 h-1 flex mb-6">
                  <div className="flex-1 bg-primary" />
                  <div className="flex-1 bg-accent" />
                  <div className="flex-1 bg-secondary" />
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase">
                  FIERTÉ <br />
                  <span className="text-primary">GABONAISE</span> <br />
                  <span className="text-accent">D'ABORD</span>
                </h2>
                <p className="text-zinc-500 text-lg md:text-xl leading-relaxed max-w-xl font-medium">
                  Nous redéfinissons le voyage au Gabon avec une technologie de pointe et un service digne des standards internationaux.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Billetterie 2.0", desc: "Réservez depuis votre salon, payez en mobile money.", icon: <Smartphone className="text-primary" /> },
                  { title: "Confort Royal", desc: "Nos bus sont équipés du Wi-Fi et de prises USB.", icon: <Award className="text-accent" /> },
                  { title: "Sécurité Totale", desc: "Suivi GPS en temps réel pour chaque voyage.", icon: <ShieldCheck className="text-secondary" /> },
                  { title: "Meilleur Prix", desc: "Des tarifs transparents, sans frais cachés.", icon: <TrendingUp className="text-primary" /> },
                ].map((item, i) => (
                  <div key={i} className="group p-6 rounded-[1.5rem] bg-zinc-50 border border-zinc-100 hover:bg-white hover:border-primary/20 hover:shadow-xl transition-all">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-black mb-2 uppercase">{item.title}</h4>
                    <p className="text-zinc-500 text-base leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[3/4] rounded-[3rem] overflow-hidden border border-zinc-100 shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000" 
                  alt="Car de transport interprovincial au Gabon" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Flag Theme */}
      <section className="py-16 bg-zinc-50">
        <div className="container px-4 md:px-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-[3rem] p-10 md:p-16 text-center border-2 border-primary/20 relative overflow-hidden shadow-2xl shadow-primary/10">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary rounded-full blur-[80px] translate-x-1/2 translate-y-1/2" />
            </div>
            
            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                 <Globe className="h-4 w-4 text-primary" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Rejoignez la révolution</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-none uppercase text-zinc-950">
                VOTRE PROCHAIN <br /> <span className="text-primary">DÉPART</span> EST ICI
              </h2>
              <p className="text-zinc-500 text-base md:text-lg max-w-md mx-auto font-medium leading-relaxed">
                Réservez votre place en 2 minutes et voyagez comme jamais auparavant à travers le Gabon.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  size="lg" 
                  className="h-14 px-10 rounded-2xl bg-primary text-white hover:bg-primary/90 font-black text-base shadow-xl transition-all" 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  RÉSERVER MAINTENANT
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14 px-10 rounded-2xl border-zinc-200 text-zinc-600 hover:bg-zinc-50 font-black text-base"
                  onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  NOS TARIFS
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
