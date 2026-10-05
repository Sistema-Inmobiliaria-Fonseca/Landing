import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AboutComponent } from './components/about/about';
import { ContactComponent } from './components/contact/contact';
import { FooterComponent } from './components/footer/footer';
import { HeaderComponent } from './components/header/header';
import { HeroComponent } from './components/hero/hero';
import { LocationComponent } from './components/location/location';
import { PropertyCardComponent } from './components/property-card/property-card';
import { ServicesComponent } from './components/services/services';
import { Categoria, Propiedad } from './core/models';
import { PropiedadService } from './core/services/propiedad.service';

/** Una categoría del catálogo con la cantidad de propiedades que tiene. */
interface CategoriaConTotal {
  id: number;
  nombre: string;
  total: number;
}

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    HeroComponent,
    PropertyCardComponent,
    AboutComponent,
    ServicesComponent,
    LocationComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private readonly propiedadService = inject(PropiedadService);

  /** Listado completo que devuelve la API. Acá no se filtra. */
  protected readonly propiedades = signal<Propiedad[]>([]);

  /** `true` mientras la peticion esta en vuelo, para no mostrar el estado vacio. */
  protected readonly cargando = signal(true);

  /** Mensaje de error, o `null` si la carga salio bien. */
  protected readonly error = signal<string | null>(null);

  /** Catálogo completo de categorías, tal como lo devuelve la API. */
  protected readonly catalogoCategorias = signal<Categoria[]>([]);

  /** Id de la categoría seleccionada, o `null` para mostrar todas. */
  protected readonly categoriaActiva = signal<number | null>(null);

  /** Solo propiedades aptos a crédito. */
  protected readonly soloCredito = signal(false);

  /**
   * Todas las categorías del catálogo con su contador de propiedades, incluidas
   * las que no tienen ninguna (muestran 0).
   *
   * El listado sale de `GET /api/public/categorias` y el conteo se calcula sobre
   * las propiedades ya cargadas. Así el filtro no depende de que haya propiedades
   * cargadas y no aparecen categorías que el sistema ya no usa.
   */
  protected readonly categorias = computed<CategoriaConTotal[]>(() => {
    const conteo = new Map<number, number>();

    for (const propiedad of this.propiedades()) {
      for (const categoria of propiedad.categorias) {
        conteo.set(categoria.id, (conteo.get(categoria.id) ?? 0) + 1);
      }
    }

    return this.catalogoCategorias()
      .map((categoria) => ({
        id: categoria.id,
        nombre: categoria.nombre,
        total: conteo.get(categoria.id) ?? 0,
      }))
      .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
  });

  /** Propiedades que pasan los filtros activos. */
  protected readonly propiedadesFiltradas = computed(() => {
    const categoria = this.categoriaActiva();
    const credito = this.soloCredito();

    return this.propiedades().filter(
      (propiedad) =>
        (categoria === null || propiedad.categorias.some((c) => c.id === categoria)) &&
        (!credito || propiedad.apto_credito),
    );
  });

  /** `true` si hay al menos un filtro puesto, para poder ofrecer "Limpiar". */
  protected readonly hayFiltros = computed(
    () => this.categoriaActiva() !== null || this.soloCredito(),
  );

  /** El filtro de categoría solo tiene sentido si hay más de una categoría. */
  protected readonly hayVariasCategorias = computed(() => this.categorias().length > 1);

  /**
   * Cuántas propiedades son apto a crédito. Se muestra en el chip aunque sea 0,
   * para que el filtro quede siempre visible y se entienda que hoy no hay
   * propiedades con financiación.
   */
  protected readonly creditoTotal = computed(
    () => this.propiedades().filter((propiedad) => propiedad.apto_credito).length,
  );

  ngOnInit(): void {
    // El catálogo y el listado van en paralelo: los filtros solo se dibujan
    // cuando ambos respondieron, así no aparecen chips que después cambian.
    forkJoin({
      propiedades: this.propiedadService.listar(),
      categorias: this.propiedadService.listarCategorias(),
    }).subscribe({
      next: ({ propiedades, categorias }) => {
        this.propiedades.set(propiedades);
        this.catalogoCategorias.set(categorias);
        this.cargando.set(false);
      },
      error: () => {
        this.propiedades.set([]);
        this.cargando.set(false);
        this.error.set(
          'No pudimos cargar las propiedades en este momento. Intentá de nuevo más tarde o escribinos.',
        );
      },
    });
  }

  protected seleccionarCategoria(id: number | null): void {
    this.categoriaActiva.set(id);
  }

  protected alternarCredito(): void {
    this.soloCredito.update((activo) => !activo);
  }

  protected limpiarFiltros(): void {
    this.categoriaActiva.set(null);
    this.soloCredito.set(false);
  }
}