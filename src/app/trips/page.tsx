'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { dateLocale, getTrips } from '@/lib/api';
import { TripCard } from '@/components/TripCard';
import { useBooking } from '@/components/BookingContext';
import { useRouter } from 'next/navigation';
import { Trip } from '@/lib/types';
import { Bus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TripsPage() {
  const router = useRouter();
  const { setSelectedTrip } = useBooking();
  const [trips, setTrips] = useState<Trip[]>([]);

  // Calculé dans le navigateur : l'ancienne liste importée était évaluée au
  // build de cette page statique, donc figée au jour du déploiement. En fin
  // de journée, on montre les départs du lendemain.
  useEffect(() => {
    const charger = async () => {
      let resultats = await getTrips('Libreville', 'Ntoum', dateLocale());
      if (resultats.length === 0) resultats = await getTrips('Libreville', 'Ntoum', dateLocale(1));
      setTrips(resultats);
    };
    charger();
  }, []);

  const handleSelectTrip = (trip: Trip) => {
    setSelectedTrip(trip);
    router.push(`/trips/${trip.id}`);
  };

  return (
    <div className="container px-4 py-12 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Tous les trajets</h1>
          <p className="text-zinc-500">Consultez tous les départs disponibles à travers le Gabon.</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2" asChild>
          <Link href="/">
            <Filter className="h-4 w-4" />
            Filtrer les résultats
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} onSelect={handleSelectTrip} />
        ))}
      </div>

      <section className="mt-20 p-12 bg-primary/5 rounded-3xl border-2 border-primary/10 text-center">
        <Bus className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas votre trajet ?</h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-8">
          Nous étendons progressivement notre réseau vers les autres provinces du Gabon. 
          Revenez bientôt pour plus de destinations !
        </p>
        <Button variant="secondary" asChild>
          <Link href="/aide">Être informé des nouvelles lignes</Link>
        </Button>
      </section>
    </div>
  );
}
