import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'; // Importar withInterceptors
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor'; // Importar o interceptor criado

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimations(),
    
    // Configuração do HttpClient com o Interceptor
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor]) 
    ),
    
    provideToastr({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    })
  ]
};