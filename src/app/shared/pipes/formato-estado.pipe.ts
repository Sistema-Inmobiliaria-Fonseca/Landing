import { Pipe, PipeTransform } from '@angular/core';
import { EstadoPropiedad } from '../../core/models';

const ETIQUETAS: Record<EstadoPropiedad, string> = {
  disponible: 'Disponible',
  alquilada: 'Alquilada',
  vendida: 'Vendida',
};

/**
 * Traduce el `estado` de la base a su etiqueta en espanol.
 * Los tres valores salen del CHECK constraint de `propiedades`
 * (migrations 002 y 009).
 */
@Pipe({ name: 'formatoEstado' })
export class FormatoEstadoPipe implements PipeTransform {
  transform(estado: EstadoPropiedad | null | undefined): string {
    if (!estado) {
      return '';
    }

    return ETIQUETAS[estado] ?? estado;
  }
}