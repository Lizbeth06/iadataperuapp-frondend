import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JwtModule } from '@auth0/angular-jwt';

import { routes } from './app.routes';
import { ServerErrorInterceptor } from './interceptor/server.error.interceptor';
import { environment } from '../environments/environment';

export function tokenGetter() {
  if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(environment.TOKEN_NAME);
  }
  return null;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['https://iadataperu.com/bk', 'localhost:9090'], 
          disallowedRoutes: [
            'https://iadataperu.com/bk/login/forget',
            'http://localhost:9090/login/forget'
          ],
        },
      })
    )
  ],
};