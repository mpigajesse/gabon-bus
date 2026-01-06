'use client';

import { Trip } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bus, Clock, MapPin, Users, ChevronRight, Wifi, Zap, Star } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion } from 'framer-motion';

interface TripCardProps {
  trip: Trip;
  onSelect: (trip: Trip) => void;
}

export function TripCard({ trip, onSelect }: TripCardProps) {
  const departureDate = new Date(trip.departureTime);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Card className="group overflow-hidden border-zinc-100 bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl relative">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            {/* Left Side: Brand & Price - More Compact */}
            <div className="w-full sm:w-[160px] bg-zinc-50 p-4 flex flex-col justify-between border-b sm:border-b-0 sm:border-r border-zinc-100">
              <div className="space-y-1">
                <p className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Compagnie</p>
                <h3 className="text-base font-black text-zinc-900 leading-tight">{trip.companyName}</h3>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-2 w-2 text-accent fill-accent" />
                  ))}
                </div>
              </div>

              <div className="mt-4 sm:mt-0">
                <div className="text-xl font-black text-primary leading-none">
                  {trip.price.toLocaleString()} <span className="text-[10px] font-bold text-zinc-400">FCFA</span>
                </div>
              </div>
            </div>

            {/* Right Side: Details - More Compact */}
            <div className="flex-1 p-4 bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="relative pl-4 border-l-2 border-dashed border-zinc-200">
                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-primary" />
                    <div className="absolute -left-[5px] bottom-0 w-2 h-2 rounded-full bg-secondary" />
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-lg font-black text-zinc-950">{format(departureDate, 'HH:mm')}</p>
                        <p className="text-[10px] font-bold text-zinc-500">{trip.from}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-zinc-400">~1h30</p>
                        <p className="text-[10px] font-bold text-zinc-500">{trip.to}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-zinc-50 border border-zinc-100">
                      <Users className="h-3 w-3 text-zinc-400" />
                      <span className={`text-[10px] font-bold ${trip.availableSeats < 5 ? 'text-red-500' : 'text-primary'}`}>
                        {trip.availableSeats} places
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <Wifi className="h-3 w-3 text-zinc-300" />
                      <Zap className="h-3 w-3 text-zinc-300" />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => onSelect(trip)} 
                    size="sm"
                    className="w-full h-9 rounded-xl bg-primary text-white hover:bg-primary/90 font-black text-xs group/btn shadow-md transition-all"
                  >
                    CHOISIR
                    <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
