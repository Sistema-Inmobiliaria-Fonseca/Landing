import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PENDIENTE } from '../../data/sitio.data';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  protected readonly pendiente = PENDIENTE;
}
