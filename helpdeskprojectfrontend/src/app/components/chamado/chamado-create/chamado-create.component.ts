import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

import { ChamadoDTO } from '../../../models/chamado';
import { Prioridade, Status } from '../../../models/enums';
import { ChamadoService } from '../../../services/chamado.service';
import { TecnicoService } from '../../../services/tecnico.service';
import { ClienteService } from '../../../services/cliente.service';


@Component({
  selector: 'app-chamado-create',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule
  ],
  templateUrl: './chamado-create.component.html'
})
export class ChamadoCreateComponent implements OnInit {
  chamado: ChamadoDTO = { titulo: '', observacoes: '', prioridade: Prioridade.BAIXA, status: Status.ABERTO, tecnico: 0, cliente: 0 };
  nomeTecnico = new FormControl('');
  nomeCliente = new FormControl('');
  prioridadeControl = new FormControl(Prioridade.BAIXA, [Validators.required]);
  statusControl = new FormControl(Status.ABERTO, [Validators.required]);

  tecnicos: any[] = [];
  clientes: any[] = [];

  constructor(
    private service: ChamadoService,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tecnicoService.findAll().subscribe(res => this.tecnicos = res);
    this.clienteService.findAll().subscribe(res => this.clientes = res);
  }

  validaCampos(): boolean {
    return !!this.chamado.titulo && !!this.chamado.tecnico && !!this.chamado.cliente;
  }

  create(): void {
    if (!this.validaCampos()) return;
    this.service.create(this.chamado).subscribe({
      next: () => {
        this.toastr.success('Chamado criado com sucesso', 'Cadastro');
        this.router.navigate(['/main/chamado']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erro ao criar chamado');
      }
    });
  }
}
