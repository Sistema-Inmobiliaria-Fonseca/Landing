import { ChangeDetectionStrategy, Component } from '@angular/core';
import { INMOBILIARIA } from '../../data/inmobiliaria.data';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  protected readonly inmobiliaria = INMOBILIARIA;
}
