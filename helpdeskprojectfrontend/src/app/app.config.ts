import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
// 💡 NOVO: Importe o módulo de detecção de mudanças
import { provideZoneChangeDetection } from '@angular/core'; 

import { routes } from './app.routes'; 

export const appConfig: ApplicationConfig = {
  providers: [
    // 💡 SOLUÇÃO PARA O ERRO NG0800: Garante a detecção de mudanças
    // Se o seu projeto foi configurado sem Zone.js (padrão em projetos novos), isso é obrigatório.
    provideZoneChangeDetection({ eventCoalescing: true }), 
    
    // Configuração do Roteador (Que já havíamos corrigido)
    provideRouter(routes), 
  ]
};