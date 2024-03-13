import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class PaymentProcessService {
  constructor() {}

  // Initialize form with default validators
  paymentForm = new FormGroup({
    promoCode: new FormControl(""),
    payer: new FormControl(""),
    behalf: new FormControl(""),
    planId: new FormControl(""),
    sportId: new FormControl(""),
    clubId: new FormControl(""),
    transaction_for: new FormControl(),
    is_event_transaction: new FormControl(),
    is_web_trans: new FormControl(true),
    ccnum: new FormControl("", Validators.required),
    exp_month: new FormControl("", Validators.required),
    exp_year: new FormControl("", Validators.required),
    ccexp: new FormControl(),
    cvv: new FormControl("", Validators.required),
  });

  // Update validators based on the amount
  updateValidators(package_amount: number) {
    const ccnumControl = this.paymentForm.get("ccnum");
    const exp_monthControl = this.paymentForm.get("exp_month");
    const exp_yearControl = this.paymentForm.get("exp_year");
    const cvvControl = this.paymentForm.get("cvv");

    if (package_amount === 0) {
      // If amount is zero, make fields optional
      ccnumControl.clearValidators();
      exp_monthControl.clearValidators();
      exp_yearControl.clearValidators();
      cvvControl.clearValidators();
    } else {
      // If amount is non-zero, add validators
      ccnumControl.setValidators([Validators.required, this.creditCardNumberValidator]);
      exp_monthControl.setValidators(Validators.required);
      exp_yearControl.setValidators(Validators.required);
      cvvControl.setValidators([Validators.required, this.cvvValidator]);
    }

    // Update validators
    ccnumControl.updateValueAndValidity();
    exp_monthControl.updateValueAndValidity();
    exp_yearControl.updateValueAndValidity();
    cvvControl.updateValueAndValidity();
  }

  // Custom validator function for credit card number
  creditCardNumberValidator(control: FormControl) {
    const value = control.value;
    // Perform your credit card number validation logic here
    // For simplicity, let's assume a basic validation for a 16-digit number
    const isValid = /^\d{16}$/.test(value);
    return isValid ? null : { invalidCreditCardNumber: true };
  }

  // Custom validator function for CVV
  cvvValidator(control: FormControl) {
    const value = control.value;
    const isValid = /^\d{3,4}$/.test(value);
    return isValid ? null : { invalidCvv: true };
  }
}
