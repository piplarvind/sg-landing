import {
  Directive,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { StepperService } from "../components/stepper/stepper.service";

@Directive({
  selector: "[appStepLabel]",
})
export class StepLabelDirective {
  @Input("appStepLabel") routerPath!: string;
  @Output() labelMatched = new EventEmitter<void>();

  constructor(
    public templateRef: TemplateRef<void>,
    private router: Router,
    private stepperService: StepperService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.getCurrentRoute(event.url);
        if (currentRoute === this.routerPath) {
          this.labelMatched.emit();
        }
      }
    });
  }

  private getCurrentRoute(url: string): string | null {
    // const currentRoute = this.activatedRoute.snapshot.url.map(segment => segment.path).join('/');
    const segments = url.split("/");
    const onboardingIndex = segments.indexOf("onboarding");

    let currentRoute = '';
    if (onboardingIndex !== -1 && onboardingIndex < segments.length - 1) {
      currentRoute = segments[onboardingIndex + 1];
    }
    let idx = 1;
    if (currentRoute == 'step1') {
      idx = 0;
    } else if (currentRoute == 'step2') {
      idx = 1;
    } else if (currentRoute == 'step3') {
      idx = 2;
    } else if (currentRoute == 'step4' || currentRoute == 'university-detail' || currentRoute == 'select-athletes' || currentRoute == 'club-not-here' || currentRoute == 'select-athlete-coach') {
      idx = 3;
    } else if (currentRoute == 'step5' || currentRoute == 'select-subscription' || currentRoute == 'otp' || currentRoute == 'request-sent' || currentRoute == 'success-screen' || currentRoute == 'score-screen' || currentRoute == 'select-subscription') {
      idx = 4;
    }
    localStorage.setItem('stepperCurrentStepIndex', idx.toString());
    this.stepperService.setStepIndex(idx)
    console.log("currentRoute", currentRoute);
    return currentRoute === "" ? "/" : currentRoute;
  }
}
