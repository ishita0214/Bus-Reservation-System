import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Reservation } from '../Models/reservation';
import { Booking } from '../Models/bookings';
import { Ticket } from '../Models/ticket';
import { Details } from '../Models/details';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  
  private baseUrl = 'http://localhost:8080/api/seats';

  constructor(private http: HttpClient) {}
  
  tickets: BehaviorSubject<Booking> = new BehaviorSubject<Booking>(new Booking(0,'','','','','','','',0,'',[]));
  private reservationData = new BehaviorSubject<Reservation[]>([]);
  currentReservation$ = this.reservationData.asObservable();
  public currPage:BehaviorSubject<string>=new BehaviorSubject<string>('')
  


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
  getTicketsByBookingId(bookingId:number):Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.baseUrl}/getTicketsByBookingId/${bookingId}`);
  }
  getTicketsByUserId(UserId:number):Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.baseUrl}/getTicketsByUserId/${UserId}`);
  }
  getUserBookings(userId:number):Observable<Booking[]>{
    return this.http.get<Booking[]>(`${this.baseUrl}/getUserBookings/${userId}`);
  }
  getPassengerDetails(bookingId:number):Observable<Details[]>{
    return this.http.get<Details[]>(`${this.baseUrl}/getPassengerDetails/${bookingId}`);
  }

  getTicketsBySeatNumber(seat:number):Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.baseUrl}/getTicketBySeatNumber/${seat}`);
  }
  updateReservation(id: number, reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.baseUrl}/updateReservation/${id}`, reservation);
  }
  
}
