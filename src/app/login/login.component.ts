import { Component, NgZone } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  erro: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  login() {
    const email = this.email.trim();
    const password = this.password.trim();
    console.log('Enviando:', { email, password });
    this.authService.login(email, password).subscribe({
      next: (res: any) => {
        console.log('Resposta completa:', res);
        localStorage.setItem('token', res.token);
        this.ngZone.run(() => {
          this.router.navigate(['']).then((success) => {
            console.log('Navegação bem-sucedida:', success);
            if (!success) {
              console.error('Falha na navegação: Rota / não acessada');
            }
          }).catch((err) => {
            console.error('Erro ao navegar:', err);
          });
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro no login:', err);
        this.erro = err.error?.message || 'Email ou senha inválidos';
        localStorage.removeItem('token');
      },
    });
  }

  irParaRegistro() {
    console.log('Navegando para /registrar');
    this.router.navigate(['/registrar']).then((success) => {
      console.log('Navegação para registro:', success);
    }).catch((err) => {
      console.error('Erro ao navegar para registro:', err);
    });
  }
}