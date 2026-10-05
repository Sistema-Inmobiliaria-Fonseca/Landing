import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';

/**
 * Sobre de respuesta del backend.
 *
 * El backend (App\Core\Response + Controller::respond) SIEMPRE responde
 * `{ success, data }` o `{ success: false, error: { code, message, details } }`.
 * Nunca devuelve el recurso pelado, asi que hay que desenvolver el `data` antes
 * de usar el resultado.
 */
export interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  error?: { code: number; message: string; details?: unknown };
}

/**
 * Cliente HTTP minimo de la Landing.
 *
 * Solo hace una cosa: consultar la API y devolver `data` ya desenvuelto,
 * dejando el mismo manejo de error para todos los servicios.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);

  get<T>(ruta: string): Observable<T> {
    return this.desenvolver(this.http.get<ApiEnvelope<T>>(this.url(ruta)));
  }

  /**
   * El backend puede responder 200 con `success: false` en lugar de un 4xx, asi
   * que el sobre se valida aca y no solo por el status HTTP.
   */
  private desenvolver<T>(source: Observable<ApiEnvelope<T>>): Observable<T> {
    return source.pipe(
      map((response) => {
        if (!response || response.success !== true || response.data === undefined) {
          throw new Error(response?.error?.message ?? 'La API respondio con un formato inesperado.');
        }

        return response.data;
      }),
    );
  }

  private url(ruta: string): string {
    return `${environment.apiBaseUrl}${ruta}`;
  }
}