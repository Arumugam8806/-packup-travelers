export type TravelMode = 'TRAIN' | 'BUS' | 'FLIGHT';

export interface Trip {
  id: number;
  mode: TravelMode;
  operatorName: string;
  vehicleNumber: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
  rating: number;
  travelClass: string;
}
