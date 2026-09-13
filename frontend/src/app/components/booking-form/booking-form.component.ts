import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BookingStateService,
  SelectedJourney
} from '../../core/services/booking-state.service';
import { BookingService } from '../../core/services/booking.service';
import { TripService } from '../../core/services/trip.service';
import { Trip } from '../../core/models/trip.model';

const TAX_RATE = 0.05;

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {
  journey: SelectedJourney | null = null;
  loadingTrip = false;
  submitting = false;
  submitError = '';

  // Form is declared first and initialized in the constructor
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookingState: BookingStateService,
    private bookingService: BookingService,
    private tripService: TripService
  ) {
    // Initialize the form after FormBuilder has been injected
    this.form = this.fb.group({
      passengerName: [
        '',
        [Validators.required, Validators.minLength(2)]
      ],
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/)
        ]
      ],
      numberOfTickets: [
        1,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(6)
        ]
      ]
    });
  }

  ngOnInit(): void {
    const existing = this.bookingState.getSelection();
    const tripId = Number(
      this.route.snapshot.paramMap.get('tripId')
    );

    if (existing && existing.trip.id === tripId) {
      this.journey = existing;

      this.form.patchValue({
        numberOfTickets: existing.numberOfTickets
      });
    } else if (tripId) {
      // Deep link / page refresh fallback:
      // re-fetch the trip directly.
      this.loadingTrip = true;

      this.tripService.getById(tripId).subscribe({
        next: (trip: Trip) => {
          this.journey = {
            trip,
            travelDate: new Date()
              .toISOString()
              .split('T')[0],
            numberOfTickets: 1
          };

          this.loadingTrip = false;
        },

        error: () => {
          this.loadingTrip = false;
          this.submitError =
            'We could not load this trip. Please search again.';
        }
      });
    }
  }

  get tickets(): number {
    return this.form.get('numberOfTickets')?.value || 1;
  }

  get farePerTicket(): number {
    return this.journey?.trip.price || 0;
  }

  get subTotal(): number {
    return this.farePerTicket * this.tickets;
  }

  get tax(): number {
    return Math.round(
      this.subTotal * TAX_RATE * 100
    ) / 100;
  }

  get total(): number {
    return Math.round(
      (this.subTotal + this.tax) * 100
    ) / 100;
  }

  changeTickets(delta: number): void {
    const next = this.tickets + delta;

    // Maximum 6 tickets
    if (next < 1 || next > 6) {
      return;
    }

    // Don't allow more tickets than available seats
    if (
      this.journey &&
      next > this.journey.trip.availableSeats
    ) {
      return;
    }

    this.form.patchValue({
      numberOfTickets: next
    });
  }

  submit(): void {
    // Make sure journey exists and form is valid
    if (!this.journey || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.submitError = '';

    const payload = {
      tripId: this.journey.trip.id,
      travelDate: this.journey.travelDate,
      numberOfTickets: this.tickets,
      passengerName: this.form.value.passengerName,
      email: this.form.value.email,
      phone: this.form.value.phone
    };

    this.bookingService.create(payload).subscribe({
      next: (booking) => {
        this.submitting = false;

        // Save PNR for confirmation
        this.bookingState.setLastConfirmedPnr(
          booking.pnr
        );

        // Clear selected journey
        this.bookingState.clearSelection();

        // Navigate to confirmation page
        this.router.navigate([
          '/confirmation',
          booking.pnr
        ]);
      },

      error: (err) => {
        this.submitting = false;

        this.submitError =
          err?.error?.message ||
          'Booking failed. Please try again.';
      }
    });
  }
}