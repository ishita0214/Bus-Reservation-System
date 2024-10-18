import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ticket } from '../Models/ticket';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class TicketService {

  private baseUrl = 'http://localhost:8080/api/tickets'

  constructor(private http:HttpClient){}
  private ticketData = new BehaviorSubject<Ticket | null>(null);
  currentTicket$ = this.ticketData.asObservable();

  setTicketData(data: Ticket) {
    this.ticketData.next(data);
  }

  saveTicket(ticketData: Ticket): Observable<Ticket> {
    console.log("Ticket saved successfully! ",ticketData);
    
    return this.http.post<Ticket>(`${this.baseUrl}/saveTicket`, ticketData)
  }
}
