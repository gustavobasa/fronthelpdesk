import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Service do Toastr
import { ToastrService } from 'ngx-toastr';

// Auth Service
import { AuthService } from '../../services/auth.service';

// Model
import { Credenciais } from '../../models/credenciais';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  validaCampos(): boolean {
    return this.form.valid;
  }

  onSubmit() {
    if (this.validaCampos()) {
      const credenciais: Credenciais = this.form.value;

      // --- MUDANÇA REALIZADA (PASSO 35) ---
      // Agora chamamos o authenticate de verdade e aguardamos a resposta do Backend
      this.authService.authenticate(credenciais).subscribe({
        next: (resposta) => {
          // O Spring Security envia o token no Header 'Authorization'
          const token = resposta.headers.get('Authorization');
          
          if (token) {
             // 1. Salva o token real
             this.authService.successfulLogin(token);
             
             // 2. Redireciona para o layout principal
             this.router.navigate(['main']);
             this.toastr.success('Bem-vindo!', 'Login realizado');
          } else {
             this.toastr.error('Erro ao receber token', 'Falha na comunicação');
          }
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Usuário e/ou senha inválidos');
          // Limpa a senha para facilitar nova tentativa
          this.form.get('senha')?.setValue(''); 
          this.form.markAllAsTouched();
        }
      });
    } 
  }
}