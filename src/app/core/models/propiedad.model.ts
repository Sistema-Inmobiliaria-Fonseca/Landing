import { CategoriaPropiedad } from './categoria.model';
import { ImagenPropiedad } from './imagen.model';
import { Ubicacion } from './ubicacion.model';

/**
 * Estados permitidos por el CHECK constraint de la base:
 *   database/migrations/002_create_propiedades_table.sql
 *     CHECK (estado IN ('disponible', 'alquilada'))
 *   database/migrations/009_allow_vendida_estado_propiedades.sql
 *     reemplaza el CHECK por: CHECK (estado IN ('disponible','alquilada','vendida'))
 *
 * Tambien valida App\Services\PropiedadService::RULES ('in:disponible,alquilada,vendida').
 */
export type EstadoPropiedad = 'disponible' | 'alquilada' | 'vendida';

/**
 * Propiedad inmobiliaria.
 *
 * Fuente de verdad: database/migrations/002_create_propiedades_table.sql
 *                   database/migrations/007_add_localidad_id_to_propiedades_table.sql
 *                   App\Services\PropiedadService::formatear()
 *
 * Contrato: GET /api/public/propiedades      ->  array de Propiedad
 *           GET /api/public/propiedades/{id} ->  Propiedad
 *
 * IMPORTANTE: el backend responde dentro de un sobre `{ success, data }`. Por eso
 * el tipo de la respuesta cruda NO es este: lo desenvuelve `PropiedadService`.
 *
 * NOTA: `ubicacion`, `categorias` e `imagenes` no son columnas. Los arma el
 * service en base a los JOIN y a las tablas `categoria_propiedad` y
 * `propiedad_imagenes`.
 */
export interface Propiedad {
  id: number;
  nombre: string;
  localidad_id: number | null;
  metros_cuadrados: number | null;
  valor: number | null;
  cantidad_habitaciones: number;
  cantidad_ambientes: number;
  descripcion: string | null;
  apto_credito: boolean;
  estado: EstadoPropiedad;
  created_at: string;
  updated_at: string;
  ubicacion: Ubicacion | null;
  categorias: CategoriaPropiedad[];
  imagenes: ImagenPropiedad[];
}

/** Fotografia principal de la propiedad, o `null` si todavia no subio ninguna. */
export function imagenPrincipal(propiedad: Propiedad): ImagenPropiedad | null {
  return propiedad.imagenes.find((imagen) => imagen.es_principal) ?? propiedad.imagenes[0] ?? null;
}

/** Claves de los campos aceptados al crear/actualizar: App\Services\PropiedadService::RULES. */
export type PropiedadPayload = Pick<
  Propiedad,
  | 'nombre'
  | 'localidad_id'
  | 'metros_cuadrados'
  | 'valor'
  | 'cantidad_habitaciones'
  | 'cantidad_ambientes'
  | 'descripcion'
  | 'apto_credito'
  | 'estado'
> & { categorias?: number[] };