import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AboutComponent } from '../about/about';
import { ContactComponent } from '../contact/contact';
import { HeroComponent } from '../hero/hero';
import { LocationComponent } from '../location/location';
import { PropertyCardComponent } from '../property-card/property-card';
import { ServicesComponent } from '../services/services';
import { Categoria, Propiedad, TipoMoneda } from '../../core/models';
import { PropiedadService } from '../../core/services/propiedad.service';

/** Una categoría del catálogo con la cantidad de propiedades que tiene. */
interface CategoriaConTotal {
  id: number;
  nombre: string;
  total: number;
}

/** Opción de un `<select>` derivada de las propiedades cargadas. */
interface OpcionConId {
  id: number;
  nombre: string;
}

/** Opción del filtro de ambientes. */
interface OpcionAmbientes {
  /** 1, 2 o 3 exactos, o `AMBIENTES_MAS` para "4 o más". */
  valor: number;
  etiqueta: string;
}

/** Etiqueta del tramo abierto del filtro de ambientes. */
const AMBIENTES_MAS = 4;

/** Monedas que maneja el filtro de precio. */
const MONEDAS: TipoMoneda[] = ['ARS', 'USD'];

/**
 * Moneda real de la propiedad.
 *
 * `moneda` es NULL en las propiedades cargadas antes de la migration 011 y el
 * pipe `formatoValor` las muestra como ARS, asi que el filtro las cuenta como
 * pesos: si no, quedarian fuera de un rango en ARS que si las muestra en la
 * tarjeta.
 */
