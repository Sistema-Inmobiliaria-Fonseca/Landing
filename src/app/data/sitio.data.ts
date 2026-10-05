/**
 * Identidad y datos de contacto del sitio.
 *
 * Estos datos NO salen de la base: son los que la inmobiliaria cargó a mano en
 * las secciones de Contacto y Ubicación, agrupados acá para que el pie de
 * página no los vuelva a escribir.
 *
 * Si el backend alguna vez expone un endpoint de configuración del sitio, se
 * reemplaza este archivo y nada más: los componentes ya distinguen entre valor
 * definido y valor pendiente.
 *
 * `horarios` viene de lo que pasó la inmobiliaria. Si cambia, se edita solo acá.
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
  /** Path data de un icono de 24x24, trazo, sin relleno. */
  icono: string;
}

export interface Sitio {
  nombre: string;
  lema: string | null;
  /** Teléfono como se muestra, ya formateado para leer. */
  telefono: string | null;
  email: string | null;
  direccion: string | null;
  /** Link de WhatsApp listo para usar como href. */
  whatsapp: string | null;
  horarios: HorarioAtencion[];
  redes: RedSocial[];
}

export const SITIO: Sitio = {
  nombre: 'Inmobiliaria Carlos Fonseca',
  lema: 'Martillero y Corredor Público · Matrícula profesional 044747',
  telefono: '+54 353 421-9291',
  email: 'inmocarlosfonseca@hotmail.com',
  direccion: 'San Juan 1020, Villa María, Córdoba',
  whatsapp:
    'https://wa.me/543534219291?text=Hola%20Carlos%20Fonseca%2C%20quisiera%20hacer%20una%20consulta.',
  horarios: [
    { dia: 'Lunes a viernes', rango: '9:00 a 13:00' },
    { dia: 'Sábado', rango: 'Cerrado' },
    { dia: 'Domingo', rango: 'Cerrado' },
  ],
  redes: [
    {
      nombre: 'Instagram',
      url: 'https://www.instagram.com/inmocarlosfonseca/',
      icono:
        'M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3ZM12 8.75a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5ZM17.4 6.6h.01',
    },
    {
      nombre: 'Facebook',
      url: 'https://www.facebook.com/carlos.fonseca.185216',
      icono:
        'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z',
    },
  ],
};