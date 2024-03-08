// clubnothere.process.service.ts
import { Injectable } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class PaymentProcessService {
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
    ccnum: new FormControl("", {
      validators: [Validators.required, this.creditCardNumberValidator],
    }),
    exp_month: new FormControl("", {
      validators: [Validators.required],
    }),
    exp_year: new FormControl("", {
      validators: [Validators.required],
    }),
    ccexp: new FormControl(),
    cvv: new FormControl("", {
      validators: [Validators.required, this.cvvValidator],
    })
  });

  // Custom validator function for credit card number
  creditCardNumberValidator(control: FormControl) {
    const value = control.value;

    // Perform your credit card number validation logic here
    // For simplicity, let's assume a basic validation for a 16-digit number
    const isValid = /^\d{16}$/.test(value);

    return isValid ? null : { invalidCreditCardNumber: true };
  }

  cvvValidator(control: FormControl) {
    const value = control.value;
    const isValid = /^\d{3,4}$/.test(value);
    return isValid ? null : { invalidCvv: true };
  }
}
