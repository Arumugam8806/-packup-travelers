import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../core/services/booking.service';
import { Booking } from '../../core/models/booking.model';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  booking: Booking | null = null;
  loading = true;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private bookingService: BookingService) {}

  ngOnInit(): void {
    const pnr = this.route.snapshot.paramMap.get('pnr');
    if (!pnr) {
      this.loading = false;
      this.errorMessage = 'No booking reference provided.';
      return;
    }
    this.bookingService.getByPnr(pnr).subscribe({
      next: (booking) => {
        this.booking = booking;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'We could not find a booking with this PNR.';
      }
    });
  }

  print(): void {
    window.print();
  }
}
