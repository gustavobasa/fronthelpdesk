import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Imports de Forms (necessários para FormControl)
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// Imports Material (padronizados)
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

// Serviços e Modelos (Ajuste os caminhos se necessário)
import { ChamadoService } from '../../../services/chamado.service';
import { ClienteService } from '../../../services/cliente.service';
import { TecnicoService } from '../../../services/tecnico.service';

import { ToastrService } from 'ngx-toastr';
import { ChamadoDTO } from '../../../models/chamado';
import { Cliente } from '../../../models/cliente';
import { Tecnico } from '../../../models/tecnico';


@Component({
  selector: 'app-chamado-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // ESSENCIAL para FormControl
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  chamado: ChamadoDTO = {
    prioridade: 0,
    status: 0,
    titulo: '',
    observacoes: '',
    tecnico: 0,
    cliente: 0
  };

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];


  // PADRÃO: Definição dos FormControls para validação
  titulo = new FormControl('', [Validators.required, Validators.minLength(5)]);
  observacoes = new FormControl('', [Validators.required, Validators.minLength(10)]);
  prioridade = new FormControl('', [Validators.required]);
  status = new FormControl('', [Validators.required]);
  tecnico = new FormControl('', [Validators.required]);
  cliente = new FormControl('', [Validators.required]);


  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(res => {
      this.clientes = res;
    });
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(res => {
      this.tecnicos = res;
    });
  }


  // PADRÃO: Método para verificar se todos os FormControls são válidos
  validaCampos(): boolean {
    return this.titulo.valid &&
      this.observacoes.valid &&
      this.prioridade.valid &&
      this.status.valid &&
      this.tecnico.valid &&
      this.cliente.valid;
  }

  // PADRÃO: Implementação do método de criação com Toastr
  create(): void {
    // 1. Antes de enviar, move os valores dos FormControls para o DTO
    this.chamado.titulo = this.titulo.value || '';
    this.chamado.observacoes = this.observacoes.value || '';
    // Converte os valores dos selects para número antes de enviar ao DTO
    this.chamado.prioridade = Number(this.prioridade.value);
    this.chamado.status = Number(this.status.value);
    this.chamado.tecnico = Number(this.tecnico.value);
    this.chamado.cliente = Number(this.cliente.value);

    if (!this.validaCampos()) {
      this.toastr.error('Preencha todos os campos obrigatórios!', 'Validação');
      return;
    }

    this.chamadoService.create(this.chamado).subscribe({
      next: () => {
        this.toastr.success('Chamado aberto com sucesso', 'Criação');
        this.router.navigate(['main/chamado']);
      },
      error: (ex) => {
        console.error(ex);
        if (ex.error.errors) {
          // PADRÃO: Exibição de erros de validação do Backend
          ex.error.errors.forEach((element: any) => {
            this.toastr.error(element.message);
          });
        } else {
          this.toastr.error(ex.error.message);
        }
      }
    });
  }
}