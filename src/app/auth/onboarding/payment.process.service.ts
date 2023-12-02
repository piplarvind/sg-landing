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
    payer: new FormControl(""),
    planId: new FormControl(""),
    ccnum: new FormControl("", {
      validators: [Validators.required],
    }),
    exp_month: new FormControl("", {
      validators: [Validators.required],
    }),
    exp_year: new FormControl("", {
      validators: [Validators.required],
    }),
    cvv: new FormControl("", {
      validators: [Validators.required],
    })
  });
}
