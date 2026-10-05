import { Injectable, inject } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, shareReplay } from 'rxjs';

import { Categoria, Propiedad } from '../models';
import { ApiService } from './api.service';

/**
 * Lectura de propiedades y categorias para el sitio publico.
 *
 * Usa las rutas `/api/public/...` y no `/api/...`: las del panel exigen un token
 * Bearer y la Landing no tiene sesion (ver Backend-/routes/api.php). En
 * desarrollo el proxy las reenvia al backend, asi que la URL es relativa.
 */
@Injectable({ providedIn: 'root' })
export class PropiedadService {
  private readonly api = inject(ApiService);

  /**
   * Catalogo publico de categorias que puede usar el filtro del sitio.
   *
   * `GET /api/public/categorias` reusa `CategoriaService::listar()` —el mismo
   * que consume el panel— asi que su SQL (`CategoriaRepository::all()`) no filtra
   * por `activo` y tambien devuelve las categorias desactivadas desde el Admin.
   * El filtro se hace aca, en el unico punto por donde pasa todo el catalogo, y
   * no dentro de un componente: asi no hay que recordar repetirlo y el listado
   * refleja el Admin sin tocar nada del Backend.
   *
   * `activo` es `TINYINT(1)` y `listar()` no lo castea a boolean (solo lo hace
   * `buscar()`), asi que puede viajar como `1`/`0`. Por eso el chequeo es por
   * verdad y no `=== true`, que descartaria todas las categorias.
   *
   * Va con `shareReplay` porque lo consultan el filtro de la home y, para armar
   * los ids visibles, tambien el listado y el detalle: asi hay una sola peticion
   * en lugar de una por cada uno.
   */
  private readonly catalogo$ = this.api
    .get<Categoria[]>('/api/public/categorias')
    .pipe(
      map((categorias) => categorias.filter((categoria) => Boolean(categoria.activo))),
      shareReplay({ bufferSize: 1, refCount: false }),
    );

  listar(): Observable<Propiedad[]> {
    return forkJoin({
      visibles: this.idsVisibles(),
      propiedades: this.api.get<Propiedad[]>('/api/public/propiedades'),
    }).pipe(
      map(({ visibles, propiedades }) =>
        propiedades.map((propiedad) => conCategoriasVisibles(propiedad, visibles)),
      ),
    );
  }

  buscar(id: number): Observable<Propiedad> {
    return forkJoin({
      visibles: this.idsVisibles(),
      propiedad: this.api.get<Propiedad>(`/api/public/propiedades/${id}`),
    }).pipe(map(({ visibles, propiedad }) => conCategoriasVisibles(propiedad, visibles)));
  }

  listarCategorias(): Observable<Categoria[]> {
    return this.catalogo$;
  }

  /**
   * Ids de las categorias que se pueden mostrar.
   *
   * `null` significa que el catalogo no llego y todavia no se puede saber cuales
   * estan activas: en ese caso `conCategoriasVisibles()` no filtra nada, para que
   * una falla puntual de ese endpoint no termine vaciando las etiquetas de todas
   * las propiedades. `catchError` va aca y no en `catalogo$` porque la home si
   * necesita enterarse si el catalogo fallo y mostrar su estado de error.
   */
  private idsVisibles(): Observable<Set<number> | null> {
    return this.catalogo$.pipe(
      map((categorias) => new Set(categorias.map((categoria) => categoria.id))),
      catchError(() => of(null)),
    );
  }
}

/**
 * Saca de `propiedad.categorias` las categorias desactivadas.
 *
 * La relacion con `categoria_propiedad` no se toca: la propiedad sigue
 * asociada a la categoria en la base, solo deja de mostrarla. Se hace aqui y no
 * en cada componente para que `property-card` y `property-detail` no tengan que
 * repetirlo.
 */
function conCategoriasVisibles(propiedad: Propiedad, visibles: Set<number> | null): Propiedad {
  if (visibles === null) {
    return propiedad;
  }

  return {
    ...propiedad,
    categorias: propiedad.categorias.filter((categoria) => visibles.has(categoria.id)),
  };
}