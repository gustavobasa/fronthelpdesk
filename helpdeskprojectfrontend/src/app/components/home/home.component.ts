import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { ChamadoDTO } from '../../models/chamado'; 
import { ChamadoService } from '../../services/chamado.service'; 

// IMPORTS DO ANGULAR MATERIAL
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    DatePipe 
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Array para armazenar os chamados que serão exibidos
  chamados: ChamadoDTO[] = []; 

  constructor(
    private chamadoService: ChamadoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAllChamados(); 
  }

  // Método para buscar os dados
  findAllChamados(): void {
    this.chamadoService.findAll().subscribe(res => {
      // Ordena e pega os 5 mais recentes
      this.chamados = res.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)).slice(0, 5); 
    });
  }

  // Método auxiliar para obter o status em texto
  getStatusText(status: number): string {
    switch(status) {
      case 0: return 'ABERTO';
      case 1: return 'EM ANDAMENTO';
      case 2: return 'ENCERRADO';
      default: return 'DESCONHECIDO';
    }
  }

  // Função para navegar para o detalhe (usando a rota aninhada)
  verDetalhes(id: number | undefined): void {
    if (id !== undefined) {
        this.router.navigate(['/main/chamado/update', id]); 
    }
  }
}