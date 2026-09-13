import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Booking, BookingRequest } from '../models/booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private baseUrl = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) {}

  create(request: BookingRequest): Observable<Booking> {
    return this.http.post<Booking>(this.baseUrl, request);
  }

  getByPnr(pnr: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.baseUrl}/${pnr}`);
  }
}
