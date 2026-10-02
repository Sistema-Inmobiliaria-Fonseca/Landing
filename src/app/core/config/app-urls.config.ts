/**
 * URLs de las aplicaciones que se Consum desde la Landing.
 *
 * En desarrollo la Landing y el FrontendAdmin no comparten puerto (la Landing
 * usa el 4300, configurado en `angular.json` → `serve.options.port`, para no
 * chocar con el 4200 del panel). Por eso la URL del panel va completa: con
 * protocolo, host y puerto.
 *
 * Para apuntar a producción alcanza con reemplazar `FRONTEND_ADMIN_URL`: la
 * ruta `/login` se deriva sola y no hay que tocar ningún componente.
 */

/** Origen del panel de administración (FrontendAdmin). */
export const FRONTEND_ADMIN_URL = 'http://localhost:4200';

/**
 * Ruta de login del panel. No inventar: en el FrontendAdmin la declara
 * `app-routing-module.ts` (`{ path: 'login', ... }`), y la raíz redirige ahí.
 */
export const FRONTEND_ADMIN_LOGIN = `${FRONTEND_ADMIN_URL}/login`;