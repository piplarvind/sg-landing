import { Component } from "@angular/core";
import { timer } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: "app-onboarding",
  templateUrl: "./onboarding.component.html",
  styleUrls: ["./onboarding.component.scss"],
})
export class OnboardingComponent {
  save$ = timer(2_000).pipe(tap(() => alert('Forms saved')));
}
