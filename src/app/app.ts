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
import { PROPIEDADES_MOCK } from './data/mock-propiedades';

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
   * MOCK: alimenta la seccion de propiedades destacadas.
   * Reemplazar por GET /api/propiedades - el tipo `Propiedad` ya coincide
   * con la respuesta del backend, asi que alcanza con asignar el resultado.
   */
  protected readonly propiedades: Propiedad[] = PROPIEDADES_MOCK;
}
