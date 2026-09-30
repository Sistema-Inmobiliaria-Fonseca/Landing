import { Categoria } from '../core/models/categoria.model';

/**
 * MOCK — replica la respuesta de GET /api/categorias.
 * Nombres, orden y descripciones copiados textualmente de
 * Backend-/database/seeds/001_categorias_iniciales.sql
 *
 * Reemplazar por: await http.get<Categoria[]>('/api/categorias')
 */
export const CATEGORIAS_MOCK: Categoria[] = [
  {
    id: 1,
    nombre: 'Lotes',
    descripcion: 'Terrenos para construir, con servicios o en zona de desarrollo.',
    activo: true,
    created_at: '2026-01-10 09:00:00',
    updated_at: '2026-01-10 09:00:00',
  },
  {
    id: 2,
    nombre: 'Casas',
    descripcion: 'Viviendas unifamiliares de uno o varios pisos.',
    activo: true,
    created_at: '2026-01-10 09:00:00',
    updated_at: '2026-01-10 09:00:00',
  },
  {
    id: 3,
    nombre: 'Departamentos',
    descripcion: 'Viviendas en edificio, monoambiente, dos ambientes o más.',
    activo: true,
    created_at: '2026-01-10 09:00:00',
    updated_at: '2026-01-10 09:00:00',
  },
  {
    id: 4,
    nombre: 'Locales',
    descripcion: 'Predios comerciales para la venta o el alquiler.',
    activo: true,
    created_at: '2026-01-10 09:00:00',
    updated_at: '2026-01-10 09:00:00',
  },
  {
    id: 5,
    nombre: 'Oficinas',
    descripcion: 'Espacios de trabajo y oficinas comerciales o profesionales.',
    activo: true,
    created_at: '2026-01-10 09:00:00',
    updated_at: '2026-01-10 09:00:00',
  },
  {
    id: 6,
    nombre: 'Campos',
    descripcion: 'Campos rurales para ganadería o agricultura.',
    activo: true,
    created_at: '2026-01-10 09:00:00',
    updated_at: '2026-01-10 09:00:00',
  },
  {
    id: 7,
    nombre: 'Dúplex',
    descripcion: 'Unidades de dos plantas: casas o departamentos dúplex.',
    activo: true,
    created_at: '2026-01-10 09:00:00',
    updated_at: '2026-01-10 09:00:00',
  },
];
