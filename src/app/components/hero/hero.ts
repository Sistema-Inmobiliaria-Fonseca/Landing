import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  signal,
} from '@angular/core';

/** Una imagen del carrusel del Hero. */
interface Slide {
  src: string;
  alt: string;
  /** Ancho y alto reales del archivo, para evitar saltos de layout. */
  width: number;
  height: number;
}

/** Milisegundos entre cambio automatico de imagen. */
const INTERVALO_MS = 5000;

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements OnDestroy {
  /**
   * Imagenes reales provistas para la Landing. Solo se usan archivos que
   * existen en `public/images`: no se generan ni se inventan imagenes.
   */
  protected readonly slides: Slide[] = [
    {
      src: '/images/hero.jpeg',
      alt: 'Imagen principal de la inmobiliaria',
      width: 1600,
      height: 1200,
    },
    {
      src: '/images/banner-2.jpeg',
      alt: 'Banner secundario 1',
      width: 1600,
      height: 720,
    },
    {
      src: '/images/banner-3.jpeg',
      alt: 'Banner secundario 2',
      width: 1280,
      height: 718,
    },
  ];

  private readonly indice = signal(0);

  /** Indice de la imagen visible. */
  protected readonly indiceActivo = this.indice.asReadonly();

  protected readonly cantidad = this.slides.length;

  private readonly pausado = signal(false);
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.iniciar();
    document.addEventListener('visibilitychange', this.alCambiarVisibilidad);
  }

  ngOnDestroy(): void {
    this.detener();
    document.removeEventListener('visibilitychange', this.alCambiarVisibilidad);
  }

  /** Pausa la rotacion automatica mientras el puntero esta sobre la imagen. */
  protected pausar(): void {
    this.pausado.set(true);
  }

  protected reanudar(): void {
    this.pausado.set(false);
  }

  private readonly alCambiarVisibilidad = (): void => {
    if (document.hidden) {
      this.detener();
    } else if (!this.pausado()) {
      this.iniciar();
    }
  };

  private iniciar(): void {
    if (this.timer !== null) {
      return;
    }

    this.timer = setInterval(() => this.avanzar(), INTERVALO_MS);
  }

  private detener(): void {
    if (this.timer === null) {
      return;
    }

    clearInterval(this.timer);
    this.timer = null;
  }

  private avanzar(): void {
    this.indice.update((actual) => (actual + 1) % this.slides.length);
  }
}
