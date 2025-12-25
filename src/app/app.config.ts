import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideAuth0 } from  '@auth0/auth0-angular';
import { routes } from './app.routes';
import { CookieService } from 'ngx-cookie-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAuth0({
      domain: 'dev-f12c5wauuqfjonbb.us.auth0.com',
      clientId: 'FVwSCeysDdRwG0YgJ2fTfnCqR8Zie6l4',
      authorizationParams: {
        redirect_uri: "http://localhost:4200/cart"
      }
    }),
  ]
};
