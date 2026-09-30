import { ChangeDetectionStrategy, Component } from '@angular/core';
import { INMOBILIARIA } from '../../data/inmobiliaria.data';

@Component({
  selector: 'app-location',
  templateUrl: './location.html',
  styleUrl: './location.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationComponent {
  protected readonly inmobiliaria = INMOBILIARIA;

  /** Placeholder: acá se monta el mapa cuando se integre. */
  protected readonly mapaPendiente = true;
}
