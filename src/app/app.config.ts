import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment.development';
import { LoginService } from './services/login.service';
import { ServerErrorInterceptor } from './interceptor/server.error.interceptor';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter(){
  return sessionStorage.getItem(environment.TOKEN_NAME);
}

export function appInitializer(loginService: LoginService) {
  sessionStorage.clear();//agrege este
  return () => {
    const rawToken = sessionStorage.getItem(environment.TOKEN_NAME);
    if (!rawToken) {
      return firstValueFrom(loginService.login('47338697', 'contra')).then(res => {
        sessionStorage.setItem(environment.TOKEN_NAME, res.access_token);
      }).catch(err => {
      });
    }
    return Promise.resolve();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideHttpClient(), //Registro de módulo HTTP
    provideHttpClient(withInterceptorsFromDi()),
    { provide: LOCALE_ID, useValue: 'es' },

    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [LoginService],
      multi: true
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true
    },
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          //allowedDomains: ["172.16.10.112:83"], // sin http
          //disallowedRoutes: ["172.16.10.112:83/api/login/forget"], //prod
          allowedDomains: ["localhost:9090"],
          disallowedRoutes: ["http://localhost:9090/login/forget"],
        },
      }),
    )
  ]
};
