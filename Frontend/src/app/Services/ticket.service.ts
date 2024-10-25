import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ticket } from '../Models/ticket';
import { HttpClient } from '@angular/common/http';
import { Bus } from '../Models/bus';
import { Route } from '../Models/route.model';

@Injectable({
  providedIn: 'root',
})

export class TicketService {

  bus: Bus[] = [];

  private baseUrl = 'http://localhost:8080/api/tickets'

  constructor(private http:HttpClient){}
  private ticketData = new BehaviorSubject<Ticket | null>(null);
  currentTicket$ = this.ticketData.asObservable();


  private busData = new BehaviorSubject<Bus | null>(null);
  currentBusData$ = this.busData.asObservable();

  public passengers = new BehaviorSubject<any[]>([]);
  public state = new BehaviorSubject<string>('');
  public contact =new BehaviorSubject<string>('');

  private routeData = new BehaviorSubject<Route | null> (null);
  currentRoute$ = this.routeData.asObservable();

  setTicketData(data: Ticket) {
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
}
