import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../Models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  
  private baseUrl = 'http://localhost:8080/api/seats';

  constructor(private http: HttpClient) {}

  getTicket(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.baseUrl}/getTicket/${id}`);
  }

  getAllTickets(busId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/getAllTicket/${busId}`);
  }

  createTicket(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.baseUrl}/createTicket`, reservation);
  }

  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteTicket/${id}`);
  }

  getReservations(userId: number, busId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/search/userId/${userId}/busId/${busId}`);
  }
  getBookedSeats(busId:number,date:string):Observable<number[]>{
    return this.http.get<number[]>(`${this.baseUrl}/bookedSeats/${busId}/${date}`);
  }
}
