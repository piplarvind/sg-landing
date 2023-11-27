import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { OnboardingProcessService } from "../onboarding.process.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmPasswordValidator } from "@app/validators/confirm-password.validator";

@Component({
  selector: "app-step1",
  templateUrl: "./step1.component.html",
  styleUrls: ["./step1.component.scss"],
})
export class Step1Component {
  nextButtonClicked = false;
  userForm = this.onboardingProcessService.userForm;
  // userForm: FormGroup;

  constructor(
    private router: Router,
    private onboardingProcessService: OnboardingProcessService
    )
  {
  }

  onSubmit(): void {
    this.nextButtonClicked = true;
    // Perform form validation
    if (this.onboardingProcessService.userForm.valid) {
      // If the form is valid, navigate to the next step
      this.router.navigate(["/account/onboarding/step2"]);
    } else {
      // If the form is invalid, show an error or handle it accordingly
      console.log("Please fill in all required fields in Step 1.");
    }
  }
}
