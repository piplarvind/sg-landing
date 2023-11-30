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
  userForm = new FormGroup({
    first_name: new FormControl("", {
      validators: [Validators.required],
    }),
    last_name: new FormControl("", {
      validators: [Validators.required],
    }),
    user_name: new FormControl("", {
      validators: [Validators.required],
    }),
    // mobile_phone: new FormControl("", {
    //   validators: [Validators.required],
    // }),
    email: new FormControl("", {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl("", {
      validators: [Validators.required],
    }),
    cPassword: new FormControl("", {
      validators: [
        Validators.required,
        // this.customPasswordValidator
      ],
    }),
    acceptTerms: new FormControl("", {
      validators: [Validators.requiredTrue],
    }),
  });

  step2Form = new FormGroup({
    sport: new FormControl("", {
      validators: [Validators.required],
    }),
  });
  step3Form = new FormGroup({
    role: new FormControl("", {
      validators: [Validators.required],
    }),
    gender: new FormControl("", {
      validators: [Validators.required],
    }),
  });

  step4Form = new FormGroup({
    club: new FormControl("", {
      validators: [Validators.required],
    }),
  });

  step5Form = new FormGroup({
    age: new FormControl("", {
      validators: [Validators.required],
    }),
  });

  canDeactivate(): boolean {
    return this.userForm.valid && this.step2Form.valid;
  }

  // Add a method to set validators for the gender field dynamically
  setGenderValidators(required: boolean): void {
    const validators = required ? [Validators.required] : [];
    this.step3Form.get('gender')?.setValidators(validators);
    this.step3Form.get('gender')?.updateValueAndValidity();
  }

  // Update the step3Form when the role changes
  updateStep3Form(role: string): void {
    // You may need to adjust the condition based on your specific logic
    const isGenderRequired = role !== 'ATH';

    // Set validators for the gender field based on the role
    this.setGenderValidators(isGenderRequired);
  }

  /* private customPasswordValidator(control: AbstractControl): ValidationErrors | null {
    console.log('this.userForm', this.userForm);
    const password = this.userForm.get('password')?.value;
    const cPassword = control.value;
  
    return password === cPassword ? null : { passwordMismatch: true };
  } */
}
