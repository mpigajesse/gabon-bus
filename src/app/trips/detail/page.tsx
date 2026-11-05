'use client';

import { Suspense, useEffect, useState } from 'react';
import { formaterMontant } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useBooking } from '@/components/BookingContext';
import { getTripById } from '@/lib/api';
import { SeatSelector } from '@/components/SeatSelector';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bus, Clock, MapPin, ArrowRight, ChevronLeft, Ticket, QrCode } from 'lucide-react';
import { toast } from 'sonner';

// Page d'un trajet : /trips/detail?id=… (et non plus /trips/[id]).
// Les trajets de la démo sont générés pour chaque date : leurs identifiants
// ne peuvent pas être connus au build, or le site est publié en export
// statique (voir next.config.ts). Un paramètre de requête n'a pas ce besoin.
export default function TripDetailsPage() {
  return (
    <Suspense fallback={null}>
      <TripDetails />
    </Suspense>
  );
}

function TripDetails() {
  const router = useRouter();
  const id = useSearchParams().get('id') ?? '';
  const { selectedTrip, setSelectedTrip, selectedSeats, setSelectedSeats, isRehydrated } = useBooking();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isRehydrated) return;

    async function loadTrip() {
      // If we already have the trip in context and it matches the ID, no need to fetch
      if (selectedTrip && selectedTrip.id === id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const trip = await getTripById(id as string);
        if (trip) {
          setSelectedTrip(trip);
        } else {
          toast.error("Trajet introuvable.");
          router.push('/');
        }
      } catch (error) {
        toast.error("Erreur de chargement.");
        router.push('/');
      } finally {
        setLoading(false);
      }
    }
    loadTrip();
  }, [id, isRehydrated, selectedTrip?.id, setSelectedTrip, router]);

  const handleSeatToggle = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      if (selectedSeats.length < 4) {
        setSelectedSeats([...selectedSeats, seatId]);
      } else {
        toast.warning("Vous ne pouvez pas sélectionner plus de 4 sièges.");
      }
    }
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      toast.error("Veuillez sélectionner au moins un siège.");
      return;
    }
    router.push('/booking');
  };

  if (loading) {
    return (
      <div className="container py-20 flex justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-zinc-500 font-medium">Chargement des détails...</p>
        </div>
      </div>
    );
  }

  if (!selectedTrip) return null;

  return (
    <div className="container px-4 py-8 md:px-8 max-w-5xl mx-auto">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Retour
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">Sélectionnez vos sièges</h1>
            <p className="text-zinc-500">Choisissez l'emplacement qui vous convient le mieux dans le bus.</p>
            
            <Card className="border-2 shadow-sm overflow-hidden">
              <CardContent className="pt-10 pb-10">
                <SeatSelector 
                  totalSeats={selectedTrip.totalSeats}
                  availableSeats={selectedTrip.availableSeats}
                  selectedSeats={selectedSeats}
                  onSeatToggle={handleSeatToggle}
                />
              </CardContent>
            </Card>
          </section>
        </div>

          <div className="space-y-6">
            <div className="sticky top-24">
              <div className="relative bg-white dark:bg-zinc-950 rounded-3xl shadow-2xl border-2 border-zinc-100 dark:border-zinc-800 overflow-hidden">
                {/* Header Ticket Section */}
                <div className="bg-primary p-6 text-white">
                  <div className="flex justify-between items-center mb-4">
                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                      <Bus className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-80">Compagnie</p>
                      <p className="text-lg font-black italic tracking-tighter">{selectedTrip.companyName}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-80 leading-none">Départ</p>
                      <h3 className="text-2xl font-black">{selectedTrip.from}</h3>
                    </div>
                    <ArrowRight className="h-5 w-5 mb-1 opacity-50" />
                    <div className="text-right space-y-1">
                      <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-80 leading-none">Arrivée</p>
                      <h3 className="text-2xl font-black">{selectedTrip.to}</h3>
                    </div>
                  </div>
                </div>

                {/* Perforation Line */}
                <div className="relative h-6 bg-white dark:bg-zinc-950 flex items-center">
                  <div className="absolute left-0 -translate-x-1/2 w-6 h-6 rounded-full bg-zinc-50 dark:bg-zinc-900 border-r-2 border-zinc-100 dark:border-zinc-800" />
                  <div className="w-full border-t-2 border-dashed border-zinc-100 dark:border-zinc-800 mx-4" />
                  <div className="absolute right-0 translate-x-1/2 w-6 h-6 rounded-full bg-zinc-50 dark:bg-zinc-900 border-l-2 border-zinc-100 dark:border-zinc-800" />
                </div>

                {/* Ticket Details Body */}
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Date</p>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        <p className="text-sm font-bold">
                          {new Date(selectedTrip.departureTime).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Heure</p>
                      <p className="text-sm font-bold">
                        {new Date(selectedTrip.departureTime).toLocaleTimeString('fr-FR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Bus</p>
                      <p className="text-sm font-bold">#{selectedTrip.busNumber}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Classe</p>
                      <p className="text-sm font-bold">Standard</p>
                    </div>
                  </div>

                  <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Sièges</p>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedSeats.length > 0 ? (
                            selectedSeats.map(seat => (
                              <span key={seat} className="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm">
                                {seat}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-zinc-400 font-medium italic">Sélectionnez vos sièges...</span>
                          )}
                        </div>
                      </div>
                      <Ticket className="h-5 w-5 text-zinc-200" />
                    </div>
                    
                    <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                      <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Total à payer</p>
                      <p className="text-xl font-black text-primary tracking-tighter">
                        {formaterMontant(selectedTrip.price * selectedSeats.length)} <span className="text-[10px] font-bold">FCFA</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center py-2 opacity-10">
                    <QrCode className="h-16 w-16" />
                  </div>

                  <Button 
                    onClick={handleContinue} 
                    className="w-full h-14 text-base font-black uppercase tracking-widest shadow-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-95 group" 
                    disabled={selectedSeats.length === 0}
                  >
                    Réserver
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
