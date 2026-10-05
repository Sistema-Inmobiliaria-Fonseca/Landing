import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Servicio {
  titulo: string;
  descripcion: string;
  /** Path data de un icono de 24x24, trazo, sin relleno. */
  icono: string;
}

/**
 * Servicios que ofrece la inmobiliaria. El texto viene definido por el cliente:
 * son cuatro(lineas de negocio mas el acompanhamento), asi que la grilla usa
 * `grid--4` para que queden en una sola fila en escritorio.
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
      titulo: 'Inmuebles residenciales',
      descripcion:
        'Casas, departamentos y propiedades para encontrar el lugar ideal donde vivir.',
      icono: 'M3 10.5 12 3l9 7.5M5.5 9.5V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5M10 21v-6h4v6',
    },
    {
      titulo: 'Terrenos y campos',
      descripcion:
        'Soluciones estratégicas para desarrollos urbanos, loteos o producción agrícola/ganadera.',
      icono: 'M12 3 4 7v10l8 4 8-4V7l-8-4ZM4 7l8 4 8-4M12 21v-10',
    },
    {
      titulo: 'Espacios comerciales y corporativos',
      descripcion:
        'Locales, oficinas y oportunidades de inversión para potenciar nuevos proyectos o empresas.',
      icono:
        'M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18ZM6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-2M10 6h4M10 10h4M10 14h4M10 18h4',
    },
    {
      titulo: 'Asesoramiento personalizado',
      descripcion:
        'Acompañamiento técnico y profesional durante todo el proceso de negociación y concreción del negocio.',
      icono: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM8 8h8M8 12h5',
    },
  ];
}