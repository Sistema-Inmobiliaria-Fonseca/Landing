import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITIO } from '../../data/sitio.data';

@Component({
  selector: 'app-location',
  templateUrl: './location.html',
  styleUrl: './location.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationComponent {
  protected readonly sitio = SITIO;
}