import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { SideNav } from './components/side-nav/side-nav';
// 👈 IMPORTAR O NOVO COMPONENTE:
import { HomeComponent } from './components/home/home.component'; 

export const routes: Routes = [
  // 1. Rota de Login
  { path: 'login', component: Login },
  
  // 2. Rota Principal / Layout da Aplicação
  { 
    path: 'main', // Esta será a rota de destino do login
    component: SideNav, // Carrega o seu componente com o menu e o <router-outlet>
    children: [
      // Se acessar '/main', redireciona internamente para '/main/home'
      { path: '', redirectTo: 'home', pathMatch: 'full' }, 
      
      // Rotas de Conteúdo que preenchem o <router-outlet> do SideNav
      { path: 'home', component: HomeComponent },
      
      // Adicione aqui outras rotas filhas, ex:
      // { path: 'tecnico', component: TecnicoComponent },
    ]
  },
  
  // 3. Rota Padrão: Redireciona a raiz (URL vazia) para o Login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  // 4. Curinga
  { path: '**', redirectTo: '/login' } 
];