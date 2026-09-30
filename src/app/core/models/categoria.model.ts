/**
 * Categorías de propiedades.
 *
 * Fuente de verdad: database/migrations/001_create_categorias_table.sql
 * y database/seeds/001_categorias_iniciales.sql (Backend-).
 *
 * Contrato GET /api/categorias  ->  tabla `categorias`
 * Contrato GET /api/categorias/{id}
 */
export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string | null;
  activo: boolean;
  created_at: string;
  updated_at: string;
  /** Presente solo en el detalle (CategoriaService::buscar). */
  propiedades_ids?: number[];
}

/**
 * Categoría tal como viaja dentro de una propiedad.
 *
 * Fuente de verdad: App\Repositories\CategoriaPropiedadRepository::categoriasDe()
 * y ::categoriasDeTodas() — el SELECT solo proyecta `c.id, c.nombre`.
 * Por eso aquí NO existen `descripcion` ni `activo`.
 *
 * Relación MANY-TO-MANY con `propiedades` a través de `categoria_propiedad`.
 */
export interface CategoriaPropiedad {
  id: number;
  nombre: string;
}
