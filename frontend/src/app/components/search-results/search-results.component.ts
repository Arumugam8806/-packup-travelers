import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../core/services/trip.service';
import { BookingStateService } from '../../core/services/booking-state.service';
import { Trip, TravelMode } from '../../core/models/trip.model';

type SortKey = 'price' | 'departure' | 'rating';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  mode: TravelMode = 'TRAIN';
  source = '';
  destination = '';
  travelDate = '';
  passengers = 1;

  trips: Trip[] = [];
  loading = false;
  errorMessage = '';
  sortKey: SortKey = 'departure';

  modeIcon: Record<TravelMode, string> = {
    TRAIN: 'assets/icons/train.svg',
    BUS: 'assets/icons/bus.svg',
    FLIGHT: 'assets/icons/flight.svg'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripService,
    private bookingState: BookingStateService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.mode = (params.get('mode') as TravelMode) || 'TRAIN';
      this.source = params.get('source') || '';
      this.destination = params.get('destination') || '';
      this.travelDate = params.get('date') || new Date().toISOString().split('T')[0];
      this.passengers = Number(params.get('passengers')) || 1;
      this.runSearch();
    });
  }

  runSearch(): void {
    this.loading = true;
    this.errorMessage = '';
    this.tripService.search(this.mode, this.source, this.destination).subscribe({
      next: (trips) => {
        this.trips = trips;
        this.applySort();
        this.loading = false;
        if (trips.length === 0) {
          this.errorMessage = `No ${this.mode.toLowerCase()}s found for this route. Try a nearby city or a different travel mode.`;
        }
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Could not reach the booking server. Please make sure the backend is running on port 8080.';
      }
    });
  }

  changeMode(mode: TravelMode): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { mode },
      queryParamsHandling: 'merge'
    });
  }

  setSort(key: SortKey): void {
    this.sortKey = key;
    this.applySort();
  }

  private applySort(): void {
    const sorted = [...this.trips];
    if (this.sortKey === 'price') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (this.sortKey === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else {
      sorted.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    }
    this.trips = sorted;
  }

  selectTrip(trip: Trip): void {
    if (trip.availableSeats < this.passengers) {
      this.errorMessage = `Only ${trip.availableSeats} seat(s) left on this ${trip.mode.toLowerCase()}.`;
      return;
    }
    this.bookingState.setSelection({
      trip,
      travelDate: this.travelDate,
      numberOfTickets: this.passengers
    });
    this.router.navigate(['/booking', trip.id]);
  }
}
