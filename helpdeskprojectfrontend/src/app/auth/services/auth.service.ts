// src/app/auth/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credenciais } from '../../models/credenciais';
import { API_CONFIG } from '../../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  // Faz a requisição de login ao backend
  authenticate(creds: Credenciais) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, { responseType: 'text' });
  }

  // Salva o token no localStorage
  successfulLogin(authToken: string) {
    localStorage.setItem('token', authToken);
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }

  // Logout do usuário
  logout() {
    localStorage.removeItem('token');
  }
}
