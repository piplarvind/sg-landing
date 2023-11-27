// onboarding.process.service.ts
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class OnboardingProcessService {
  userForm = new FormGroup({
    firstName: new FormControl('', {
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
    cPassword: new FormControl('', {
      validators: [Validators.required, 
        // this.customPasswordValidator
      ],
    }),
  });

  step2Form = new FormGroup({
    sport: new FormControl('', {
      validators: [Validators.required],
    }),
  });
  step3Form = new FormGroup({
    role: new FormControl('', {
      validators: [Validators.required],
    })
  });

  step4Form = new FormGroup({
    club: new FormControl('', {
      validators: [Validators.required],
    })
  });

  step5Form = new FormGroup({
    age: new FormControl('', {
      validators: [Validators.required],
    })
  });

  canDeactivate(): boolean {
    return this.userForm.valid && this.step2Form.valid;
  }

  /* private customPasswordValidator(control: AbstractControl): ValidationErrors | null {
    console.log('this.userForm', this.userForm);
    const password = this.userForm.get('password')?.value;
    const cPassword = control.value;
  
    return password === cPassword ? null : { passwordMismatch: true };
  } */
  
}
