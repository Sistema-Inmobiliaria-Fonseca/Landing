import { CategoriaPropiedad, Propiedad } from '../core/models';

/**
 * MOCK - replica la respuesta de GET /api/propiedades.
 *
 * Los ids de localidad y provincia son los que asigna MySQL segun el orden de
 * los INSERT de Backend-/database/seeds (011_provincias.sql, 012_localidades.sql).
 * `categorias` solo trae id y nombre, igual que hace CategoriaPropiedadRepository.
 *
 * Reemplazar por: await http.get<Propiedad[]>('/api/propiedades')
 */

/** Provincia 1 = Buenos Aires (AR-BA), provincia 15 = Neuquen (AR-NQ). */
const PROVINCIA_BUENOS_AIRES = 1;
const PROVINCIA_NEUQUEN = 15;

const paisArgentina = { id: 1, nombre: 'Argentina', codigo_iso: 'ARG' };

const provinciaBuenosAires = { id: PROVINCIA_BUENOS_AIRES, nombre: 'Buenos Aires' };
const provinciaNeuquen = { id: PROVINCIA_NEUQUEN, nombre: 'Neuquén' };

function categoria(id: number, nombre: string): CategoriaPropiedad {
  return { id, nombre };
}

export const PROPIEDADES_MOCK: Propiedad[] = [
  {
    id: 1,
    nombre: 'Casa familiar en el centro de La Plata',
    localidad_id: 1,
    metros_cuadrados: 186.5,
    valor: 245000,
    cantidad_habitaciones: 3,
    cantidad_ambientes: 5,
    descripcion:
      'Casa de dos plantas con cochera para dos autos, patio trasero y quincho. A dos cuadras del centro, con todos los servicios.',
    apto_credito: true,
    estado: 'disponible',
    created_at: '2026-08-04 10:15:00',
    updated_at: '2026-08-04 10:15:00',
    ubicacion: {
      localidad: { id: 1, nombre: 'La Plata' },
      provincia: provinciaBuenosAires,
      pais: paisArgentina,
    },
    categorias: [categoria(2, 'Casas')],
  },
  {
    id: 2,
    nombre: 'Departamento frente al mar en Mar del Plata',
    localidad_id: 2,
    metros_cuadrados: 92.4,
    valor: 168500,
    cantidad_habitaciones: 2,
    cantidad_ambientes: 3,
    descripcion:
      'Departamento de 3 ambientes con balcon que da al frente del mar. Edificio con pileta climatizada, seguridad 24hs y cochera.',
    apto_credito: true,
    estado: 'disponible',
    created_at: '2026-08-06 12:40:00',
    updated_at: '2026-08-06 12:40:00',
    ubicacion: {
      localidad: { id: 2, nombre: 'Mar del Plata' },
      provincia: provinciaBuenosAires,
      pais: paisArgentina,
    },
    categorias: [categoria(3, 'Departamentos'), categoria(7, 'Dúplex')],
  },
  {
    id: 3,
    nombre: 'Lote en barrio cerrado de Tandil',
    localidad_id: 4,
    metros_cuadrados: 450,
    valor: 96000,
    cantidad_habitaciones: 0,
    cantidad_ambientes: 0,
    descripcion:
      'Lote de 10 x 45 metros en barrio cerrado, sobre calle asfaltada y con todos los servicios underground.',
    apto_credito: false,
    estado: 'disponible',
    created_at: '2026-08-11 09:05:00',
    updated_at: '2026-08-11 09:05:00',
    ubicacion: {
      localidad: { id: 4, nombre: 'Tandil' },
      provincia: provinciaBuenosAires,
      pais: paisArgentina,
    },
    categorias: [categoria(1, 'Lotes')],
  },
  {
    id: 4,
    nombre: 'Dúplex con diseño contemporáneo en Zapala',
    localidad_id: 130,
    metros_cuadrados: 138.2,
    valor: 312000,
    cantidad_habitaciones: 3,
    cantidad_ambientes: 4,
    descripcion:
      'Dúplex de dos plantas con ventanales de piso a techo y amplia terraza. A minutos del centro de Zapala, ideal como inversión o residencia de fin de semana.',
    apto_credito: true,
    estado: 'alquilada',
    created_at: '2026-08-15 17:25:00',
    updated_at: '2026-08-19 11:10:00',
    ubicacion: {
      localidad: { id: 130, nombre: 'Zapala' },
      provincia: provinciaNeuquen,
      pais: paisArgentina,
    },
    categorias: [categoria(7, 'Dúplex'), categoria(2, 'Casas')],
  },
  {
    id: 5,
    nombre: 'Local y oficina comercial en Tigre',
    localidad_id: 12,
    metros_cuadrados: 210.75,
    valor: 278000,
    cantidad_habitaciones: 0,
    cantidad_ambientes: 6,
    descripcion:
      'Predio comercial con planta baja, entrepiso y dos oficinas, sobre avenida de alto transito. Ideal para sucursal de empresa o consultorio.',
    apto_credito: false,
    estado: 'disponible',
    created_at: '2026-08-21 14:00:00',
    updated_at: '2026-08-21 14:00:00',
    ubicacion: {
      localidad: { id: 12, nombre: 'Tigre' },
      provincia: provinciaBuenosAires,
      pais: paisArgentina,
    },
    categorias: [categoria(4, 'Locales'), categoria(5, 'Oficinas')],
  },
  {
    id: 6,
    nombre: 'Campo ganadero en Azul',
    localidad_id: 10,
    metros_cuadrados: 125000,
    valor: 540000,
    cantidad_habitaciones: 2,
    cantidad_ambientes: 3,
    descripcion: null,
    apto_credito: false,
    estado: 'disponible',
    created_at: '2026-08-25 08:30:00',
    updated_at: '2026-08-25 08:30:00',
    ubicacion: null,
    categorias: [categoria(6, 'Campos')],
  },
];
