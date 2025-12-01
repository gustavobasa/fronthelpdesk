import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';

import { ChamadoDTO } from '../../../models/chamado';
import { ChamadoService } from '../../../services/chamado.service';


@Component({
  selector: 'app-chamado-delete',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './chamado-delete.component.html'
})
export class ChamadoDeleteComponent implements OnInit {
  chamado: ChamadoDTO = { titulo: '', observacoes: '', prioridade: 0, status: 0, tecnico: 0, cliente: 0 };
  id!: number;

  constructor(private service: ChamadoService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.findById();
  }

  findById(): void {
    this.service.findById(this.id).subscribe(res => this.chamado = res);
  }

  delete(): void {
    this.service.delete(this.id).subscribe({
      next: () => {
        this.toastr.success('Chamado removido', 'Remoção');
        this.router.navigate(['/main/chamado']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erro ao remover chamado');
      }
    });
  }
}
