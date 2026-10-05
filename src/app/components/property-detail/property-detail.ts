import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { ImagenPropiedad, Propiedad } from '../../core/models';
import { PropiedadService } from '../../core/services/propiedad.service';
import { FormatoEstadoPipe } from '../../shared/pipes/formato-estado.pipe';
import { FormatoMetrosPipe } from '../../shared/pipes/formato-metros.pipe';
import { FormatoUbicacionPipe } from '../../shared/pipes/formato-ubicacion.pipe';
import { FormatoValorPipe } from '../../shared/pipes/formato-valor.pipe';

/** WhatsApp de la inmobiliaria: 54 (Argentina) + 3534773448. */
const WHATSAPP = '543534773448';

/**
 * Detalle de una propiedad.
 *
 * El id viene de la ruta /propiedades/:id y se pide con
 * GET /api/public/propiedades/{id}, que devuelve la misma `Propiedad` que el
 * listado, así que se reaprovechan los pipes del sitio.
 */
@Component({
  selector: 'app-property-detail',
  imports: [RouterLink, FormatoValorPipe, FormatoMetrosPipe, FormatoUbicacionPipe, FormatoEstadoPipe],
  templateUrl: './property-detail.html',
  styleUrl: './property-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly propiedadService = inject(PropiedadService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly propiedad = signal<Propiedad | null>(null);

  /** `true` mientras la peticion esta en vuelo, para no mostrar el estado vacio. */
  protected readonly cargando = signal(true);

  /** Mensaje de error, o `null` si la carga salio bien. */
  protected readonly error = signal<string | null>(null);

  /**
   * Todas las fotos de la propiedad, ya en el orden que las devuelve el backend
   * (`dePropiedad()` ordena por `orden` ASC y `es_principal` es la de `orden` 1),
   * asi que la primera es siempre la principal.
   */
  protected readonly galeria = computed<ImagenPropiedad[]>(() => this.propiedad()?.imagenes ?? []);

  /** Indice dentro de `galeria` de la foto que se muestra grande. */
  protected readonly indiceActiva = signal(0);

  /**
   * Foto grande. Arranca en la principal (indice 0) y cambia al hacer click en
   * una miniatura. El fallback cubre que el indice quede desfasado.
   */
  protected readonly fotoActiva = computed<ImagenPropiedad | null>(() => {
    const imagenes = this.galeria();

    return imagenes[this.indiceActiva()] ?? imagenes[0] ?? null;
  });

  protected seleccionarFoto(indice: number): void {
    this.indiceActiva.set(indice);
  }

  /**
   * Link de WhatsApp con el mensaje ya armado para la propiedad que se está
   * viendo. El texto va con `encodeURIComponent` porque las comillas, los acentos
   * y los espacios no son válidos tal cual en la query string.
   *
   * Arma la misma ubicacion que `FormatoUbicacionPipe` (localidad, provincia) para
   * que el mensaje no difiera de lo que se muestra en pantalla.
   */
  protected readonly urlWhatsapp = computed<string | null>(() => {
    const propiedad = this.propiedad();

    if (propiedad === null) {
      return null;
    }

    const ubicacion =
      [propiedad.ubicacion?.localidad?.nombre, propiedad.ubicacion?.provincia?.nombre]
        .filter((nombre): nombre is string => Boolean(nombre))
        .join(', ') || 'ubicación a consultar';

    const mensaje = `Hola, quisiera consultar por la propiedad "${propiedad.nombre}" ubicada en ${ubicacion}.`;

    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
  });

  constructor() {
    // Reacciona al cambio de id: asi funciona tambien si se navega de un detalle
    // a otro sin pasar por la home.
    this.route.paramMap
      .pipe(
        map((params) => Number(params.get('id'))),
        tap(() => {
          this.propiedad.set(null);
          this.cargando.set(true);
          this.error.set(null);
          this.indiceActiva.set(0);
        }),
        switchMap((id) =>
          Number.isInteger(id) && id > 0
            ? this.propiedadService.buscar(id).pipe(catchError(() => of(null)))
            : of(null),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((propiedad) => {
        this.cargando.set(false);
        this.propiedad.set(propiedad);

        if (propiedad === null) {
          this.error.set(
            'No pudimos mostrar esta propiedad. Puede que ya no esté disponible.',
          );
        }
      });
  }
}
