import { Injectable } from '@angular/core';
import { Trip } from '../models/trip.model';

export interface SelectedJourney {
  trip: Trip;
  travelDate: string;
  numberOfTickets: number;
}

@Injectable({ providedIn: 'root' })
export class BookingStateService {
  private selection: SelectedJourney | null = null;
  private lastConfirmedPnr: string | null = null;

  setSelection(selection: SelectedJourney): void {
    this.selection = selection;
  }

  getSelection(): SelectedJourney | null {
    return this.selection;
  }

  clearSelection(): void {
    this.selection = null;
  }

  setLastConfirmedPnr(pnr: string): void {
    this.lastConfirmedPnr = pnr;
  }

  getLastConfirmedPnr(): string | null {
    return this.lastConfirmedPnr;
  }
}
