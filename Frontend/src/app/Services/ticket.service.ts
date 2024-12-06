import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ticket } from '../Models/ticket';
import { HttpClient } from '@angular/common/http';
import { Bus } from '../Models/bus';
import { Route } from '../Models/route.model';
import { Booking } from '../Models/bookings';
import { Details } from '../Models/details';

@Injectable({
  providedIn: 'root',
})

export class TicketService {

  bus: Bus[] = [];

  private baseUrl = 'http://localhost:8080/api/tickets'

  constructor(private http:HttpClient){}
  private ticketData = new BehaviorSubject<Ticket[]>([]);
  currentTicket$ = this.ticketData.asObservable();
  public booking:BehaviorSubject<Booking>=new BehaviorSubject<Booking>(new Booking(0,'','','','','','','',0,'',[]))
  public seatNumber:BehaviorSubject<number[]>=new BehaviorSubject<number[]>([]) 
  private totalFareSubject = new BehaviorSubject<number>(0);
  totalFare$ = this.totalFareSubject.asObservable();


  private busData = new BehaviorSubject<Bus | null>(null);
  currentBusData$ = this.busData.asObservable();

  public passengers = new BehaviorSubject<any[]>([]);
  public state = new BehaviorSubject<string>('');
  public contact =new BehaviorSubject<string>('');

  private routeData = new BehaviorSubject<Route | null> (null);
  currentRoute$ = this.routeData.asObservable();

  setTicketsData(data: Ticket[]) {
    console.log('Setting tickets data in service:', data);
    this.ticketData.next(data);
  }
  

  setRouteData(data:Route){
    this.routeData.next(data);
  }

  setBusData(data:Bus){
    this.busData.next(data);
  }
  

  saveTicket(ticketData: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.baseUrl}/saveTicket`, ticketData)
  }

  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteTicket/${id}`);
  }
}
