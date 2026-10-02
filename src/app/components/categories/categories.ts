import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Categoria } from '../../core/models';
import { CATEGORIAS } from '../../data/categorias.data';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent {
  /**
   * Categorias definidas en el sistema (Backend-/database/seeds).
   * Cuando exista la API, pasar `[categorias]="categoriasDesdeApi"`.
   */
  readonly categorias = input<Categoria[]>(CATEGORIAS);

  /**
   * purely visual: asocia un ícono al `nombre` de la categoría.
   * No agrega ningún campo al contrato de la API.
   */
  private readonly iconos: Record<string, string> = {
    Lotes: 'M3 7l6-3 6 3 6-3v13l-6 3-6-3-6 3zM9 4v13M15 7v13',
    Casas: 'M3 10.5 12 3l9 7.5M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5M10 21v-6h4v6',
    Departamentos:
      'M4 21V6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v15M15 10h4a1 1 0 0 1 1 1v10M7 9h2M7 13h2M7 17h2M17 14h1M17 18h1',
    Locales: 'M4 9h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9zM3 9l1.6-5h14.8L21 9M9 21v-6h6v6',
    Oficinas: 'M4 8h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zM9 8V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18',
    Campos: 'M3 20h18M6 20v-6h12v6M12 14V9M12 9 9 11.5h6z',
    'Dúplex': 'M4 21V8l8-5 8 5v13M4 13h16',
  };

  protected icono(nombre: string): string {
    return this.iconos[nombre] ?? 'M4 21V8l8-5 8 5v13M4 13h16';
  }
}
