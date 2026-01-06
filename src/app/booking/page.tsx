'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/components/BookingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, ArrowRight, ChevronLeft, Trash2, Plus, Bus, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { PassengerInfo } from '@/lib/types';

export default function BookingPage() {
  const router = useRouter();
  const { selectedTrip, selectedSeats, passengers, setPassengers, isRehydrated } = useBooking();
  const [formData, setFormData] = useState<PassengerInfo[]>([]);

    useEffect(() => {
      if (!isRehydrated) return;
  
      if (!selectedTrip || selectedSeats.length === 0) {
        toast.error("Session expirée ou trajet non sélectionné.");
        router.push('/');
        return;
      }
  
      // Initialize form with number of selected seats
      if (passengers.length === selectedSeats.length) {
        setFormData(passengers);
      } else {
        const initialData = selectedSeats.map((_, i) => ({
          firstName: passengers[i]?.firstName || '',
          lastName: passengers[i]?.lastName || '',
          phone: passengers[i]?.phone || '',
          email: passengers[i]?.email || '',
        }));
        setFormData(initialData);
      }
    }, [isRehydrated, selectedTrip?.id, selectedSeats.length, router]);

  const handleInputChange = (index: number, field: keyof PassengerInfo, value: string) => {
    const updatedData = [...formData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setFormData(updatedData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const isValid = formData.every(p => p.firstName && p.lastName && p.phone);
    if (!isValid) {
      toast.error("Veuillez remplir toutes les informations obligatoires.");
      return;
    }

    setPassengers(formData);
    router.push('/payment');
  };

  if (!isRehydrated) {
    return (
      <div className="container py-20 flex justify-center">
        <div className="h-12 w-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!selectedTrip || selectedSeats.length === 0) return null;

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
        <div className="lg:col-span-2">
          <section className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Informations passagers</h1>
            <p className="text-zinc-500">Veuillez saisir les informations pour chaque passager.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {formData.map((passenger, index) => (
                <Card key={index} className="border-2 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="bg-zinc-50 dark:bg-zinc-900 py-4 border-b">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <div className="bg-primary/10 p-1.5 rounded-full">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      Passager {index + 1} — <span className="text-primary">Siège {selectedSeats[index]}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor={`firstName-${index}`} className="text-sm font-semibold">Prénom *</Label>
                      <Input 
                        id={`firstName-${index}`} 
                        placeholder="Ex: Jean" 
                        value={passenger.firstName}
                        onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                        className="h-11 border-zinc-200 focus:border-primary focus:ring-primary/20"
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`lastName-${index}`} className="text-sm font-semibold">Nom *</Label>
                      <Input 
                        id={`lastName-${index}`} 
                        placeholder="Ex: Mba" 
                        value={passenger.lastName}
                        onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                        className="h-11 border-zinc-200 focus:border-primary focus:ring-primary/20"
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`phone-${index}`} className="text-sm font-semibold">Téléphone *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                        <Input 
                          id={`phone-${index}`} 
                          placeholder="077 00 00 00" 
                          className="pl-10 h-11 border-zinc-200 focus:border-primary focus:ring-primary/20"
                          value={passenger.phone}
                          onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                          required 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`email-${index}`} className="text-sm font-semibold">Email (Optionnel)</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                        <Input 
                          id={`email-${index}`} 
                          placeholder="votre@email.com" 
                          className="pl-10 h-11 border-zinc-200 focus:border-primary focus:ring-primary/20"
                          value={passenger.email}
                          onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button type="submit" className="w-full h-14 text-lg font-bold shadow-lg mt-4" size="lg">
                Continuer vers le paiement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </section>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-24 border-2 shadow-lg overflow-hidden">
            <CardHeader className="bg-primary/5 border-b py-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bus className="h-5 w-5 text-primary" />
                Résumé du voyage
              </CardTitle>
              <CardDescription className="font-medium text-primary/80">{selectedTrip.companyName}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-primary/10 p-2 rounded-full text-primary">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider mb-1">Itinéraire</p>
                  <p className="text-sm font-bold">{selectedTrip.from} → {selectedTrip.to}</p>
                  <p className="text-xs text-zinc-500 font-medium">
                    {new Date(selectedTrip.departureTime).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 bg-primary/10 p-2 rounded-full text-primary">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider mb-1">Départ</p>
                  <p className="text-sm font-bold">
                    {new Date(selectedTrip.departureTime).toLocaleTimeString('fr-FR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                  <p className="text-xs text-zinc-500 font-medium">Bus n° {selectedTrip.busNumber}</p>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-xs items-center">
                  <span className="text-zinc-500 font-medium uppercase tracking-tighter">Sièges :</span>
                  <div className="flex flex-wrap justify-end gap-1">
                    {selectedSeats.map(seat => (
                      <span key={seat} className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded">
                        {seat}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center bg-zinc-50 -mx-6 px-6 py-4 mt-2">
                  <span className="text-sm font-bold text-zinc-600">Total à payer</span>
                  <span className="text-lg font-black text-primary">
                    {(selectedTrip.price * selectedSeats.length).toLocaleString()} FCFA
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
