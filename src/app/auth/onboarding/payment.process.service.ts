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
    behalf: new FormControl(""),
    planId: new FormControl(""),
    sportId: new FormControl(""),
    clubId: new FormControl(""),
    transaction_for: new FormControl(),
    is_event_transaction: new FormControl(),
    is_web_trans: new FormControl(true),
    ccnum: new FormControl("", {
      validators: [Validators.required],
    }),
    exp_month: new FormControl("", {
      validators: [Validators.required],
    }),
    exp_year: new FormControl("", {
      validators: [Validators.required],
    }),
    ccexp: new FormControl(),
    cvv: new FormControl("", {
      validators: [Validators.required],
    })
  });
}
