import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HeaderComponent } from '../header/header.component'; 

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    HeaderComponent 
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  
}