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
        Bem-vindo ao seu sistema Helpdesk!
      </p>
    </div>
  `,
  styles: [``]
})
export class HomeComponent {}