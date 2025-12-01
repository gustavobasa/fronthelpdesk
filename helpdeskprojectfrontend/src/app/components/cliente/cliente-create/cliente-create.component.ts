import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

// Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { ClienteService } from '../../../services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../../models/cliente';

@Component({
  selector: 'app-cliente-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule
  ],
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  nome = new FormControl('', [Validators.minLength(3)]);
  cpf = new FormControl('', [Validators.required, Validators.minLength(11)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  senha = new FormControl('', [Validators.minLength(3)]);

  constructor(
    private service: ClienteService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }

  create(): void {
    if (!this.validaCampos()) {
      return;
    }

    this.service.create(this.cliente).subscribe({
      next: () => {
        this.toastr.success('Cliente cadastrado com sucesso', 'Cadastro');
        this.router.navigate(['main/cliente']);
      },
      error: (ex) => {
        console.error(ex);
        if(ex.error.errors) {
          ex.error.errors.forEach((element: any) => {
            this.toastr.error(element.message);
          });
        } else {
          this.toastr.error(ex.error.message);
        }
      }
    })
  }

  addPerfil(perfil: number): void {
    for(let i = 0; i < this.cliente.perfis.length; i++) {
      if(this.cliente.perfis[i] === perfil.toString()) {
        this.cliente.perfis.splice(i, 1);
        return;
      }
    }
    this.cliente.perfis.push(perfil.toString());
  }
}
