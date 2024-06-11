import { ChangeDetectionStrategy, Component, DestroyRef, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, of, switchMap } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home-view',
  standalone: true,
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    NgClass,
  ],
})
export class HomeViewComponent {
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  public scrollTo(element: HTMLElement): void {
    element.scrollIntoView({ behavior: 'smooth' });
  }

  public scrollValue: Signal<number> = toSignal(
    fromEvent(window.document, 'scroll', { passive: true }).pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(() => {
        return of(window.scrollY || 0);
      }),
    ), { initialValue: 0 },
  );
}