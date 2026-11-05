'use client';

import { useEffect, useState } from 'react';
import { formaterMontant } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/components/BookingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Phone, ArrowRight, ChevronLeft, ShieldCheck, Smartphone, Bus, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { createBooking } from '@/lib/api';

export default function PaymentPage() {
  const router = useRouter();
  const { selectedTrip, selectedSeats, passengers, setCurrentBooking, isRehydrated } = useBooking();
  const [method, setMethod] = useState<'airtel_money' | 'moov_money'>('airtel_money');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isRehydrated) return;

    if (!selectedTrip || selectedSeats.length === 0 || passengers.length === 0) {
      toast.error("Session expirée ou informations manquantes.");
      router.push('/');
    }
  }, [isRehydrated, selectedTrip?.id, selectedSeats.length, passengers.length, router]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      toast.error("Veuillez saisir votre numéro de téléphone mobile money.");
      return;
    }

    setLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const bookingData = {
        tripId: selectedTrip?.id,
        trip: selectedTrip,
        seats: selectedSeats,
        passengers: passengers,
        totalAmount: (selectedTrip?.price || 0) * selectedSeats.length,
        paymentMethod: method,
        paymentPhone: phone,
      };

      const booking = await createBooking(bookingData);
      setCurrentBooking(booking);
      
      toast.success("Paiement validé ! Votre billet a été généré.");
      router.push('/confirmation');
    } catch (error) {
      toast.error("Erreur lors du traitement du paiement.");
    } finally {
      setLoading(false);
    }
  };

  if (!isRehydrated) {
    return (
      <div className="container py-20 flex justify-center">
        <div className="h-12 w-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
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
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Paiement</h1>
          <p className="text-zinc-500">Choisissez votre mode de paiement mobile money pour finaliser la réservation.</p>
          
          <Card className="border-2 shadow-sm overflow-hidden">
            <CardHeader className="bg-zinc-50 dark:bg-zinc-900 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Mode de paiement
              </CardTitle>
              <CardDescription>Airtel Money et Moov Money uniquement (Gabon)</CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <form onSubmit={handlePayment} className="space-y-8">
                <RadioGroup 
                  value={method} 
                  onValueChange={(v) => setMethod(v as any)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <Label
                    htmlFor="airtel"
                    className={`flex items-center justify-between p-5 rounded-xl border-2 cursor-pointer transition-all ${
                      method === 'airtel_money' ? 'border-primary bg-primary/5 shadow-md' : 'border-zinc-100 hover:border-zinc-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-sm shadow-inner">
                        AM
                      </div>
                      <div>
                        <p className="font-bold">Airtel Money</p>
                        <p className="text-xs text-zinc-500 font-medium">Validation par code USSD</p>
                      </div>
                    </div>
                    <RadioGroupItem value="airtel_money" id="airtel" className="border-zinc-300" />
                  </Label>

                  <Label
                    htmlFor="moov"
                    className={`flex items-center justify-between p-5 rounded-xl border-2 cursor-pointer transition-all ${
                      method === 'moov_money' ? 'border-primary bg-primary/5 shadow-md' : 'border-zinc-100 hover:border-zinc-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-inner">
                        MM
                      </div>
                      <div>
                        <p className="font-bold">Moov Money</p>
                        <p className="text-xs text-zinc-500 font-medium">Validation par code USSD</p>
                      </div>
                    </div>
                    <RadioGroupItem value="moov_money" id="moov" className="border-zinc-300" />
                  </Label>
                </RadioGroup>

                <div className="space-y-4 pt-6 border-t border-zinc-100">
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-base font-bold">
                      Numéro de téléphone {method === 'airtel_money' ? 'Airtel' : 'Moov'}
                    </Label>
                    <div className="relative">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                      <Input 
                        id="phone" 
                        placeholder="Ex: 077 00 00 00" 
                        className="pl-12 h-14 text-xl font-bold border-zinc-200 focus:border-primary focus:ring-primary/20" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required 
                      />
                    </div>
                    <p className="text-xs text-zinc-500 bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                      <strong>Note :</strong> Une fenêtre contextuelle s'affichera sur votre téléphone pour confirmer le paiement de {formaterMontant(selectedTrip.price * selectedSeats.length)} FCFA.
                    </p>
                  </div>
                </div>

                <div className="bg-green-50/50 dark:bg-green-900/20 p-4 rounded-xl flex gap-3 items-start border border-green-100 dark:border-green-900/30">
                  <ShieldCheck className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-green-800 dark:text-green-400 leading-relaxed">
                    Votre transaction est <strong>100% sécurisée</strong> par cryptage de bout en bout. 
                    GabonBus n'a jamais accès à votre code secret mobile money.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-16 text-xl font-black shadow-xl transition-all active:scale-95" 
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <div className="h-6 w-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      Traitement sécurisé...
                    </span>
                  ) : (
                    `Payer ${formaterMontant(selectedTrip.price * selectedSeats.length)} FCFA`
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-24 border-2 shadow-lg overflow-hidden">
            <CardHeader className="bg-primary/5 border-b py-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bus className="h-5 w-5 text-primary" />
                Résumé final
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
              
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Détails passagers</p>
                <div className="space-y-3">
                  {passengers.map((p, i) => (
                    <div key={i} className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50 p-2 rounded-lg border border-zinc-100 dark:border-zinc-800">
                      <div className="flex items-center gap-2">
                        <div className="bg-zinc-200 dark:bg-zinc-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                          {selectedSeats[i]}
                        </div>
                        <p className="text-xs font-semibold">{p.firstName} {p.lastName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center bg-zinc-100/50 dark:bg-zinc-900/50 -mx-6 px-6 py-4">
                  <span className="text-sm font-bold text-zinc-600">Montant total</span>
                  <span className="text-xl font-black text-primary">
                    {formaterMontant(selectedTrip.price * selectedSeats.length)} FCFA
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
