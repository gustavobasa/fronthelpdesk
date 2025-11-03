import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // 👈 PRECISA ESTAR IMPORTADO

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router // 👈 Injete o Router
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      senha: ['']
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      
      // 👈 AÇÃO DE REDIRECIONAMENTO!
      this.router.navigate(['/main']); 
      
    } else {
      console.log('Form inválido');
    }
  }
}