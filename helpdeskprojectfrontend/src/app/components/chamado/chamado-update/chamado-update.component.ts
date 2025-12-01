import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-chamado-update',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule
  ],
  templateUrl: './chamado-update.component.html'
})
export class ChamadoUpdateComponent implements OnInit {
  chamado: ChamadoDTO = { titulo: '', observacoes: '', prioridade: 0, status: 0, tecnico: 0, cliente: 0 };
  tecnicos: any[] = [];
  clientes: any[] = [];
  id!: number;

  constructor(
    private service: ChamadoService,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.findById();
    this.tecnicoService.findAll().subscribe(res => this.tecnicos = res);
    this.clienteService.findAll().subscribe(res => this.clientes = res);
  }

  findById(): void {
    this.service.findById(this.id).subscribe(res => this.chamado = res);
  }

  update(): void {
    this.service.update(this.id, this.chamado).subscribe({
      next: () => {
        this.toastr.success('Chamado atualizado', 'Atualização');
        this.router.navigate(['/main/chamado']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erro ao atualizar chamado');
      }
    });
  }
}
