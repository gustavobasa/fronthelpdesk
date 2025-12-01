import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credenciais } from '../models/credenciais';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object // Injetamos o identificador da plataforma
  ) { }

  // Faz a requisição de login ao backend
  authenticate(creds: Credenciais) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
      observe: 'response',
      responseType: 'text'
    });
  }

  // Salva o token no localStorage
  successfulLogin(authToken: string) {
    // Remove o prefixo Bearer se existir
    if (authToken.startsWith('Bearer ')) {
      authToken = authToken.substring(7);
    }
    
    // VERIFICAÇÃO: Só salva se estivermos no navegador
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', authToken);
    }
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): boolean {
    // VERIFICAÇÃO: Se for no servidor (SSR), retorna falso para não quebrar
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    // Agora é seguro acessar o localStorage
    const token = localStorage.getItem('token');
    if (token) {
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }

  // Logout do usuário
  logout() {
    // VERIFICAÇÃO: Só limpa se estivermos no navegador
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }
}