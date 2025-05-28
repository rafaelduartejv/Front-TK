import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EnderecoService {
  private apiUrl = 'http://localhost:8080/api/addresses';

  constructor(private http: HttpClient) {}

  listarEnderecos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  criarEndereco(cep: string, number: string, complement: string): Observable<any> {
    const payload = { cep, number, complement };
    return this.http.post<any>(this.apiUrl, payload);
  }

  atualizarEndereco(id: number, cep: string, number: string, complement: string): Observable<any> {
    const payload = { cep, number, complement };
    return this.http.put<any>(`${this.apiUrl}/${id}`, payload);
  }

  removerEndereco(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}