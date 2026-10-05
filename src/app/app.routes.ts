import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home';
import { PropertyDetailComponent } from './components/property-detail/property-detail';

/**
 * Rutas de la Landing.
 *
 * El `:id` es `propiedades.id`, el mismo que devuelve GET /api/public/propiedades.
 * Cualquier ruta desconocida vuelve a la home.
 */
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'propiedades/:id', component: PropertyDetailComponent },
  { path: '**', redirectTo: '' },
];
