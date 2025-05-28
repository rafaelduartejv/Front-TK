import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  cadastrar(nome: string, email: string, senha: string): Observable<any> {
    const payload = { name: nome, email, password: senha };
    return this.http.post(`${this.apiUrl}/register`, payload);
  }
}