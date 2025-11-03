import { Component, signal } from '@angular/core';
// 💡 MUDANÇA: Importe o RouterOutlet para habilitar o roteamento no template.
import { RouterOutlet } from '@angular/router'; 
// import { Login } from './components/login/login'; // Não precisa mais importar o Login aqui

@Component({
  standalone: true,
  selector: 'app-root',
  // 💡 MUDANÇA: Substitua o 'Login' pelo 'RouterOutlet'
  imports: [RouterOutlet], 
  template: `
    <!-- 💡 CORREÇÃO: Esta tag agora injeta o componente correspondente à URL,
        seja o Login (para '/login') ou o SideNav (para '/main'). -->
    <router-outlet></router-outlet> 
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('helpdeskprojectfrontend');
}
