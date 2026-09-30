import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  protected readonly destacados = [
    { valor: '2011', etiqueta: 'Fundación' },
    { valor: '35', etiqueta: 'Consultores' },
    { valor: '98%', etiqueta: 'Operaciones con éxito' },
  ];
}
