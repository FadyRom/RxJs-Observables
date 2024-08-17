import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  counter = signal(0);
  clickCount$ = toObservable(this.counter);
  private destroyRef = inject(DestroyRef);
  customInterval$ = new Observable((subscriber) => {
    setInterval(() => {
      subscriber.next({ message: 'New Value' });
    }, 1000);
  });
  // interval$ = interval(1000);
  // intervalSignal = toSignal(this.interval$);
  ngOnInit(): void {
    // const sub = interval(5000)
    //   .pipe(map((val) => val * 2))
    //   .subscribe({
    //     next: (val) => console.log(val),
    //   });
    // this.destroyRef.onDestroy(() => sub.unsubscribe());
    // const sub = this.clickCount$.subscribe({
    //   next: (val) => console.log(val),
    // });
    // this.destroyRef.onDestroy(() => sub.unsubscribe());
    this.customInterval$.subscribe({
      next: (val) => console.log(val),
    });
  }

  onClick() {
    this.counter.update((prevNum) => prevNum + 1);
  }
}
