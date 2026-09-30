import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Propiedad } from '../../core/models';
import { FormatoEstadoPipe } from '../../shared/pipes/formato-estado.pipe';
import { FormatoMetrosPipe } from '../../shared/pipes/formato-metros.pipe';
import { FormatoUbicacionPipe } from '../../shared/pipes/formato-ubicacion.pipe';
import { FormatoValorPipe } from '../../shared/pipes/formato-valor.pipe';

@Component({
  selector: 'app-property-card',
  imports: [FormatoValorPipe, FormatoMetrosPipe, FormatoUbicacionPipe, FormatoEstadoPipe],
  templateUrl: './property-card.html',
  styleUrl: './property-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyCardComponent {
  /** Propiedad tal como la devuelve GET /api/propiedades. */
  readonly propiedad = input.required<Propiedad>();

  /**
   * El backend no expone imágenes, por eso la "foto" es un placeholder
   * visual derivado de la categoría. Es la única transformación de este
   * componente que no viene del contrato.
   */
  protected readonly tono = computed(() => {
    const [primera] = this.propiedad().categorias;

    return primera ? (primera.id % 4) + 1 : 1;
  });

  protected readonly categoriaPrincipal = computed(
    () => this.propiedad().categorias[0]?.nombre ?? 'Propiedad',
  );

  protected readonly categoriasRestantes = computed(() => {
    const restantes = this.propiedad().categorias.slice(1);

    return restantes.length > 0 ? `+${restantes.length}` : null;
  });
}
