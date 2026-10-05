import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer';
import { HeaderComponent } from './components/header/header';

/**
 * Shell de la Landing: encabezado, contenido enrutado y pie.
 *
 * La home es la ruta '' (`HomeComponent`) y el detalle de cada propiedad es
 * /propiedades/{id} (`PropertyDetailComponent`). El contenido no se decide acá.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
