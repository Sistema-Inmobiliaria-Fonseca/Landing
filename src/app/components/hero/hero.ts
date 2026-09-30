import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  protected readonly indicadores = [
    { valor: '+15', etiqueta: 'Años de experiencia' },
    { valor: '+1.200', etiqueta: 'Operaciones cerradas' },
    { valor: '7', etiqueta: 'Tipos de propiedad' },
  ];
}
