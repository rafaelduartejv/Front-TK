import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    console.log('Enviando:', body);
    return this.http.post(`${this.baseUrl}/auth/login`, body);
  }

  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    console.log('Verificando role:', role);
    return role === 'ADMIN';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}