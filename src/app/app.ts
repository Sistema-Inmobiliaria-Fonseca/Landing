import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutComponent } from './components/about/about';
import { CategoriesComponent } from './components/categories/categories';
import { ContactComponent } from './components/contact/contact';
import { FooterComponent } from './components/footer/footer';
import { HeaderComponent } from './components/header/header';
import { HeroComponent } from './components/hero/hero';
import { LocationComponent } from './components/location/location';
import { PropertyCardComponent } from './components/property-card/property-card';
import { ServicesComponent } from './components/services/services';
import { Propiedad } from './core/models';
import { PROPIEDADES } from './data/propiedades.data';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    HeroComponent,
    CategoriesComponent,
    PropertyCardComponent,
    AboutComponent,
    ServicesComponent,
    LocationComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  /**
   * Listado de propiedades. Hoy arranca vacio (la base tiene 0 registros),
   * por eso la seccion muestra el estado vacio.
   *
   * Cuando exista la API, reemplazar por:
   *   await http.get<Propiedad[]>('/api/propiedades')
   *
   * `PropertyCardComponent` ya esta listo para renderizar cada elemento.
   */
  protected readonly propiedades: Propiedad[] = PROPIEDADES;
}
