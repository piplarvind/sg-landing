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
export class OTPProcessService {
  otpForm = new FormGroup({
    profile_id: new FormControl(""),  
    otp: new FormControl("", {
      validators: [Validators.required],
    }),  
    country_code: new FormControl("1", {
      validators: [Validators.required],
    }),
    phone_number: new FormControl("", {
      validators: [Validators.required],
    }),
  });
}
