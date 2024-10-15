import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  
    private apiUrl = 'http://localhost:8080/api/route'; // Adjust as necessary

    constructor(private http: HttpClient) {}
  
    // Get all routes
    getAllRoutes(): Observable<Route[]> {
      return this.http.get<Route[]>(`${this.apiUrl}/list`);
    }
  
    // Get route by ID
    getRouteById(id: number): Observable<Route> {
      return this.http.get<Route>(`${this.apiUrl}/find/${id}`);
    }
  
    // Add a new route
    addRoute(route: Route): Observable<Route> {
      return this.http.post<Route>(`${this.apiUrl}/add`, route);
    }
  
    // Update an existing route
    updateRoute(id: number, route: Route): Observable<Route> {
      return this.http.put<Route>(`${this.apiUrl}/update/${id}`, route);
    }
  
    // Delete a route by ID
    deleteRoute(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }
   }

