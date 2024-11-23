import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';


import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInyterceptor } from './interceptors/auth-interceptor';
import { provideEnvironmentNgxMask } from 'ngx-mask';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      //adicionando os interceptadores do projeto
      withInterceptors([AuthInyterceptor])
    ),
    provideEnvironmentNgxMask()//para usar a mascara
  ]
};
