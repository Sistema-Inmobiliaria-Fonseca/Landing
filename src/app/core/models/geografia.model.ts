/**
 * Catálogo geográfico: GET /api/paises, /api/provincias, /api/localidades.
 * Son endpoints de solo consulta, los datos se cargan desde database/seeds.
 */
export interface PaisCatalogo {
  id: number;
  nombre: string;
  codigo_iso: string;
  activo: boolean;
}

export interface ProvinciaCatalogo {
  id: number;
  pais_id: number;
  nombre: string;
  codigo: string;
  activo: boolean;
}

export interface LocalidadCatalogo {
  id: number;
  provincia_id: number;
  nombre: string;
  activo: boolean;
}
