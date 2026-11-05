import axios from 'axios';
import { Trip, Booking } from './types';

/*
 * Mode démo : sans NEXT_PUBLIC_API_URL, aucune requête réseau n'est faite.
 * Avant, le navigateur du visiteur appelait http://localhost:8000 (sa propre
 * machine) et ne retombait sur les données fictives qu'après l'échec.
 * Les horaires fictifs sont générés pour la date demandée, donc jamais périmés.
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
export const MODE_DEMO = API_BASE_URL === '';

const api = axios.create({
  baseURL: API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const COMPAGNIES_FICTIVES = ['Estuaire Express', 'Gabon Trans', 'Ogooué Lignes', 'Équateur Voyages'];
const DEPARTS = ['06:30', '10:00', '14:30'];

// Empreinte stable d'une chaîne : mêmes trajets pour la même recherche.
function empreinte(texte: string): number {
  let h = 0;
  for (const c of texte) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

/** Horaires fictifs pour un trajet et une date (AAAA-MM-JJ). */
export function trajetsFictifs(from: string, to: string, date: string): Trip[] {
  if (!from || !to || from === to) return [];
  const jour = date || new Date().toISOString().split('T')[0];
  const base = empreinte(`${from}>${to}`);
  const dureeMin = 90 + (base % 8) * 45; // 1 h 30 à 6 h 45
  const prix = 5000 + (base % 9) * 2500;
  return DEPARTS.map((heure, i) => {
    const depart = new Date(`${jour}T${heure}:00`);
    const arrivee = new Date(depart.getTime() + dureeMin * 60_000);
    const graine = empreinte(`${from}>${to}>${jour}>${i}`);
    return {
      id: `${from}~${to}~${jour}~${i}`,
      from,
      to,
      departureTime: depart.toISOString(),
      arrivalTime: arrivee.toISOString(),
      price: prix + (i === 0 ? 0 : 500),
      availableSeats: 2 + (graine % 17),
      totalSeats: 18,
      busNumber: `GB-${String(100 + (graine % 900))}`,
      companyName: COMPAGNIES_FICTIVES[(base + i) % COMPAGNIES_FICTIVES.length],
    };
  });
}

function trajetFictifParId(id: string): Trip | null {
  const [from, to, jour, rang] = decodeURIComponent(id).split('~');
  if (!from || !to || !jour) return null;
  return trajetsFictifs(from, to, jour)[Number(rang) || 0] ?? null;
}

// Conservé pour compatibilité avec d'éventuels imports.
export const mockTrips: Trip[] = trajetsFictifs('Libreville', 'Ntoum', '');

export const getTrips = async (from: string, to: string, date: string): Promise<Trip[]> => {
  if (MODE_DEMO) return trajetsFictifs(from, to, date);
  try {
    const response = await api.get<Trip[]>('/trips', { params: { from, to, date } });
    return response.data;
  } catch (error) {
    console.error('Error fetching trips:', error);
    // Return mock data filtered by route for MVP demo
    return trajetsFictifs(from, to, date);
  }
};

export const getTripById = async (id: string): Promise<Trip | null> => {
  if (MODE_DEMO) return trajetFictifParId(id);
  try {
    const response = await api.get<Trip>(`/trips/${id}`);
    return response.data;
  } catch (error) {
    return trajetFictifParId(id);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reservationFictive = (bookingData: any): Booking => ({
  id: Math.random().toString(36).slice(2, 11),
  ...bookingData,
  status: 'pending',
  createdAt: new Date().toISOString(),
  qrCode: 'MOCK_QR_CODE_DATA',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createBooking = async (bookingData: any): Promise<Booking> => {
  if (MODE_DEMO) return reservationFictive(bookingData);
  try {
    const response = await api.post<Booking>('/bookings', bookingData);
    return response.data;
  } catch (error) {
    return reservationFictive(bookingData);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const processPayment = async (paymentData: any): Promise<{ success: boolean; message: string }> => {
  if (MODE_DEMO) return { success: true, message: 'Paiement simulé (démo)' };
  try {
    const response = await api.post('/payment', paymentData);
    return response.data;
  } catch (error) {
    return { success: true, message: 'Payment simulated successfully' };
  }
};

export const getBookingById = async (id: string): Promise<Booking | null> => {
  if (MODE_DEMO) return null;
  try {
    const response = await api.get<Booking>(`/bookings/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export default api;
