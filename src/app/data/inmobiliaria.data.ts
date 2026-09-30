/**
 * Datos institucionales de la inmobiliaria.
 * MOCK: hoy no existe un endpoint para esto en Backend-.
 * Cuando exista, reemplazar por la respuesta de la API.
 */
export interface Inmobiliaria {
  nombre: string;
  nombreCorto: string;
  lema: string;
  telefono: string;
  telefonoEnlace: string;
  email: string;
  direccion: string;
  horarios: { dia: string; rango: string }[];
  redes: { nombre: string; url: string; icono: string }[];
}

export const INMOBILIARIA: Inmobiliaria = {
  nombre: 'Inmobiliaria del Sur',
  nombreCorto: 'Inmobiliaria',
  lema: 'Propiedades con historia y proyección',
  telefono: '+54 11 4321-8800',
  telefonoEnlace: '+541143218800',
  email: 'contacto@inmobiliaria.com.ar',
  direccion: 'Av. Corrientes 1234, Piso 8, C1043 CABA, Argentina',
  horarios: [
    { dia: 'Lunes a Viernes', rango: '09:00 a 19:00' },
    { dia: 'Sábados', rango: '10:00 a 14:00' },
    { dia: 'Domingos', rango: 'Cerrado' },
  ],
  redes: [
    { nombre: 'Facebook', url: 'https://facebook.com', icono: 'facebook' },
    { nombre: 'Instagram', url: 'https://instagram.com', icono: 'instagram' },
    { nombre: 'LinkedIn', url: 'https://linkedin.com', icono: 'linkedin' },
  ],
};
