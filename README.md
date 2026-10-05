# Landing

Sitio publico de la inmobiliaria. Es una SPA de Angular 20 que muestra las
propiedades publicadas en el backend.

## De donde salen los datos

La Landing **no tiene sesion ni token**. Por eso consume las rutas publicas del
backend, que no piden `Authorization`:

| Ruta | Que devuelve |
| --- | --- |
| `GET /api/public/propiedades` | Listado de propiedades, con `ubicacion`, `categorias` e `imagenes` |
| `GET /api/public/propiedades/{id}` | Detalle de una propiedad |
| `GET /api/public/categorias` | Catalogo de categorias |

Las rutas `/api/propiedades` (sin `public`) son del panel y **exigen token
Bearer**: la Landing no debe llamarlas nunca, da 401.

El backend responde siempre dentro de un sobre `{ success, data }`.
`ApiService` (en `src/app/core/services/api.service.ts`) desenvuelve ese `data`;
si se olvida, `propiedades.length` queda `undefined` y la grilla nunca se dibuja
aunque la API responda 200.

Las fotos se sirven por `GET /uploads/propiedades/{nombre}`, tambien sin token,
porque van en el `<img>` del sitio y ahi no se pueden mandar cabeceras.

## Requisitos para ver propiedades

1. MySQL prendido y con la base `inmobiliaria` migrada y sembrada:
   ```bash
   cd Backend-
   php bin/console migrate:fresh
   ```
2. API corriendo en el puerto 8000:
   ```bash
   cd Backend-
   php -S localhost:8000 -t public bootstrap/front.php
   ```
3. Al menos una propiedad cargada (por ejemplo desde el panel).

## Development server

```bash
npm start
```

El sitio queda en `http://localhost:4300/` (el 4200 lo usa el FrontendAdmin).

En desarrollo las llamadas a la API son **relativas** (`/api/public/...`) y las
reenvía el proxy de `proxy.conf.json` a `http://localhost:8000`. Por eso en
local no hace falta configurar CORS ni cambiar la URL de la API en ningun lado.

## Configuracion por entorno

`src/environments/environment.ts` es el de desarrollo y deja `apiBaseUrl` vacio a
proposito (se usa el proxy). Para produccion, `angular.json` ->
`build.production.fileReplacements` reemplaza ese archivo por
`environment.production.ts`, que trae el origen completo de la API.

**Antes de publicar hay que cambiar `apiBaseUrl` en `environment.production.ts`**
con el dominio real. Si se publica vacio, el sitio se ve bien pero no trae
propiedades: `/api/public/...` responde 404 contra el servidor de estaticos.

## Building

```bash
npm run build
```

Compila para produccion y deja el resultado en `dist/landing/`.

## Tests

```bash
npm test
```