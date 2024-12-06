import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/user'; // Adjust the URL based on your backend configuration

  constructor(private http: HttpClient) {}
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();
  setCurrentUser(user: User | null): void {
    this.userSubject.next(user);  // Update the user in the BehaviorSubject
  } getCurrentUser(): User | null {
    return this.userSubject.value;
  }


  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/findById/${id}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/list`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/add`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update/${id}`, user);
  }

  findUserByName(name: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/findByName/${name}`);
  }

  findUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/findByEmail/${email}`);
  }
}
