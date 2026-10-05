import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImagenPropiedad, Propiedad, imagenPrincipal } from '../../core/models';
import { FormatoEstadoPipe } from '../../shared/pipes/formato-estado.pipe';
import { FormatoMetrosPipe } from '../../shared/pipes/formato-metros.pipe';
import { FormatoUbicacionPipe } from '../../shared/pipes/formato-ubicacion.pipe';
import { FormatoValorPipe } from '../../shared/pipes/formato-valor.pipe';

@Component({
  selector: 'app-property-card',
  imports: [RouterLink, FormatoValorPipe, FormatoMetrosPipe, FormatoUbicacionPipe, FormatoEstadoPipe],
  templateUrl: './property-card.html',
  styleUrl: './property-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyCardComponent {
  /** Propiedad tal como la devuelve GET /api/public/propiedades. */
  readonly propiedad = input.required<Propiedad>();

  /**
   * Foto principal. El backend ya la marca con `es_principal` y entrega la `url`
   * absoluta, asi que la tarjeta no arma ninguna ruta.
   *
   * Si la propiedad todavia no tiene fotos, queda `null` y la plantilla muestra
   * el placeholder de silueta.
   */
  protected readonly foto = computed<ImagenPropiedad | null>(() => imagenPrincipal(this.propiedad()));

  /** Cuantas fotos hay en total, para avisar "1 de N" en la esquina. */
  protected readonly totalFotos = computed(() => this.propiedad().imagenes.length);

  /**
   * Tono del placeholder, derivado de la categoria. Solo se usa cuando la
   * propiedad no tiene imagenes.
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