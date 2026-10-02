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
}
