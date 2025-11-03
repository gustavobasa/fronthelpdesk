import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; background-color: #f7f7f7; border-radius: 8px;">
      <h1 style="font-size: 24px; color: #333; margin-bottom: 15px;">Página Principal do Helpdesk</h1>
      <p style="color: #666;">
        Esta tela está sendo carregada dentro do seu SideNav (layout principal) após o login.
        Isso significa que o roteamento e o RouterOutlet estão funcionando corretamente!
      </p>
      <button style="background-color: #007bff; color: white; padding: 10px 15px; border: none; border-radius: 5px; cursor: pointer; margin-top: 15px;">
        Testar Navegação Interna
      </button>
    </div>
  `,
  styles: [``]
})
export class HomeComponent {}