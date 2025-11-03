import { Component } from '@angular/core';
// 💡 MUDANÇA #1: RouterLink deve estar no import
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-side-nav',
  standalone: true,

  imports: [
    RouterOutlet,
    // 💡 MUDANÇA #2: RouterLink deve estar no array imports
    RouterLink,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.css',
})
export class SideNav {
  logout() {
    console.log('Usuário deslogado!');
  }
}