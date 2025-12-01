import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card'; // Mantido, mas provavelmente não é mais usado após padronização do HTML

import { ChamadoDTO } from '../../../models/chamado';
import { ChamadoService } from '../../../services/chamado.service';


@Component({
  selector: 'app-chamado-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule
  ],
  templateUrl: './chamado-list.component.html'
})
export class ChamadoListComponent implements OnInit {

  displayedColumns = [
    'id',
    'titulo',
    'cliente',
    'tecnico',
    'prioridade',
    'status',
    'actions' // Esta coluna corresponde ao 'actions' no HTML
  ];

  dataSource = new MatTableDataSource<ChamadoDTO>();

  // Garantindo que ViewChilds estejam prontos para o Paginator e Sort no HTML
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: ChamadoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  // Tratamento de dados e erros
  findAll(): void {
    // Usando next/error para melhor tratamento de requisições
    this.service.findAll().subscribe({
      next: (res) => {
        this.dataSource.data = res;

        // O setTimeout + a checagem é fundamental para garantir a renderização do Paginator/Sort
        setTimeout(() => {
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
          if (this.sort) {
            this.dataSource.sort = this.sort;
          }
        });
      },
      error: (ex) => {
        // Exibe o erro no console e alerta o usuário
        console.error('Erro ao carregar chamados (API ou CORS):', ex);
        alert('Falha ao carregar a lista de chamados. Verifique o servidor Backend.');
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    // Adiciona UX: Vai para a primeira página após o filtro
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Navega para a rota de edição/visualização correta
  verChamado(id: number): void {
    // Rota: /main/chamado/update/:id
    this.router.navigate(['/main/chamado/update', id]);
  }

  //  Navega para a rota de criação correta
  novoChamado(): void {
    // Rota: /main/chamado/create
    this.router.navigate(['/main/chamado/create']);
  }
}