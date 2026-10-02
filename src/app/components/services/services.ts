import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Servicio {
  titulo: string;
  descripcion: string;
  icono: string;
}

/**
 * Estructura visual preparada. Los servicios todavia NO fueron definidos
 * por la inmobiliaria, asi que los titulos son marcadores de posicion
 * identificables y las descripciones indican que falta la carga.
 */
@Component({
  selector: 'app-services',
  templateUrl: './services.html',
  styleUrl: './services.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {
  protected readonly servicios: Servicio[] = [
    {
      titulo: 'Servicio 1',
      descripcion: 'Descripción del servicio pendiente de carga.',
      icono: 'M4 8.5 12 3l8 5.5M6 7.5V20h12V7.5M10 20v-6h4v6',
    },
    {
      titulo: 'Servicio 2',
      descripcion: 'Descripción del servicio pendiente de carga.',
      icono: 'M5 11.5 12 4l7 7.5M7 10.5V20h10v-9.5M9 20v-5h6v5M3 21h18',
    },
    {
      titulo: 'Servicio 3',
      descripcion: 'Descripción del servicio pendiente de carga.',
      icono: 'M12 3v18M7 7h7a3.5 3.5 0 0 1 0 7H8a3.5 3.5 0 0 0 0 7h8M4 12h16',
    },
    {
      titulo: 'Servicio 4',
      descripcion: 'Descripción del servicio pendiente de carga.',
      icono: 'M4 20V9l8-5 8 5v11M9 20v-6h6v6M4 20h16',
    },
    {
      titulo: 'Servicio 5',
      descripcion: 'Descripción del servicio pendiente de carga.',
      icono: 'M3 6h18v12H3zM3 10h18M7 15h4',
    },
    {
      titulo: 'Servicio 6',
      descripcion: 'Descripción del servicio pendiente de carga.',
      icono: 'M12 3 4 7v5c0 5 3.5 8 8 9 4.5-1 8-4 8-9V7l-8-4ZM9.5 12l2 2 3.5-3.5',
    },
  ];
}
