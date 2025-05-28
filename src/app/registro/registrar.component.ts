import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioService } from '../services/usuario.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
})
export class RegistrarComponent {
  nome: string = '';
  email: string = '';
  senha: string = '';
  mensagem: string | null = null;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  registrar() {
    this.mensagem = null;
    this.usuarioService.cadastrar(this.nome, this.email, this.senha).subscribe({
      next: (res: any) => {
        console.log('Usuário registrado com sucesso:', res);
        this.mensagem = 'Usuário registrado com sucesso! Faça login.';
        this.nome = '';
        this.email = '';
        this.senha = '';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000); // Redirect to login after 2 seconds
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro no registro:', err);
        if (err.status === 400) {
          this.mensagem = 'Dados inválidos. Verifique os campos e tente novamente.';
        } else if (err.status === 409) {
          this.mensagem = 'Email já registrado. Use outro email.';
        } else {
          this.mensagem = 'Erro ao registrar usuário. Tente novamente.';
        }
      },
    });
  }
}