import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TravelMode } from '../../core/models/trip.model';

interface Feature {
  icon: string;
  title: string;
  text: string;
}

interface Step {
  icon: string;
  title: string;
  text: string;
}

interface PopularRoute {
  mode: TravelMode;
  icon: string;
  from: string;
  to: string;
  price: string;
}

interface Testimonial {
  name: string;
  trip: string;
  quote: string;
  rating: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mode: TravelMode = 'TRAIN';
  source = '';
  destination = '';
  travelDate = '';
  passengers = 1;
  minDate = '';
  formError = '';

  modes: { key: TravelMode; label: string; icon: string }[] = [
    { key: 'TRAIN', label: 'Train', icon: 'assets/icons/train.svg' },
    { key: 'BUS', label: 'Bus', icon: 'assets/icons/bus.svg' },
    { key: 'FLIGHT', label: 'Flight', icon: 'assets/icons/flight.svg' }
  ];

  features: Feature[] = [
    {
      icon: 'assets/icons/ticket.svg',
      title: 'One Ticket, Three Journeys',
      text: 'Search and book trains, buses and flights from a single, unified window — no more app-hopping.'
    },
    {
      icon: 'assets/icons/star.svg',
      title: 'Curated Best Fares',
      text: 'Transparent pricing with taxes shown upfront — the fare you see is the fare you pay.'
    },
    {
      icon: 'assets/icons/check.svg',
      title: 'Instant Confirmation',
      text: 'Get your PNR and e-ticket the moment your booking is confirmed — no waiting, no guesswork.'
    },
    {
      icon: 'assets/icons/seat.svg',
      title: 'Live Seat Availability',
      text: 'Real seat counts pulled straight from our booking engine so you always know what is left.'
    }
  ];

  steps: Step[] = [
    { icon: 'assets/icons/location.svg', title: 'Pick your route', text: 'Choose train, bus or flight, then set source and destination.' },
    { icon: 'assets/icons/calendar.svg', title: 'Select date & seats', text: 'Tell us when you are travelling and how many tickets you need.' },
    { icon: 'assets/icons/user.svg', title: 'Add traveler details', text: 'Fill in passenger info so we can prep your ticket.' },
    { icon: 'assets/icons/ticket.svg', title: 'Confirm & go', text: 'Review the fare, confirm, and receive your booking instantly.' }
  ];

  popularRoutes: PopularRoute[] = [
    { mode: 'TRAIN', icon: 'assets/icons/train.svg', from: 'Chennai', to: 'Bengaluru', price: '₹980' },
    { mode: 'FLIGHT', icon: 'assets/icons/flight.svg', from: 'Chennai', to: 'Delhi', price: '₹4,899' },
    { mode: 'BUS', icon: 'assets/icons/bus.svg', from: 'Chennai', to: 'Bengaluru', price: '₹850' },
    { mode: 'TRAIN', icon: 'assets/icons/train.svg', from: 'Mumbai', to: 'Delhi', price: '₹2,650' },
    { mode: 'BUS', icon: 'assets/icons/bus.svg', from: 'Hyderabad', to: 'Chennai', price: '₹1,250' },
    { mode: 'FLIGHT', icon: 'assets/icons/flight.svg', from: 'Bengaluru', to: 'Hyderabad', price: '₹3,599' }
  ];

  testimonials: Testimonial[] = [
    { name: 'Ananya R.', trip: 'Chennai → Bengaluru, Train', quote: 'Booked my Shatabdi ticket in under two minutes. The fare breakdown was crystal clear.', rating: 5 },
    { name: 'Vikram S.', trip: 'Mumbai → Pune, Bus', quote: 'Loved being able to compare bus and flight prices on the same site before deciding.', rating: 4 },
    { name: 'Farah K.', trip: 'Delhi → Kolkata, Flight', quote: 'Clean interface, instant PNR, and the whole brown travel theme feels genuinely premium.', rating: 5 }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.travelDate = this.minDate;
  }

  selectMode(mode: TravelMode): void {
    this.mode = mode;
    this.formError = '';
  }

  swapLocations(): void {
    const temp = this.source;
    this.source = this.destination;
    this.destination = temp;
  }

  increment(): void {
    if (this.passengers < 6) this.passengers++;
  }

  decrement(): void {
    if (this.passengers > 1) this.passengers--;
  }

  search(): void {
    if (!this.source.trim() || !this.destination.trim()) {
      this.formError = 'Please enter both source and destination.';
      return;
    }
    if (this.source.trim().toLowerCase() === this.destination.trim().toLowerCase()) {
      this.formError = 'Source and destination cannot be the same.';
      return;
    }
    this.formError = '';
    this.router.navigate(['/search'], {
      queryParams: {
        mode: this.mode,
        source: this.source.trim(),
        destination: this.destination.trim(),
        date: this.travelDate,
        passengers: this.passengers
      }
    });
  }

  quickSearch(route: PopularRoute): void {
    this.router.navigate(['/search'], {
      queryParams: {
        mode: route.mode,
        source: route.from,
        destination: route.to,
        date: this.travelDate || this.minDate,
        passengers: 1
      }
    });
  }
}
