// onboarding.process.service.ts
import { Injectable } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class OnboardingProcessService {
  step1Form = new FormGroup({
    sport: new FormControl("", {
      validators: [Validators.required],
    }),
  });
  step2Form = new FormGroup({
    role: new FormControl("", {
      validators: [Validators.required],
    }),
    gender: new FormControl("", {
      validators: [Validators.required],
    }),
  });

  step3Form = new FormGroup({
    club: new FormControl("", {
      validators: [Validators.required],
    }),
  });

  step4Form = new FormGroup({
    age: new FormControl("", {
      validators: [Validators.required],
    }),
  });

  subscriptionForm = new FormGroup({
    plan: new FormControl("", {
      validators: [Validators.required],
    }),
  });

  // Add a method to set validators for the gender field dynamically
  setGenderValidators(required: boolean): void {
    const validators = required ? [Validators.required] : [];
    this.step3Form.get('gender')?.setValidators(validators);
    this.step3Form.get('gender')?.updateValueAndValidity();
  }

  // Update the step3Form when the role changes
  updateStep3Form(role: string): void {
    // You may need to adjust the condition based on your specific logic
    const isGenderRequired = role === 'ATH';

    // Set validators for the gender field based on the role
    this.setGenderValidators(isGenderRequired);
  }

}
