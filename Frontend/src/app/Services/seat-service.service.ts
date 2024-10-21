import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bus } from '../Models/bus';

@Injectable({
  providedIn: 'root'
})
export class SeatServiceService {

  private baseUrl = 'http://localhost:8080/api/seats'; 

  constructor(private http: HttpClient) {}

   bookSeats(bookingData: any): Observable<any> {
     return this.http.post(`${this.baseUrl}/book`, bookingData);
   }

   getReservedSeats(busId: number, userId:number): Observable<number[]> {
     return this.http.get<number[]>(`${this.baseUrl}/search/userId/${userId}/busId/${busId}`);
   }

   private selectedBusSource = new BehaviorSubject<Bus | null>(null);
   currentBus = this.selectedBusSource.asObservable();

   date: BehaviorSubject<string> = new BehaviorSubject<string>('');

   seatSelected: BehaviorSubject<any> = new BehaviorSubject<any>(null);

   private selectedRouteSource = new BehaviorSubject<any>(null);
   selectedRoute = this.selectedRouteSource.asObservable();

   selectBus(bus: Bus) {
     this.selectedBusSource.next(bus);
   }

   selectRoute(route: any) {}
}