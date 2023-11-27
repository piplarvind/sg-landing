import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    QueryList,
  } from '@angular/core';
  import { ActivationEnd, ActivationStart, Router } from '@angular/router';
  import {
    ReplaySubject,
    combineLatest,
  } from 'rxjs';
  import {
    filter,
    map,
    startWith,
    switchMap,
  } from 'rxjs/operators';
  import { StepLabelDirective } from '../../directives/step-label.directive';
  
  @Component({
    selector: 'app-stepper',
    templateUrl: './stepper.component.html',
    styleUrls: ['./stepper.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class StepperComponent implements AfterContentInit {
    @ContentChildren(StepLabelDirective, { descendants: false })
    labelsQueryList!: QueryList<StepLabelDirective>;
  
    private contentInit$ = new ReplaySubject<void>(1);
    private activationStart$ = this.router.events.pipe(
      filter((event): event is ActivationEnd => event instanceof ActivationEnd)
    );
  
    /* private stepIndex$ = this.contentInit$.pipe(
      switchMap(() => this.activationStart$),
      map((event) => {
        const path = event.snapshot.routeConfig?.path;
        const labels = this.labelsQueryList.toArray();
    
        return labels.findIndex((label) => label.routerPath === path);
      }),
      startWith(-1), // Default value before the first value is emitted
      distinctUntilChanged() // Emit only if the value changes
    );
    private labels$ = this.contentInit$.pipe(
      switchMap(() =>
        combineLatest([this.labelsQueryList.changes, this.activationStart$])
      ),
      startWith(void 0),
      map(() => this.labelsQueryList.toArray().map((el) => el.templateRef))
    ); */

    private stepIndex$ = this.contentInit$.pipe(
      switchMap(() => this.activationStart$),
      map((event) => {
        const path = event.snapshot.routeConfig?.path;
        const labels = this.labelsQueryList.toArray();
  
        return labels.findIndex((label) => label.routerPath === path);
      }),
      filter((index) => index !== -1),
      startWith(0),
    );
    private labels$ = this.contentInit$.pipe(
      switchMap(() =>
        combineLatest([this.labelsQueryList.changes, this.activationStart$])
      ),
      startWith(void 0),
      map(() => this.labelsQueryList.toArray().map((el) => el.templateRef))
    );
  
    data$ = combineLatest(this.labels$, this.stepIndex$).pipe(
      map(([labels, stepIndex]) => ({ labels, stepIndex }))
    );
  
    constructor(private router: Router) {}
  
    // ngAfterContentInit(): void {
    //   setTimeout(() => {
    //     this.contentInit$.next();
    //     this.contentInit$.complete();
    //     this.cdr.detectChanges(); // Trigger change detection manually
    //   });
    // }
    ngAfterContentInit(): void {
      this.contentInit$.next();
      this.contentInit$.complete();
    }
  }
  