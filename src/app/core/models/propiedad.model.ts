import { CategoriaPropiedad } from './categoria.model';
import { Ubicacion } from './ubicacion.model';

/**
 * Estados permitidos por el CHECK constraint de la base:
 * database/migrations/002_create_propiedades_table.sql
 *   CONSTRAINT chk_propiedades_estado CHECK (estado IN ('disponible', 'alquilada'))
 *
 * Validado también en App\Services\PropiedadService::RULES ('in:disponible,alquilada').
 */
export type EstadoPropiedad = 'disponible' | 'alquilada';

/**
 * Propiedad inmobiliaria.
 *
 * Fuente de verdad: database/migrations/002_create_propiedades_table.sql
 *                   database/migrations/007_add_localidad_id_to_propiedades_table.sql
 *                   App\Services\PropiedadService::formatear()
 *
 * Contrato: GET /api/propiedades  ->  array de Propiedad
 *           GET /api/propiedades/{id}  ->  Propiedad
 *
 * NOTA: la tabla NO tiene ningún campo de imagen. `ubicacion` y `categorias`
 * son campos compuestos por el service, no columnas.
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
