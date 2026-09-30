import { Pipe, PipeTransform } from '@angular/core';

/** Formatea `metros_cuadrados` (DECIMAL(10,2) -> float) como superficie. */
@Pipe({ name: 'formatoMetros' })
export class FormatoMetrosPipe implements PipeTransform {
  transform(metrosCuadrados: number | null | undefined): string {
    if (metrosCuadrados === null || metrosCuadrados === undefined) {
      return 'Superficie a consultar';
    }

    const superficie = new Intl.NumberFormat('es-AR', {
      maximumFractionDigits: metrosCuadrados % 1 === 0 ? 0 : 2,
    }).format(metrosCuadrados);

    return `${superficie} m²`;
  }
}
