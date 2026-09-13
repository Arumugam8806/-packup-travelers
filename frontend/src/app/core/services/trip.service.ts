import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Trip, TravelMode } from '../models/trip.model';

@Injectable({ providedIn: 'root' })
export class TripService {
  private baseUrl = `${environment.apiUrl}/trips`;

  constructor(private http: HttpClient) {}

  search(mode: TravelMode, source?: string, destination?: string): Observable<Trip[]> {
    let params = new HttpParams().set('mode', mode);
    if (source) params = params.set('source', source);
    if (destination) params = params.set('destination', destination);
    return this.http.get<Trip[]>(`${this.baseUrl}/search`, { params });
  }

  getById(id: number): Observable<Trip> {
    return this.http.get<Trip>(`${this.baseUrl}/${id}`);
  }

  locations(): Observable<{ sources: string[]; destinations: string[] }> {
    return this.http.get<{ sources: string[]; destinations: string[] }>(`${this.baseUrl}/locations`);
  }
}
