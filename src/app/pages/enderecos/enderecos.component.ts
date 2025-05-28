import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnderecoService } from '../../services/endereco.service';

@Component({
  selector: 'app-enderecos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Meus Endereços</h2>
      <div *ngIf="enderecos.length > 0; else nenhumEndereco" class="text-start">
        <ul class="list-group mb-3">
          <li *ngFor="let endereco of enderecos" class="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>CEP:</strong> {{ endereco.cep }}<br />
              <strong>Número:</strong> {{ endereco.number }}<br />
              <strong>Complemento:</strong> {{ endereco.complement || 'N/A' }}
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-warning" (click)="preencherFormulario(endereco)">Editar</button>
              <button class="btn btn-sm btn-danger" (click)="removerEndereco(endereco.id)">Remover</button>
            </div>
          </li>
        </ul>
      </div>
      <ng-template #nenhumEndereco>
        <div class="alert alert-warning">Nenhum endereço cadastrado.</div>
      </ng-template>
      <form (ngSubmit)="salvarEndereco()" class="text-start mt-4">
        <div class="mb-3">
          <label for="cep" class="form-label">CEP</label>
          <input
            type="text"
            id="cep"
            [(ngModel)]="formulario.cep"
            name="cep"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="number" class="form-label">Número</label>
          <input
            type="text"
            id="number"
            [(ngModel)]="formulario.number"
            name="number"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="complement" class="form-label">Complemento</label>
          <input
            type="text"
            id="complement"
            [(ngModel)]="formulario.complement"
            name="complement"
            class="form-control"
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">
          {{ formulario.id ? 'Atualizar' : 'Adicionar' }} Endereço
        </button>
      </form>
      <div *ngIf="erro" class="alert alert-danger mt-3">{{ erro }}</div>
    </div>
  `,
  styleUrls: ['./enderecos.component.css'],
})
export class EnderecosComponent implements OnInit {
  enderecos: any[] = [];
  erro: string | null = null;
  formulario: any = {
    id: null,
    cep: '',
    number: '',
    complement: '',
  };

  constructor(private enderecoService: EnderecoService) {}

  ngOnInit(): void {
    this.listarEnderecos();
  }

  listarEnderecos() {
    this.enderecoService.listarEnderecos().subscribe({
      next: (data) => (this.enderecos = data),
      error: (err) => (this.erro = 'Erro ao carregar endereços'),
    });
  }

  salvarEndereco() {
    if (this.formulario.id) {
      this.enderecoService
        .atualizarEndereco(
          this.formulario.id,
          this.formulario.cep,
          this.formulario.number,
          this.formulario.complement
        )
        .subscribe({
          next: () => {
            this.limparFormulario();
            this.listarEnderecos();
            this.erro = null;
          },
          error: () => (this.erro = 'Erro ao atualizar endereço'),
        });
    } else {
      this.enderecoService
        .criarEndereco(
          this.formulario.cep,
          this.formulario.number,
          this.formulario.complement
        )
        .subscribe({
          next: () => {
            this.limparFormulario();
            this.listarEnderecos();
            this.erro = null;
          },
          error: () => (this.erro = 'Erro ao criar endereço'),
        });
    }
  }

  preencherFormulario(endereco: any) {
    this.formulario = { ...endereco };
  }

  limparFormulario() {
    this.formulario = {
      id: null,
      cep: '',
      number: '',
      complement: '',
    };
  }

  removerEndereco(id: number) {
    this.enderecoService.removerEndereco(id).subscribe({
      next: () => this.listarEnderecos(),
      error: () => (this.erro = 'Erro ao remover endereço'),
    });
  }
}