function monedaDe(propiedad: Propiedad): TipoMoneda {
  return propiedad.moneda ?? 'ARS';
}

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    PropertyCardComponent,
    AboutComponent,
    ServicesComponent,
    LocationComponent,
    ContactComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly propiedadService = inject(PropiedadService);

  /** Listado completo que devuelve la API. Acá no se filtra. */
  protected readonly propiedades = signal<Propiedad[]>([]);

  /** `true` mientras la peticion esta en vuelo, para no mostrar el estado vacio. */
  protected readonly cargando = signal(true);

  /** Mensaje de error, o `null` si la carga salio bien. */
  protected readonly error = signal<string | null>(null);

  /**
   * Si el panel de filtros está desplegado. Arranca cerrado: la home muestra solo
   * la barra compacta con el botón "Filtrar".
   *
   * Es estado de presentación y no toca ningún filtro: cerrar el panel solo
   * esconde los controles, asi que lo que se habia seleccionado sigue aplicado y
   * al volver a abrirlo se lo encuentra igual.
   */
  protected readonly filtrosAbiertos = signal(false);

  /** Catálogo completo de categorías, tal como lo devuelve la API. */
  protected readonly catalogoCategorias = signal<Categoria[]>([]);

  /** Id de la categoría seleccionada, o `null` para mostrar todas. */
  protected readonly categoriaActiva = signal<number | null>(null);

  /** Solo propiedades aptos a crédito. */
  protected readonly soloCredito = signal(false);

  /**
   * Precio: primero se elige la moneda del rango y despues los extremos.
   * `null` en un extremo significa "sin límite en ese lado".
   *
   * No se comparan monedas distintas entre si: el rango siempre es de UNA moneda
   * y las propiedades de la otra quedan fuera mientras el filtro este puesto.
   */
  protected readonly monedas = MONEDAS;
  protected readonly monedaPrecio = signal<TipoMoneda>('ARS');
  protected readonly precioDesde = signal<number | null>(null);
  protected readonly precioHasta = signal<number | null>(null);

  /** Cantidad de ambientes: un número exacto o `AMBIENTES_MAS`. */
  protected readonly ambientes = signal<number | null>(null);

  /** Superficie en m². `null` en un extremo = sin límite. */
  protected readonly superficieDesde = signal<number | null>(null);
  protected readonly superficieHasta = signal<number | null>(null);

  /** Ubicación. Al cambiar la provincia se limpia la localidad. */
  protected readonly provinciaId = signal<number | null>(null);
  protected readonly localidadId = signal<number | null>(null);

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

  /**
   * Provincias que tienen al menos una propiedad cargada.
   *
   * Se arman desde `ubicacion` (que el backend compone con los JOIN de pais,
   * provincia y localidad) en vez de bajarse de un catálogo aparte: asi el
   * filtro no ofrece destinos sin propiedades y no hace falta pedir nada nuevo.
   */
  protected readonly provincias = computed<OpcionConId[]>(() =>
    this.unicosDe((propiedad) =>
      propiedad.ubicacion
        ? { id: propiedad.ubicacion.provincia.id, nombre: propiedad.ubicacion.provincia.nombre }
        : null,
    ),
  );

  /** Localidades disponibles, acotadas a la provincia elegida si hay alguna. */
  protected readonly localidades = computed<OpcionConId[]>(() => {
    const provincia = this.provinciaId();

    return this.unicosDe((propiedad) => {
      const ubicacion = propiedad.ubicacion;

      if (ubicacion === null || (provincia !== null && ubicacion.provincia.id !== provincia)) {
        return null;
      }

      return { id: ubicacion.localidad.id, nombre: ubicacion.localidad.nombre };
    });
  });

  /**
   * Cantidades de ambientes que existen en el listado. Todo lo que sea 4 o más
   * cae en un único tramo "4 o más", así no se ofrecen opciones al pedo.
   */
  protected readonly opcionesAmbientes = computed<OpcionAmbientes[]>(() => {
    const opciones = new Map<number, OpcionAmbientes>();

    for (const propiedad of this.propiedades()) {
      const cantidad = propiedad.cantidad_ambientes;

      if (cantidad <= 0) {
        continue;
      }

      const valor = cantidad >= AMBIENTES_MAS ? AMBIENTES_MAS : cantidad;

      opciones.set(valor, {
        valor,
        etiqueta: valor === AMBIENTES_MAS ? `${AMBIENTES_MAS} o más` : `${valor}`,
      });
    }

    return [...opciones.values()].sort((a, b) => a.valor - b.valor);
  });

  /** Propiedades que pasan TODOS los filtros activos (se combinan con AND). */
  protected readonly propiedadesFiltradas = computed(() => {
    const categoria = this.categoriaActiva();
    const credito = this.soloCredito();
    const ambientes = this.ambientes();
    const provincia = this.provinciaId();
    const localidad = this.localidadId();
    const precioDesde = this.precioDesde();
    const precioHasta = this.precioHasta();
    const moneda = this.monedaPrecio();
    const superficieDesde = this.superficieDesde();
    const superficieHasta = this.superficieHasta();
    const hayPrecio = precioDesde !== null || precioHasta !== null;

    return this.propiedades().filter((propiedad) => {
      if (categoria !== null && !propiedad.categorias.some((c) => c.id === categoria)) {
        return false;
      }

      if (credito && !propiedad.apto_credito) {
        return false;
      }

      if (ambientes !== null) {
        const cantidad = propiedad.cantidad_ambientes;
        const cumple = ambientes >= AMBIENTES_MAS ? cantidad >= ambientes : cantidad === ambientes;

        if (!cumple) {
          return false;
        }
      }

      if (hayPrecio) {
        // El rango es de una sola moneda: una propiedad en la otra no se
        // descarta por ser "caro" sino porque su número no es comparable.
        if (monedaDe(propiedad) !== moneda || propiedad.valor === null) {
          return false;
        }

        if (precioDesde !== null && propiedad.valor < precioDesde) {
          return false;
        }

        if (precioHasta !== null && propiedad.valor > precioHasta) {
          return false;
        }
      }

      if (superficieDesde !== null || superficieHasta !== null) {
        const superficie = propiedad.metros_cuadrados;

        if (superficie === null) {
          return false;
        }

        if (superficieDesde !== null && superficie < superficieDesde) {
          return false;
        }

        if (superficieHasta !== null && superficie > superficieHasta) {
          return false;
        }
      }

      if (provincia !== null || localidad !== null) {
        const ubicacion = propiedad.ubicacion;

        if (ubicacion === null) {
          return false;
        }

        if (provincia !== null && ubicacion.provincia.id !== provincia) {
          return false;
        }

        if (localidad !== null && ubicacion.localidad.id !== localidad) {
          return false;
        }
      }

      return true;
    });
  });

  /** `true` si hay al menos un filtro puesto, para poder ofrecer "Todos"/"Limpiar". */
  protected readonly hayFiltros = computed(
    () =>
      this.categoriaActiva() !== null ||
      this.soloCredito() ||
      this.precioDesde() !== null ||
      this.precioHasta() !== null ||
      this.ambientes() !== null ||
      this.superficieDesde() !== null ||
      this.superficieHasta() !== null ||
      this.provinciaId() !== null ||
      this.localidadId() !== null,
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

  /** Abre o cierra el panel de filtros. */
  protected alternarFiltros(): void {
    this.filtrosAbiertos.update((abierto) => !abierto);
  }

  protected alternarCredito(): void {
    this.soloCredito.update((activo) => !activo);
  }

  protected cambiarMonedaPrecio(moneda: TipoMoneda): void {
    this.monedaPrecio.set(moneda);
  }

  protected cambiarAmbientes(valor: number | null): void {
    this.ambientes.set(valor);
  }

  protected precioDesdeIngresado(valor: string): void {
    this.precioDesde.set(this.numeroOpcional(valor));
  }

  protected precioHastaIngresado(valor: string): void {
    this.precioHasta.set(this.numeroOpcional(valor));
  }

  protected superficieDesdeIngresado(valor: string): void {
    this.superficieDesde.set(this.numeroOpcional(valor));
  }

  protected superficieHastaIngresado(valor: string): void {
    this.superficieHasta.set(this.numeroOpcional(valor));
  }

  protected cambiarProvincia(valor: string): void {
    this.provinciaId.set(this.idOpcional(valor));
    // La localidad cuelga de la provincia: si queda puesta, apuntaría a un
    // destino que ya no está elegido y dejaría el combo desincronizado.
    this.localidadId.set(null);
  }

  protected cambiarLocalidad(valor: string): void {
    this.localidadId.set(this.idOpcional(valor));
  }

  protected limpiarFiltros(): void {
    this.categoriaActiva.set(null);
    this.soloCredito.set(false);
    this.monedaPrecio.set('ARS');
    this.precioDesde.set(null);
    this.precioHasta.set(null);
    this.ambientes.set(null);
    this.superficieDesde.set(null);
    this.superficieHasta.set(null);
    this.provinciaId.set(null);
    this.localidadId.set(null);
  }

  /** Números distintos ordenados por nombre, ignorando los que no aplican. */
  private unicosDe(
    extraer: (propiedad: Propiedad) => { id: number; nombre: string } | null,
  ): OpcionConId[] {
    const porId = new Map<number, string>();

    for (const propiedad of this.propiedades()) {
      const opcion = extraer(propiedad);

      if (opcion !== null) {
        porId.set(opcion.id, opcion.nombre);
      }
    }

    return [...porId]
      .map(([id, nombre]) => ({ id, nombre }))
      .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
  }

  /** Texto de un campo numérico a número, o `null` si está vacío o no es número. */
  private numeroOpcional(valor: string): number | null {
    const numero = Number(valor);

    return valor.trim() !== '' && Number.isFinite(numero) ? numero : null;
  }

  /** Valor de un `<select>` a id, o `null` para la opción "Todas". */
  private idOpcional(valor: string): number | null {
    return valor === '' ? null : Number(valor);
  }
}
