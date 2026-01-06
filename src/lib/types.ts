export interface Trip {
  id: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  busNumber: string;
  companyName: string;
}

export interface PassengerInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
}

export interface Booking {
  id: string;
  tripId: string;
  trip: Trip;
  seats: string[];
  passengers: PassengerInfo[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentMethod?: 'airtel_money' | 'moov_money';
  paymentPhone?: string;
  createdAt: string;
  qrCode?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'passenger' | 'admin';
}
