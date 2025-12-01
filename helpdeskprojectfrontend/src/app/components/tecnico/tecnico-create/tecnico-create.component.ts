import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // << IMPORTANTE! RouterModule adicionado

// Imports Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { TecnicoService } from '../../../services/tecnico.service';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from '../../../models/tecnico';

@Component({
  selector: 'app-tecnico-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,              // <<<<<< FALTAVA ISTO AQUI!!!
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule
  ],
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    id: '', nome: '', cpf: '', email: '', senha: '', perfis: [], dataCriacao: ''
  };

  nome = new FormControl('', [Validators.minLength(3)]);
  cpf = new FormControl('', [Validators.required, Validators.minLength(11)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  senha = new FormControl('', [Validators.minLength(3)]);

  constructor(
    private service: TecnicoService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }

  create(): void {
    if (!this.validaCampos()) return;

    this.service.create(this.tecnico).subscribe({
      next: () => {
        this.toastr.success('Técnico cadastrado com sucesso', 'Cadastro');
        this.router.navigate(['main/tecnico']);
      },
      error: (ex) => {
        console.error(ex);
        if (ex.error.errors) {
          ex.error.errors.forEach((element: any) => {
            this.toastr.error(element.message);
          });
        } else {
          this.toastr.error(ex.error.message);
        }
      }
    });
  }

  addPerfil(perfil: number): void {
    const index = this.tecnico.perfis.indexOf(perfil.toString());
    if (index >= 0) {
      this.tecnico.perfis.splice(index, 1);
    } else {
      this.tecnico.perfis.push(perfil.toString());
    }
  }

  cancel(): void {
    this.router.navigate(['main/tecnico']);
  }
}
