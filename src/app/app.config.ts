import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Sin esto no hay HttpClient y `ApiService` no se puede inyectar.
    // La Landing no manda Authorization: las rutas /api/public no lo piden.
    provideHttpClient(),
  ],
};