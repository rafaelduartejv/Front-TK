import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2>Bem-vindo!</h2>
      <p>Escolha uma das opções abaixo:</p>
      <div class="d-grid gap-3 mt-4">
        <button class="btn btn-secondary" (click)="irParaEnderecos()">Meus Endereços</button>
        <button class="btn btn-danger mt-3" (click)="logout()">Sair</button>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  irParaEnderecos() {
    console.log('Navegando para /enderecos');
    this.router.navigate(['/enderecos']);
  }

  logout() {
    console.log('Fazendo logout');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}