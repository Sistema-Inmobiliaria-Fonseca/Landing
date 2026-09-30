import { ChangeDetectionStrategy, Component } from '@angular/core';
import { INMOBILIARIA } from '../../data/inmobiliaria.data';
import { NAVEGACION } from '../../data/navegacion.data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  protected readonly inmobiliaria = INMOBILIARIA;
  protected readonly navegacion = NAVEGACION;

  protected readonly anioActual = new Date().getFullYear();

  protected readonly iconosRed: Record<string, string> = {
    facebook: 'M14 8.5V7c0-.8.2-1.2 1.4-1.2H17V3h-2.6C11.9 3 11 4.3 11 6.7v1.8H9V11h2v10h3V11h2.3l.3-2.5H14Z',
    instagram:
      'M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm4.5 5.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Zm5.2-.9h.01',
    linkedin:
      'M6.9 8.6H4V20h2.9V8.6ZM5.4 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM20 13.7c0-3.2-1.7-4.7-4-4.7a3.4 3.4 0 0 0-3.1 1.7V8.6H10V20h2.9v-5.8c0-1.5.3-2.9 2.1-2.9 1.7 0 1.8 1.6 1.8 3V20H20v-6.3Z',
  };
}
