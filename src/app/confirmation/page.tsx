'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/components/BookingContext';
import { QRCode } from '@/components/QRCode';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Download, Home, Printer, Share2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ConfirmationPage() {
  const router = useRouter();
  const { currentBooking, resetBooking } = useBooking();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currentBooking) {
      router.push('/');
    }
  }, [currentBooking, router]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.success("Téléchargement du billet en cours...");
  };

  const handleNewBooking = () => {
    resetBooking();
    router.push('/');
  };

  if (!currentBooking) return null;

  return (
    <div className="container px-4 py-12 md:px-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6 text-green-600">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Réservation confirmée !</h1>
        <p className="text-zinc-500">
          Votre voyage de {currentBooking.trip.from} à {currentBooking.trip.to} est réservé. 
          Veuillez présenter ce QR Code à l'embarquement.
        </p>
      </div>

      <div ref={contentRef} className="print:shadow-none">
        <Card className="border-2 shadow-xl overflow-hidden mb-8 print:border-zinc-200">
          <div className="bg-primary h-3 w-full" />
          <CardHeader className="text-center border-b pb-8 bg-zinc-50/50 dark:bg-zinc-900/50">
            <CardTitle className="text-sm uppercase tracking-widest text-zinc-500 font-bold">Billet électronique</CardTitle>
            <p className="text-2xl font-black mt-2">ID: {currentBooking.id.toUpperCase()}</p>
          </CardHeader>
          <CardContent className="pt-8 space-y-8">
            <div className="flex justify-center">
              <QRCode 
                value={JSON.stringify({
                  id: currentBooking.id,
                  trip: `${currentBooking.trip.from}-${currentBooking.trip.to}`,
                  seats: currentBooking.seats,
                  passengers: currentBooking.passengers.length
                })} 
                title="Scannez pour valider le billet"
              />
            </div>

            <div className="grid grid-cols-2 gap-8 border-t border-dashed pt-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase text-zinc-400">Passagers</p>
                <div className="space-y-0.5">
                  {currentBooking.passengers.map((p, i) => (
                    <p key={i} className="text-sm font-bold">{p.firstName} {p.lastName}</p>
                  ))}
                </div>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[10px] font-bold uppercase text-zinc-400">Sièges</p>
                <p className="text-sm font-bold">{currentBooking.seats.join(', ')}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase text-zinc-400">Date & Heure</p>
                <p className="text-sm font-bold">
                  {new Date(currentBooking.trip.departureTime).toLocaleDateString('fr-FR')}
                </p>
                <p className="text-sm font-bold">
                  {new Date(currentBooking.trip.departureTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[10px] font-bold uppercase text-zinc-400">Bus</p>
                <p className="text-sm font-bold">{currentBooking.trip.busNumber}</p>
                <p className="text-xs text-zinc-500">{currentBooking.trip.companyName}</p>
              </div>
            </div>

            <div className="border-t pt-6 text-center">
              <p className="text-[10px] font-bold uppercase text-zinc-400 mb-1">Montant payé</p>
              <p className="text-xl font-black text-primary">{currentBooking.totalAmount.toLocaleString()} FCFA</p>
              <p className="text-xs text-zinc-500 mt-1">Payé via {currentBooking.paymentMethod === 'airtel_money' ? 'Airtel Money' : 'Moov Money'}</p>
            </div>
          </CardContent>
          <div className="bg-zinc-100 dark:bg-zinc-800 p-4 text-center">
            <p className="text-[10px] font-medium text-zinc-500 italic">
              Veuillez vous présenter à la gare 30 minutes avant le départ.
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print:hidden">
        <Button variant="outline" onClick={handlePrint} className="flex flex-col h-auto py-4 gap-2">
          <Printer className="h-5 w-5" />
          <span className="text-xs font-bold">Imprimer</span>
        </Button>
        <Button variant="outline" onClick={handleDownload} className="flex flex-col h-auto py-4 gap-2">
          <Download className="h-5 w-5" />
          <span className="text-xs font-bold">PDF</span>
        </Button>
        <Button variant="outline" className="flex flex-col h-auto py-4 gap-2">
          <Share2 className="h-5 w-5" />
          <span className="text-xs font-bold">Partager</span>
        </Button>
        <Button onClick={handleNewBooking} className="flex flex-col h-auto py-4 gap-2">
          <Home className="h-5 w-5" />
          <span className="text-xs font-bold">Accueil</span>
        </Button>
      </div>
    </div>
  );
}
