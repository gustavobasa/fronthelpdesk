import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';


import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card'; 

import { ChamadoDTO } from '../../../models/chamado';
import { ChamadoService } from '../../../services/chamado.service';


@Component({
  selector: 'app-chamado-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
   templateUrl: './chamado-list.component.html'
})
export class ChamadoListComponent implements OnInit {

    
    ELEMENT_DATA: ChamadoDTO[] = [];

    
    dataSource = new MatTableDataSource<ChamadoDTO>(this.ELEMENT_DATA);

    displayedColumns: string[] = [
        'id',
        'titulo',
        'cliente',
        'tecnico',
        'prioridade',
        'status',
        'actions'
    ];

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort; // Mantido, essencial para a ordenação de chamados

    constructor(
        private service: ChamadoService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.findAll();
    }

    
    findAll(): void {
        this.service.findAll().subscribe({
            next: (res) => {
                // 1. Atribui a resposta ao array interno (Padrão Cliente)
                this.ELEMENT_DATA = res;

                // 2. Reinicializa o dataSource com os novos dados (Padrão Cliente)
                this.dataSource = new MatTableDataSource<ChamadoDTO>(this.ELEMENT_DATA);

                // 3. Atribui Paginator e Sort
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: (ex) => {
                // Tratamento de erro mantido
                console.error('Erro ao carregar chamados (API ou CORS):', ex);
                alert('Falha ao carregar a lista de chamados. Verifique o servidor Backend.');
            }
        });
    }

   
    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    
    verChamado(id: number): void {
        this.router.navigate(['/main/chamado/update', id]);
    }

   
    novoChamado(): void {
        this.router.navigate(['/main/chamado/create']);
    }
}