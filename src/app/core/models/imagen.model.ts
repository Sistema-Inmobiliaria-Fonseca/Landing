/**
 * Fotografia de una propiedad.
 *
 * Fuente de verdad: database/migrations/010_create_propiedad_imagenes_table.sql
 *                   App\Services\PropiedadImagenService::formatear()
 *
 * `orden` arranca en 1 y la imagen de orden 1 es la principal. El backend ya
 * resuelve eso en `es_principal` y arma `url` absoluto, asi que la Landing no
 * tiene que componer la ruta.
 */
export interface ImagenPropiedad {
  id: number;
  propiedad_id: number;
  nombre: string;
  nombre_original: string;
  mime_type: string;
  tamano: number;
  orden: number;
  es_principal: boolean;
  /** URL absoluta y publica, servida por GET /uploads/propiedades/{nombre}. */
  url: string;
  created_at: string;
}