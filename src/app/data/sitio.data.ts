/**
 * Identidad y datos de contacto del sitio.
 *
 * IMPORTANTE: la inmobiliaria todavía no tiene cargados datos reales.
 * No hay un endpoint en Backend- para esta información, así que acá se
 * declara de forma explícita que no está definida, en lugar de inventar
 * una razón social, un teléfono, un email, una dirección u horarios.
 *
 * Cuando exista el endpoint, reemplazar este objeto y nada más:
 * los componentes ya distinguen entre valor definido y valor pendiente.
 */

/** Texto único para marcar información que todavía no fue definida. */
export const PENDIENTE = 'Información próximamente';

export interface HorarioAtencion {
  dia: string;
  rango: string;
}

export interface RedSocial {
  nombre: string;
  url: string;
  icono: string;
}

export interface Sitio {
  /** Placeholder editable. No es una razón social real. */
  nombre: string;
  lema: string | null;
  telefono: string | null;
  email: string | null;
  direccion: string | null;
  horarios: HorarioAtencion[];
  redes: RedSocial[];
}

export const SITIO: Sitio = {
  nombre: 'Inmobiliaria Carlos Fonseca',
  lema: null,
  telefono: null,
  email: null,
  direccion: null,
  horarios: [],
  redes: [],
};
