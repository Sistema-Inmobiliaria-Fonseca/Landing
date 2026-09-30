import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Servicio {
  titulo: string;
  descripcion: string;
  icono: string;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.html',
  styleUrl: './services.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {
  protected readonly servicios: Servicio[] = [
    {
      titulo: 'Compraventa',
      descripcion:
        'Selección de propiedades, negociación y seguimiento completo hasta la firma de escritura.',
      icono: 'M4 8.5 12 3l8 5.5M6 7.5V20h12V7.5M10 20v-6h4v6',
    },
    {
      titulo: 'Alquileres',
      descripcion:
        'Propietarios e inquilinos: contrato, depósito, ajustes y garantías gestionados por nosotros.',
      icono: 'M5 11.5 12 4l7 7.5M7 10.5V20h10v-9.5M9 20v-5h6v5M3 21h18',
    },
    {
      titulo: 'Evaluación',
      descripcion:
        'Tasación profesional basada en comparables reales de la zona, entregada en 48 horas hábiles.',
      icono: 'M12 3v18M7 7h7a3.5 3.5 0 0 1 0 7H8a3.5 3.5 0 0 0 0 7h8M4 12h16',
    },
    {
      titulo: 'Gestión',
      descripcion:
        'Administrar propiedades: cobranzas, mantenimiento, resolución de conflictos y reportes.',
      icono: 'M4 20V9l8-5 8 5v11M9 20v-6h6v6M4 20h16',
    },
    {
      titulo: 'Créditos',
      descripcion:
        'Pre-aprobación y trámite con bancos para financiar tu operación con las mejores condiciones.',
      icono: 'M3 6h18v12H3zM3 10h18M7 15h4',
    },
    {
      titulo: 'Asesoría',
      descripcion:
        'Consultoría en escrituración, sucesión, expensas y todo lo vinculado al título del inmueble.',
      icono: 'M12 3 4 7v5c0 5 3.5 8 8 9 4.5-1 8-4 8-9V7l-8-4ZM9.5 12l2 2 3.5-3.5',
    },
  ];
}
