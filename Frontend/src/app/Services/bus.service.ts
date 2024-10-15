import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bus } from '../Models/bus';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  public buses$: BehaviorSubject<Bus[]> = new BehaviorSubject<Bus[]>([]);
  private apiUrl = 'http://localhost:8080/api/bus'; 

  constructor(private http: HttpClient) { }

  getBus(id: number): Observable<Bus> {
    return this.http.get<Bus>(`${this.apiUrl}/find/${id}`);
  }

  getAllBuses(): Observable<Bus[]> {
    return this.http.get<Bus[]>(`${this.apiUrl}/list`);
  }

  createBus(bus: Bus): Observable<Bus> {
    return this.http.post<Bus>(`${this.apiUrl}/add`, bus);
  }

  deleteBus(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  updateBus(id: number, bus: Bus): Observable<Bus> {
    return this.http.put<Bus>(`${this.apiUrl}/update/${id}`, bus);
  }

  getBuses(source: string, destination: string, date: string): Observable<Bus[]> {
    return this.http.get<Bus[]>(`${this.apiUrl}/search/${source}/${destination}/${date}`);
  }
}
