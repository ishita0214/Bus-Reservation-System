import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Seats } from '../Models/seat';
import { Bus } from '../Models/bus';

@Injectable({
  providedIn: 'root'
})
export class SeatServiceService {

  private baseUrl = 'http://localhost:8080/api/seats'; // Adjust this to your backend URL

  constructor(private http: HttpClient) {}

  // Fetch seats for a specific bus by its ID
  getSeatsByBusId(busId: number): Observable<Seats[]> {
    return this.http.get<Seats[]>(`${this.baseUrl}/bus/${busId}`);
  }

  // Book selected seats
  bookSeats(bookingData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/book`, bookingData);
  }

  getReservedSeats(busId: number, userId:number): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/search/userId/{userId}/busId/{busId}`);
  }

  private selectedBusSource = new BehaviorSubject<Bus | null>(null);
  currentBus = this.selectedBusSource.asObservable();

  private selectedRouteSource = new BehaviorSubject<any>(null);
  selectedRoute = this.selectedRouteSource.asObservable();

  selectBus(bus: Bus) {
    this.selectedBusSource.next(bus);
  }
  selectRoute(route: any) {
    
}
}


// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// interface Bus {
//   name: string;
//   route: string;
//   departureTime: string;
//   arrivalTime: string;
// }
// @Injectable({
//   providedIn: 'root'
// })
// export class SeatServiceService {

//   private selectedBusSource = new BehaviorSubject<Bus | null>(null);
//   currentBus = this.selectedBusSource.asObservable();

//   private selectedRouteSource = new BehaviorSubject<any>(null);
//   selectedRoute = this.selectedRouteSource.asObservable();

//   constructor() {}

//   selectBus(bus: Bus) {
//     this.selectedBusSource.next(bus);
//   }
//   selectRoute(route: any) {
//     this.selectedRouteSource.next(route);
//   }
// }


// export class SeatServiceService {
//   private selectedRouteSource = new BehaviorSubject<any>(null);
//   selectedRoute$ = this.selectedRouteSource.asObservable();

//   selectRoute(route: any) {
//     this.selectedRouteSource.next(route);
//   }
// }

