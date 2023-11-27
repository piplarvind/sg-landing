import { Component, OnInit } from "@angular/core";

import { OnboardingProcessService } from "../onboarding.process.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-step2",
  templateUrl: "./step2.component.html",
  styleUrls: ["./step2.component.scss"],
})
export class Step2Component {
  nextButtonClicked = false;

  step2Form = this.onboardingProcessService.step2Form;

  sports = [
    { value: 'football', label: 'Football' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'soccer', label: 'Soccer' },
    { value: 'tennis', label: 'Tennis' },
    { value: 'volleyball', label: 'Volleyball' },
  ];

  constructor(
    private router: Router,
    private onboardingProcessService: OnboardingProcessService
  ) {}

  // nextButtonClick(): void {
  //   // Perform form validation
  //   if (this.onboardingProcessService.addressForm.valid) {
  //     // If the form is valid, navigate to the next step
  //     this.router.navigate(['/account/onboarding/step3']);
  //   } else {
  //     // If the form is invalid, show an error or handle it accordingly
  //     console.log('Please fill in all required fields in Step 2.');
  //   }
  // }

  onSubmit(): void {
    this.nextButtonClicked = true;
    // Perform form validation
    if (this.onboardingProcessService.step2Form.valid) {
      // If the form is valid, navigate to the next step
      this.router.navigate(["/account/onboarding/step3"]);
    } else {
      // If the form is invalid, show an error or handle it accordingly
      console.log("Please fill in all required fields in Step 2.");
    }
  }

}
