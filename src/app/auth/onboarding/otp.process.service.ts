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
    phone_code: new FormControl("US", {
      validators: [Validators.required],
    }),
    phone_number: new FormControl("", {
      validators: [Validators.required],
    }),
  });
}
