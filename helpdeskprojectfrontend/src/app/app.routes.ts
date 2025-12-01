import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';

// Técnicos
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';

// Clientes
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component'; // <--- IMPORT ADICIONADO
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component'; // <--- IMPORT ADICIONADO

import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  
  { 
    path: 'main', 
    component: NavComponent, 
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      
      // Rotas de Técnico (CRUD)
      { path: 'tecnico', component: TecnicoListComponent },
      { path: 'tecnico/create', component: TecnicoCreateComponent },
      { path: 'tecnico/update/:id', component: TecnicoUpdateComponent },
      { path: 'tecnico/delete/:id', component: TecnicoDeleteComponent },
      
      // Rotas de Cliente (CRUD COMPLETO)
      { path: 'cliente', component: ClienteListComponent },
      { path: 'cliente/create', component: ClienteCreateComponent },
      { path: 'cliente/update/:id', component: ClienteUpdateComponent }, // <--- ROTA ADICIONADA
      { path: 'cliente/delete/:id', component: ClienteDeleteComponent }  // <--- ROTA ADICIONADA
    ]
  },

  { path: '**', redirectTo: 'main/home', pathMatch: 'full' }
];