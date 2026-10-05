import { Pipe, PipeTransform } from '@angular/core';

import { TipoMoneda } from '../../core/models';

/**
 * Formatea `valor` para mostrarlo como moneda.
 * El valor llega crudo desde la API (DECIMAL(14,2) -> float). Este pipe solo
 * lo presenta; nunca modifica el dato del contrato.
 *
 * `moneda` decide el simbolo (`$` para ARS, `US$` para USD). Las propiedades
 * cargadas antes de la migration 011 la traen en `null` y se muestran como ARS.
 */
@Pipe({ name: 'formatoValor' })
export class FormatoValorPipe implements PipeTransform {
  transform(valor: number | null | undefined, moneda: TipoMoneda | null = 'ARS'): string {
    if (valor === null || valor === undefined) {
      return 'Valor a consultar';
    }

    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: moneda ?? 'ARS',
      maximumFractionDigits: 0,
    }).format(valor);
  }
}
