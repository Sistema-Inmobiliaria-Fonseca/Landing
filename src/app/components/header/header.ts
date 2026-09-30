import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { INMOBILIARIA } from '../../data/inmobiliaria.data';
import { NAVEGACION } from '../../data/navegacion.data';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly navegacion = NAVEGACION;
  protected readonly inmobiliaria = INMOBILIARIA;
  protected readonly menuAbierto = signal(false);

  protected alternarMenu(): void {
    this.menuAbierto.update((abierto) => !abierto);
  }

  protected cerrarMenu(): void {
    this.menuAbierto.set(false);
  }
}
