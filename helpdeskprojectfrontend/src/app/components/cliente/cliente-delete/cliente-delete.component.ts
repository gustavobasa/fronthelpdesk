import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

// Imports Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { ClienteService } from '../../../services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../../models/cliente';

@Component({
  selector: 'app-cliente-delete',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink,
    MatButtonModule, MatFormFieldModule, MatInputModule, 
    MatCheckboxModule, MatIconModule
  ],
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  cliente: Cliente = {
    id: '', nome: '', cpf: '', email: '', senha: '', perfis: [], dataCriacao: ''
  }

  constructor(
    private service: ClienteService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.cliente.id).subscribe(resposta => {
      this.cliente = resposta;
    });
  }

  delete(): void {
    this.service.delete(this.cliente.id).subscribe({
      next: () => {
        this.toastr.success('Cliente removido com sucesso', 'Delete');
        this.router.navigate(['main/cliente']);
      },
      error: (ex) => {
        if(ex.error.errors) {
          ex.error.errors.forEach((element: any) => this.toastr.error(element.message));
        } else {
          this.toastr.error(ex.error.message);
        }
      }
    })
  }
}