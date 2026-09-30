/**
 * Catálogo geográfico: País -> Provincia -> Localidad.
 *
 * Fuente de verdad: database/migrations/004_create_paises_table.sql,
 * 005_create_provincias_table.sql y 006_create_localidades_table.sql (Backend-).
 */

/** Entidad del catálogo `paises`. */
export interface Pais {
  id: number;
  nombre: string;
  codigo_iso: string;
  activo?: boolean;
}

/** Entidad del catálogo `provincias`. */
export interface Provincia {
  id: number;
  pais_id?: number;
  nombre: string;
  codigo?: string;
  activo?: boolean;
}

/** Entidad del catálogo `localidades`. Es la unidad que se asigna a una propiedad. */
export interface Localidad {
  id: number;
  provincia_id?: number;
  nombre: string;
  activo?: boolean;
}

/**
 * Árbol de ubicación que compone PropiedadService::formatearUbicacion()
 * a partir del JOIN de PropiedadRepository.
 *
 * Devuelve `null` cuando la propiedad no tiene localidad asignada
 * (`propiedades.localidad_id` es NULL, o la localidad fue borrada).
 */
export interface Ubicacion {
  localidad: Localidad;
  provincia: Provincia;
  pais: Pais;
}
