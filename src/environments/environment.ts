import { Environment } from './environment.model';

/**
 * Entorno de DESARROLLO: `ng serve` usa este archivo tal cual.
 *
 * `apiBaseUrl` vacio = rutas relativas, que el proxy de `proxy.conf.json`
 * reenvia a `http://localhost:8000`.
 */
export const environment: Environment = {
  apiBaseUrl: '',
};