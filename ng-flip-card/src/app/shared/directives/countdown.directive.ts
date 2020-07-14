import { Subject, Subscription, timer } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { Directive, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';

@Directive({
  selector: '[countdown]'
})
export class CountdownDirective implements OnChanges, OnDestroy {

  private counterSource$ = new Subject<any>();
  private subscription = Subscription.EMPTY;

  @Input() countdown: number;
  @Input() interval: number;
  @Output() value = new EventEmitter<number>();

  constructor() {
    this.subscription = this.counterSource$.pipe(
      switchMap(({ interval, count }) =>
        timer(0, interval).pipe(
          take(count),
          tap(() => this.value.emit(--count))
        )
      )
    ).subscribe();
  }

  public ngOnChanges(): void {
    this.counterSource$.next({ count: this.countdown, interval: this.interval });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}