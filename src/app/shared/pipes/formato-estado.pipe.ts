import { Pipe, PipeTransform } from '@angular/core';
import { EstadoPropiedad } from '../../core/models';

const ETIQUETAS: Record<EstadoPropiedad, string> = {
  disponible: 'Disponible',
  alquilada: 'Alquilada',
};

/** Traduce el `estado` de la base ('disponible' | 'alquilada') a su etiqueta en espanol. */
@Pipe({ name: 'formatoEstado' })
export class FormatoEstadoPipe implements PipeTransform {
  transform(estado: EstadoPropiedad | null | undefined): string {
    if (!estado) {
      return '';
    }

    return ETIQUETAS[estado] ?? estado;
  }
}
