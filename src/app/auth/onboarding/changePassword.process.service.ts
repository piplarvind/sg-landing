import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordProcessService {
  changePasswordForm = new FormGroup({
    old_password: new FormControl('', {
      validators: [Validators.required],
    }),
    new_password: new FormControl('', {
      validators: [Validators.required],
    }),
    confirm_password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  private passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const newPassword = this.changePasswordForm.get('new_password')?.value;
      const confirmPassword = control.value;

      // Check if the passwords match
      return newPassword === confirmPassword ? null : { passwordMismatch: true };
    };
  }
}
