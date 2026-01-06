'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Trip, PassengerInfo, Booking } from '@/lib/types';

interface BookingContextType {
  selectedTrip: Trip | null;
  setSelectedTrip: (trip: Trip | null) => void;
  selectedSeats: string[];
  setSelectedSeats: (seats: string[]) => void;
  passengers: PassengerInfo[];
  setPassengers: (passengers: PassengerInfo[]) => void;
  currentBooking: Booking | null;
  setCurrentBooking: (booking: Booking | null) => void;
  resetBooking: () => void;
  isRehydrated: boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedTrip, setSelectedTripState] = useState<Trip | null>(null);
  const [selectedSeats, setSelectedSeatsState] = useState<string[]>([]);
  const [passengers, setPassengersState] = useState<PassengerInfo[]>([]);
  const [currentBooking, setCurrentBookingState] = useState<Booking | null>(null);
  const [isRehydrated, setIsRehydrated] = useState(false);

  // Persistence
  useEffect(() => {
    const savedTrip = localStorage.getItem('gabonbus_selectedTrip');
    const savedSeats = localStorage.getItem('gabonbus_selectedSeats');
    const savedPassengers = localStorage.getItem('gabonbus_passengers');
    const savedBooking = localStorage.getItem('gabonbus_currentBooking');

    if (savedTrip) setSelectedTripState(JSON.parse(savedTrip));
    if (savedSeats) setSelectedSeatsState(JSON.parse(savedSeats));
    if (savedPassengers) setPassengersState(JSON.parse(savedPassengers));
    if (savedBooking) setCurrentBookingState(JSON.parse(savedBooking));
    
    setIsRehydrated(true);
  }, []);

    const setSelectedTrip = (trip: Trip | null) => {
      // Clear seats if trip changes
      if (trip?.id !== selectedTrip?.id) {
        setSelectedSeatsState([]);
        localStorage.removeItem('gabonbus_selectedSeats');
      }
      setSelectedTripState(trip);
      if (trip) localStorage.setItem('gabonbus_selectedTrip', JSON.stringify(trip));
      else localStorage.removeItem('gabonbus_selectedTrip');
    };

  const setSelectedSeats = (seats: string[]) => {
    setSelectedSeatsState(seats);
    localStorage.setItem('gabonbus_selectedSeats', JSON.stringify(seats));
  };

  const setPassengers = (passengers: PassengerInfo[]) => {
    setPassengersState(passengers);
    localStorage.setItem('gabonbus_passengers', JSON.stringify(passengers));
  };

  const setCurrentBooking = (booking: Booking | null) => {
    setCurrentBookingState(booking);
    if (booking) localStorage.setItem('gabonbus_currentBooking', JSON.stringify(booking));
    else localStorage.removeItem('gabonbus_currentBooking');
  };

  const resetBooking = () => {
    setSelectedTripState(null);
    setSelectedSeatsState([]);
    setPassengersState([]);
    setCurrentBookingState(null);
    localStorage.removeItem('gabonbus_selectedTrip');
    localStorage.removeItem('gabonbus_selectedSeats');
    localStorage.removeItem('gabonbus_passengers');
    localStorage.removeItem('gabonbus_currentBooking');
  };

  return (
    <BookingContext.Provider
      value={{
        selectedTrip,
        setSelectedTrip,
        selectedSeats,
        setSelectedSeats,
        passengers,
        setPassengers,
        currentBooking,
        setCurrentBooking,
        resetBooking,
        isRehydrated,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
