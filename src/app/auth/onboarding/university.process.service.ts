// university.process.service.ts
import { Injectable } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class UniversityProcessService {
  universityForm = new FormGroup({
    profile_id: new FormControl(""),
    recruiter_title: new FormControl("", {
      validators: [Validators.required],
    }),
    official_email: new FormControl("", {
      validators: [Validators.required, Validators.email],
    }),
    program_website_url: new FormControl("", {
      validators: [Validators.required],
    }),
    university_name: new FormControl("", {
      validators: [Validators.required],
    }),
    street_address: new FormControl("", {
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
    mobile_phone: new FormControl("", {
      validators: [Validators.required],
    }),
  });
}
