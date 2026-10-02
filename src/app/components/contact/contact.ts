import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PENDIENTE, SITIO } from '../../data/sitio.data';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  protected readonly sitio = SITIO;
  protected readonly pendiente = PENDIENTE;
}
