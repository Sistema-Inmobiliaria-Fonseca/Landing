import { Pipe, PipeTransform } from '@angular/core';
import { Ubicacion } from '../../core/models';

/**
 * Colapsa el arbol `ubicacion` (pais/provincia/localidad) a un texto legible.
 * `ubicacion` llega como null cuando la propiedad no tiene localidad.
 */
@Pipe({ name: 'formatoUbicacion' })
export class FormatoUbicacionPipe implements PipeTransform {
  transform(ubicacion: Ubicacion | null | undefined): string {
    if (!ubicacion) {
      return 'Ubicación a consultar';
    }

    return [ubicacion.localidad?.nombre, ubicacion.provincia?.nombre]
      .filter((nombre): nombre is string => Boolean(nombre))
      .join(', ');
  }
}
