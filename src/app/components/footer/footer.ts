import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NAVEGACION } from '../../data/navegacion.data';
import { SITIO } from '../../data/sitio.data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  protected readonly sitio = SITIO;
  protected readonly navegacion = NAVEGACION;

  protected readonly anioActual = new Date().getFullYear();

  /**
   * El teléfono se guarda ya formateado para leer ("+54 353 421-9291"), así que
   * el href se arma sacando todo lo que no sea dígito o signo más.
   */
  protected readonly telefonoEnlace = SITIO.telefono
    ? `tel:${SITIO.telefono.replace(/[^\d+]/g, '')}`
    : null;
}