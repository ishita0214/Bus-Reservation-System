import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { Buses } from '../Models/buses.model';

@Injectable({
  providedIn: 'root',
})
export class BusesService {
  constructor(private http: HttpClient) {}

  getRoutes(): Observable<string[]> {
    console.log('Success!');

    return this.http.get<string[]>('http://localhost:8080/api/route/list');
  }
}
