import { TravelMode } from './trip.model';

export interface BookingRequest {
  tripId: number;
  travelDate: string;
  numberOfTickets: number;
  passengerName: string;
  email: string;
  phone: string;
}

export interface Booking {
  id: number;
  pnr: string;
  tripId: number;
  mode: TravelMode;
  operatorName: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  travelDate: string;
  passengerName: string;
  email: string;
  phone: string;
  numberOfTickets: number;
  farePerTicket: number;
  taxAmount: number;
  totalFare: number;
  status: string;
  bookedAt: string;
}
