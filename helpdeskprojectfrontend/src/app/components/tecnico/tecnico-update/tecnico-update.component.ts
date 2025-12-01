import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

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
  selector: 'app-tecnico-update',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterLink,
    MatButtonModule, MatFormFieldModule, MatInputModule, 
    MatSelectModule, MatCheckboxModule, MatIconModule
  ],
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

  tecnico: Tecnico = {
    id: '', nome: '', cpf: '', email: '', senha: '', perfis: [], dataCriacao: ''
  }

  nome = new FormControl('', [Validators.minLength(3)]);
  cpf = new FormControl('', [Validators.required, Validators.minLength(11)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  senha = new FormControl('', [Validators.minLength(3)]);

  constructor(
    private service: TecnicoService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(resposta => {
      this.tecnico = resposta;
      this.tecnico.senha = '';
    });
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid;
  }

  update(): void {
    if (!this.validaCampos()) return;

    this.service.update(this.tecnico).subscribe({
      next: () => {
        this.toastr.success('Técnico atualizado com sucesso', 'Atualização');
        this.router.navigate(['main/tecnico']);
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

  addPerfil(perfil: number): void {
    for(let i = 0; i < this.tecnico.perfis.length; i++) {
      if(this.tecnico.perfis[i] === perfil.toString()) {
        this.tecnico.perfis.splice(i, 1);
        return;
      }
    }
    this.tecnico.perfis.push(perfil.toString());
  }
}