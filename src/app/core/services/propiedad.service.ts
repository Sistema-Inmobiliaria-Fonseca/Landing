import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Categoria, Propiedad } from '../models';
import { ApiService } from './api.service';

/**
 * Lectura de propiedades y categorias para el sitio publico.
 *
 * Usa las rutas `/api/public/...` y no `/api/...`: las del panel exigen un token
 * Bearer y la Landing no tiene sesion (ver Backend-/routes/api.php). En
 * desarrollo el proxy las reenvia al backend, asi que la URL es relativa.
 */
@Injectable({ providedIn: 'root' })
export class PropiedadService {
  private readonly api = inject(ApiService);

  listar(): Observable<Propiedad[]> {
    return this.api.get<Propiedad[]>('/api/public/propiedades');
  }

  buscar(id: number): Observable<Propiedad> {
    return this.api.get<Propiedad>(`/api/public/propiedades/${id}`);
  }

  listarCategorias(): Observable<Categoria[]> {
    return this.api.get<Categoria[]>('/api/public/categorias');
  }
}