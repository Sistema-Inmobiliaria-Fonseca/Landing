import { Environment } from './environment.model';

/**
 * Entorno de PRODUCCION: entra por `fileReplacements` en
 * `angular.json` -> `build.production`, que reemplaza `environment.ts` por este
 * archivo.
 *
 * `apiBaseUrl` tiene que ser el ORIGEN COMPLETO del backend. En produccion no
 * hay proxy de desarrollo, asi que las rutas relativas `/api/public/...` no
 * llegan a la API. Recordar cambiar el dominio antes de publicar.
 */
export const environment: Environment = {
  apiBaseUrl: '',
};