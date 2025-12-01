import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { TecnicoService } from '../../../services/tecnico.service';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from '../../../models/tecnico';

@Component({
  selector: 'app-tecnico-delete',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink,
    MatButtonModule, MatFormFieldModule, MatInputModule, 
    MatCheckboxModule, MatIconModule
  ],
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  tecnico: Tecnico = {
    id: '', nome: '', cpf: '', email: '', senha: '', perfis: [], dataCriacao: ''
  }

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
    });
  }

  delete(): void {
    this.service.delete(this.tecnico.id).subscribe({
      next: () => {
        this.toastr.success('Técnico removido com sucesso', 'Delete');
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
}