import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FRONTEND_ADMIN_LOGIN } from '../../core/config/app-urls.config';
import { NAVEGACION } from '../../data/navegacion.data';
import { SITIO } from '../../data/sitio.data';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly navegacion = NAVEGACION;
  protected readonly sitio = SITIO;
  protected readonly loginAdmin = FRONTEND_ADMIN_LOGIN;
  protected readonly menuAbierto = signal(false);

  protected alternarMenu(): void {
    this.menuAbierto.update((abierto) => !abierto);
  }

  protected cerrarMenu(): void {
    this.menuAbierto.set(false);
  }
}
