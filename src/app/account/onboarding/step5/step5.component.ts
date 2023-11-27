import { Component, OnInit } from "@angular/core";

import { OnboardingProcessService } from "../onboarding.process.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-step5",
  templateUrl: "./step5.component.html",
  styleUrls: ["./step5.component.scss"],
})
export class Step5Component {
  nextButtonClicked = false;

  step5Form = this.onboardingProcessService.step5Form;

  categories = [
    { value: 'U18', label: 'U18' },
    { value: 'U17', label: 'U17' },
    { value: 'U16', label: 'U16' },
    { value: 'U15', label: 'U15' },
    { value: 'U14', label: 'U14' },
    { value: 'U13', label: 'U13' },
    { value: 'U12', label: 'U12' },
    { value: 'U11', label: 'U11' },
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
    if (this.onboardingProcessService.step5Form.valid) {
      // If the form is valid, navigate to the next step
      this.router.navigate(["/login"]);
    } else {
      // If the form is invalid, show an error or handle it accordingly
      console.log("Please fill in all required fields in Step 5.");
    }
  }

}
