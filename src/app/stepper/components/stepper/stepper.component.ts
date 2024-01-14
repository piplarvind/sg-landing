import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList } from '@angular/core';
import { ActivationEnd, ActivationStart, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, ReplaySubject } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
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

  // Use BehaviorSubject for stepIndex
  private stepIndex$ = new BehaviorSubject<number>(0);

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

  ngAfterContentInit(): void {
    // Initialize stepIndex using saved state or default to 0
    const savedIndex = this.getSavedStepIndex();
    this.stepIndex$.next(savedIndex);

    // Combine observables to calculate stepIndex
    const calculatedStepIndex$ = combineLatest([
      this.contentInit$,
      this.activationStart$,
    ]).pipe(
      map(([_, event]) => {
        const path = event.snapshot.routeConfig?.path;
        const labels = this.labelsQueryList.toArray();

        return labels.findIndex((label) => label.routerPath === path);
      }),
      filter((index) => index !== -1),
      startWith(savedIndex), // Use the saved index as the initial value
    );

    // Subscribe to calculatedStepIndex$ to update stepIndex$
    calculatedStepIndex$.subscribe((index) => {
      this.stepIndex$.next(index);
      this.saveStepIndex(index); // Save the current step index to localStorage
    });

    // Complete the contentInit$
    this.contentInit$.next();
    this.contentInit$.complete();
  }

  // Get the saved step index from localStorage
  private getSavedStepIndex(): number {
    const savedIndex = localStorage.getItem('stepperCurrentStepIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  }

  // Save the current step index to localStorage
  private saveStepIndex(index: number): void {
    localStorage.setItem('stepperCurrentStepIndex', index.toString());
  }
}
