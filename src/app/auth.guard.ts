import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    console.log('Verificando token no guarda:', token);
    if (token) {
      console.log('Acesso permitido');
      return true;
    }
    console.log('Acesso negado, redirecionando para /login');
    this.router.navigate(['/login']);
    return false;
  }
}