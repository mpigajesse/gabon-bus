import axios from 'axios';
import { Trip, Booking } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock data
export const mockTrips: Trip[] = [
  {
    id: '1',
    from: 'Libreville',
    to: 'Ntoum',
    departureTime: '2025-05-20T08:00:00',
    arrivalTime: '2025-05-20T09:30:00',
    price: 5000,
    availableSeats: 12,
    totalSeats: 18,
    busNumber: 'LBV-001',
    companyName: 'Estuaire Express',
  },
  {
    id: '2',
    from: 'Ntoum',
    to: 'Libreville',
    departureTime: '2025-05-20T14:00:00',
    arrivalTime: '2025-05-20T15:30:00',
    price: 5000,
    availableSeats: 5,
    totalSeats: 18,
    busNumber: 'LBV-002',
    companyName: 'Estuaire Express',
  },
  {
    id: '3',
    from: 'Libreville',
    to: 'Ntoum',
    departureTime: '2025-05-21T10:00:00',
    arrivalTime: '2025-05-21T11:30:00',
    price: 4500,
    availableSeats: 18,
    totalSeats: 18,
    busNumber: 'LBV-003',
    companyName: 'Gabon Trans',
  },
];

export const getTrips = async (from: string, to: string, date: string): Promise<Trip[]> => {
  try {
    const response = await api.get<Trip[]>('/trips', { params: { from, to, date } });
    return response.data;
  } catch (error) {
    console.error('Error fetching trips:', error);
    // Return mock data filtered by route for MVP demo
    return mockTrips.filter(t => 
      t.from.toLowerCase() === from.toLowerCase() && 
      t.to.toLowerCase() === to.toLowerCase()
    );
  }
};

export const getTripById = async (id: string): Promise<Trip | null> => {
  try {
    const response = await api.get<Trip>(`/trips/${id}`);
    return response.data;
  } catch (error) {
    return mockTrips.find(t => t.id === id) || null;
  }
};

export const createBooking = async (bookingData: any): Promise<Booking> => {
  try {
    const response = await api.post<Booking>('/bookings', bookingData);
    return response.data;
  } catch (error) {
    // Return mock booking
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      qrCode: 'MOCK_QR_CODE_DATA',
    };
  }
};

export const processPayment = async (paymentData: any): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.post('/payment', paymentData);
    return response.data;
  } catch (error) {
    return { success: true, message: 'Payment simulated successfully' };
  }
};

export const getBookingById = async (id: string): Promise<Booking | null> => {
  try {
    const response = await api.get<Booking>(`/bookings/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export default api;
