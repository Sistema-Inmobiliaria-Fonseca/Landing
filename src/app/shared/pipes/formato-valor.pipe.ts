import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formatea `valor` para mostrarlo como moneda.
 * El valor llega crudo desde la API (DECIMAL(14,2) -> float). Este pipe solo
 * lo presenta; nunca modifica el dato del contrato.
 */
@Pipe({ name: 'formatoValor' })
export class FormatoValorPipe implements PipeTransform {
  transform(valor: number | null | undefined): string {
    if (valor === null || valor === undefined) {
      return 'Valor a consultar';
    }

    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(valor);
  }
}
