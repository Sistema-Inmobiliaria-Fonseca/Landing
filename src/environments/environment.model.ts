/**
 * Forma de la configuracion del entorno.
 *
 * Vive en su propio archivo a proposito: `angular.json` ->
 * `build.production.fileReplacements` reemplaza `environment.ts` por
 * `environment.production.ts`, asi que si el tipo viviera en `environment.ts`
 * el build de produccion no lo encontraria (el archivo original ya no existe en
 * esa compilacion).
 */

export interface Environment {
  /**
   * Origen del backend, sin barra final.
   *
   * En DESARROLLO va vacio a proposito: las rutas relativas (`/api/public/...`)
   * se resuelven contra el propio origen y el proxy de `proxy.conf.json` las
   * reenvia a `http://localhost:8000`. Asi no hay CORS ni dos lugares donde
   * configurar el puerto del backend.
   *
   * En PRODUCCION no hay proxy, asi que va el origen completo, por ejemplo
   * `https://api.inmobiliaria.com.ar`. Si se deja vacio en produccion, el sitio
   * se ve bien pero no trae propiedades: `fetch('/api/...')` responde 404 contra
   * el servidor de estaticos.
   */
  readonly apiBaseUrl: string;
}