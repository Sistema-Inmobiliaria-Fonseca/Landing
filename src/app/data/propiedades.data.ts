import { Propiedad } from '../core/models';

/**
 * Listado de propiedades de la Landing.
 *
 * La base de datos tiene 0 propiedades, por lo que el listado arranca VACIO
 * y la seccion muestra el estado vacio. No se inventan propiedades de ejemplo.
 *
 * Cuando haya datos, reemplazar por:
 *   await http.get<Propiedad[]>('/api/propiedades')
 *
 * El tipo `Propiedad` ya coincide con la respuesta del backend, asi que
 * alcanza con asignar el resultado a esta variable.
 */
export const PROPIEDADES: Propiedad[] = [];
