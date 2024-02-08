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
export class ClubnothereProcessService {
  clubForm = new FormGroup({
    profile_id: new FormControl(""),
    club_name: new FormControl("", {
      validators: [Validators.required],
    }),
    club_contac_person: new FormControl("", {
      validators: [Validators.required],
    }),
    club_email: new FormControl("", {
      validators: [Validators.required, Validators.email],
    }),
    club_address: new FormControl("", {
      validators: [Validators.required],
    }),
    city: new FormControl("", {
      validators: [Validators.required],
    }),
    state: new FormControl("", {
      validators: [Validators.required],
    }),
    zip: new FormControl("", {
      validators: [Validators.required],
    }),
    phone_code: new FormControl("1", {
      validators: [Validators.required],
    }),
    mobile_no: new FormControl("", {
      validators: [Validators.required],
    }),
    your_name: new FormControl("", {
      validators: [Validators.required],
    }),
    your_phone_code: new FormControl("1", {
      validators: [Validators.required],
    }),   
    your_mobile_no: new FormControl("", {
      validators: [Validators.required],
    }),
  });
}
