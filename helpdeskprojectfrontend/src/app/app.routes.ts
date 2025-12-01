import { Routes } from '@angular/router';

// Login + Layout
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
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';

// Chamados (NOVO)
import { ChamadoListComponent } from './components/chamado/chamado-list/chamado-list.component';
import { ChamadoCreateComponent } from './components/chamado/chamado-create/chamado-create.component';
import { ChamadoUpdateComponent } from './components/chamado/chamado-update/chamado-update.component';
import { ChamadoDeleteComponent } from './components/chamado/chamado-delete/chamado-delete.component';

import { authGuard } from './auth/auth.guard';

export const routes: Routes = [

  // Página inicial → Login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'main',
    component: NavComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },


      { path: 'tecnico', component: TecnicoListComponent },
      { path: 'tecnico/create', component: TecnicoCreateComponent },
      { path: 'tecnico/update/:id', component: TecnicoUpdateComponent },
      { path: 'tecnico/delete/:id', component: TecnicoDeleteComponent },


      { path: 'cliente', component: ClienteListComponent },
      { path: 'cliente/create', component: ClienteCreateComponent },
      { path: 'cliente/update/:id', component: ClienteUpdateComponent },
      { path: 'cliente/delete/:id', component: ClienteDeleteComponent },


      { path: 'chamado', component: ChamadoListComponent }, // 👈 Rota da lista de chamados
      { path: 'chamado/create', component: ChamadoCreateComponent },
      { path: 'chamado/update/:id', component: ChamadoUpdateComponent },
      { path: 'chamado/delete/:id', component: ChamadoDeleteComponent },
    ]
  },

  
  { path: '**', redirectTo: 'main/home', pathMatch: 'full' }
];