import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

// Imports Material
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
  selector: 'app-cliente-update',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterLink,
    MatButtonModule, MatFormFieldModule, MatInputModule, 
    MatSelectModule, MatCheckboxModule, MatIconModule
  ],
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  cliente: Cliente = {
    id: '', nome: '', cpf: '', email: '', senha: '', perfis: [], dataCriacao: ''
  }

  nome = new FormControl('', [Validators.minLength(3)]);
  cpf = new FormControl('', [Validators.required, Validators.minLength(11)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  senha = new FormControl('', [Validators.minLength(3)]);

  constructor(
    private service: ClienteService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Captura o ID da URL
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    // Busca o cliente pelo ID para pré-preencher o formulário
    this.service.findById(this.cliente.id).subscribe(resposta => {
      this.cliente = resposta;
      // Limpamos a senha para evitar problemas no formulário de update
      this.cliente.senha = ''; 
    });
  }

  validaCampos(): boolean {
    // Valida apenas os campos obrigatórios (Nome, CPF, Email)
    return this.nome.valid && this.cpf.valid && this.email.valid; 
  }

  update(): void {
    if (!this.validaCampos()) return;

    // Chama o método PUT do serviço
    this.service.update(this.cliente).subscribe({
      next: () => {
        this.toastr.success('Cliente atualizado com sucesso', 'Atualização');
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
  
  // Função para lidar com a seleção de perfis (garante que o CLIENTE esteja selecionado)
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