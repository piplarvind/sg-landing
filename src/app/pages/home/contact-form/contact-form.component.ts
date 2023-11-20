import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { HomeService } from "../home.service";
import { SharedService } from "@app/shared/shared.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-contact-form",
  templateUrl: "./contact-form.component.html",
  styleUrls: ["./contact-form.component.scss"],
})
export class ContactFormComponent {
  contactForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public sharedService: SharedService,
    private homeService: HomeService
  ) {
    this.contactForm = this.formBuilder.group({
      first_name: ["", [Validators.required, Validators.minLength(2)]],
      last_name: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      feedback: ["", [Validators.required, Validators.minLength(10)]],
      mobile_no: [""],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.valid) {
      this.sharedService.showLoader = true;
      const formData = this.contactForm.value;
      this.homeService
        .submitContactForm(formData)
        .then((res: any) => {
          this.sharedService.showLoader = false;
          // After a successful submission, reset the form
          this.contactForm.reset();
          // this.sharedService.loginDialog(res.message);
          this.sharedService.loginDialog(
            "Thank you for reaching out! Your message is important to us, and we'll get back to you shortly."
          );
          this.router.navigateByUrl("/");
        })
        .catch((err) => {
          console.log(err);
          this.sharedService.showLoader = false;
        });
      this.submitted = false;
    }
  }
}
