import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Sin esto no hay HttpClient y `ApiService` no se puede inyectar.
    // La Landing no manda Authorization: las rutas /api/public no lo piden.
    provideHttpClient(),
    // La home es la ruta '' y el detalle de cada propiedad es /propiedades/{id}.
    // anchorScrolling mantiene el salto a las secciones (#contacto, #ubicacion, etc.).
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled' })),
  ],
};
