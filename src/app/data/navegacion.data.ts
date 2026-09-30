/** Enlaces del menú principal. El `id` apunta al id de la sección en la home. */
export interface EnlaceNavegacion {
  id: string;
  etiqueta: string;
}

export const NAVEGACION: EnlaceNavegacion[] = [
  { id: 'inicio', etiqueta: 'Inicio' },
  { id: 'propiedades', etiqueta: 'Propiedades' },
  { id: 'quienes-somos', etiqueta: 'Quiénes somos' },
  { id: 'servicios', etiqueta: 'Servicios' },
  { id: 'ubicacion', etiqueta: 'Ubicación' },
  { id: 'contacto', etiqueta: 'Contacto' },
];
