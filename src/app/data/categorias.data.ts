import { Categoria } from '../core/models';

/**
 * Categorias del sistema. NO son datos inventados: replican el seed real
 * Backend-/database/seeds/001_categorias_iniciales.sql
 * (id, nombre y descripcion copiados textualmente).
 *
 * Estan marcadas como `activo: true` porque el seed las crea asi.
 *
 * Reemplazar por: await http.get<Categoria[]>('/api/categorias')
 */
export const CATEGORIAS: Categoria[] = [
  {
    id: 1,
    nombre: 'Lotes',
    descripcion: 'Terrenos para construir, con servicios o en zona de desarrollo.',
    activo: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 2,
    nombre: 'Casas',
    descripcion: 'Viviendas unifamiliares de uno o varios pisos.',
    activo: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 3,
    nombre: 'Departamentos',
    descripcion: 'Viviendas en edificio, monoambiente, dos ambientes o más.',
    activo: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 4,
    nombre: 'Locales',
    descripcion: 'Predios comerciales para la venta o el alquiler.',
    activo: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 5,
    nombre: 'Oficinas',
    descripcion: 'Espacios de trabajo y oficinas comerciales o profesionales.',
    activo: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 6,
    nombre: 'Campos',
    descripcion: 'Campos rurales para ganadería o agricultura.',
    activo: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 7,
    nombre: 'Dúplex',
    descripcion: 'Unidades de dos plantas: casas o departamentos dúplex.',
    activo: true,
    created_at: '',
    updated_at: '',
  },
];
