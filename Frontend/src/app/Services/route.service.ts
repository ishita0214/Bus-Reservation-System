import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  
    private apiUrl = 'http://localhost:8080/api/route'; 

    constructor(private http: HttpClient) {}
  
    
    getAllRoutes(): Observable<Route[]> {
      console.log('Getting all routes!');
      return this.http.get<Route[]>(`${this.apiUrl}/list`);
    }
  
   
    getRouteById(id: number): Observable<Route> {
      return this.http.get<Route>(`${this.apiUrl}/find/${id}`);
    }
  
   
    addRoute(route: Route): Observable<Route> {
      return this.http.post<Route>(`${this.apiUrl}/add`, route);
    }
  
    
    updateRoute(id: number, route: Route): Observable<Route> {
      return this.http.put<Route>(`${this.apiUrl}/update/${id}`, route);
    }
  
    
    deleteRoute(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }
   }

