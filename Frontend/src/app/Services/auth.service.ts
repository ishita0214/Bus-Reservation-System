import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();


  private baseUrl = 'http://localhost:8080/auth'; // Backend auth endpoint
  private tokenKey = 'token';

  constructor(private http: HttpClient, private router: Router,private userService: UserService) {}
 
  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/login`, credentials).subscribe((response: any) => {
      localStorage.setItem(this.tokenKey, response.token); // Save token
      this.userService.findUserByEmail(credentials.email).subscribe((data) => {
        localStorage.setItem('loginUser', JSON.stringify(data.id));
        this.userService.setCurrentUser(data); // Update the current user in UserService
        this.isLoggedInSubject.next(true);
      
      });
    });
  }
  
  

  signup(user: any) {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }
  

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('loginUser');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return Date.now() >= exp * 1000;
  }
}
