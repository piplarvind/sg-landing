import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ThemePalette } from "@angular/material/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ConfirmPasswordValidator } from "@app/validators/confirm-password.validator";
import { SharedService } from "@app/shared/shared.service";
import { RegisterService } from "./register.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  submitButtonClicked = false;
  registerForm: FormGroup = new FormGroup({
    first_name: new FormControl(""),
    last_name: new FormControl(""),
    user_name: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    cPassword: new FormControl(""),
    acceptTerms: new FormControl(""),
  });
  genders: any;

  color: ThemePalette = "accent";
  checked = false;
  disabled = false;

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    public sharedService: SharedService
  ) {
    this.registerForm = this.formBuilder.group(
      {
        first_name: ["", Validators.required],
        last_name: ["", Validators.required],
        user_name: ["", Validators.required],
        email: ["", Validators.required],
        password: ["", Validators.required],
        cPassword: ["", Validators.required],
        acceptTerms: ["", Validators.required],
      },
      {
        validator: ConfirmPasswordValidator("password", "cPassword"),
      }
    );
  }

  ngOnInit() {}

  togglePasswordVisibility(controlName: string): void {
    if (controlName === "password") {
      this.showPassword = !this.showPassword;
    } else if (controlName === "cPassword") {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onSubmit(): void {
    this.submitButtonClicked = true;
    // Perform form validation
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      const convertedData = this.convertData(userData);

      this.registerService.saveUserData(convertedData).subscribe(
        (response) => {
          //console.log("User data saved successfully:", response);
          localStorage.setItem("userId", response?.data?._id);
          // Navigate to the next step
          if (response?.data?.completed_steps === 1) {
            this.router.navigate(["/auth/onboarding/step1"]);
          } else if (response?.data?.completed_steps === 2) {
            this.router.navigate(["/auth/onboarding/step2"]);
          }
        },
        (error) => {
          if (error.status === 409) {
            if (error?.error?.data[0]?.is_onboarding_done) {
              this.sharedService.showMessage(
                "You have already registered, please login"
              );
              this.router.navigate(["/login"]);
            }
            localStorage.setItem("userId", error?.error?.data[0]?._id);
            if (error?.error?.data[0]?.completed_steps === 1) {
              this.router.navigate(["/auth/onboarding/step1"]);
            } else if (error?.error?.data[0]?.completed_steps === 2) {
              this.router.navigate(["/auth/onboarding/step2"]);
            } else if (error?.error?.data[0]?.completed_steps === 3) {
              localStorage.setItem("sportId", error?.error?.data[0]?.sport);
              this.router.navigate(["/auth/onboarding/step3"]);
            } else if (error?.error?.data[0]?.completed_steps === 4) {
              this.router.navigate(["/auth/onboarding/step4"]);
            } else {
              //console.error("User already exist:", error);
              //console.log('error?.error?.data[0]?.types.abbr', error?.error?.data[0]?.types[0].abbr);
              if (error?.error?.data[0]?.types[0].abbr === "REC") {
                if (error?.error?.data[0]?.is_mobile_verified === false) {
                  this.router.navigate(["/auth/onboarding/university-detail"]);
                }
              } else {
                this.sharedService
                  .showDialog(`${error?.error?.message}`)
                  .subscribe((response) => {
                    if (response === "") {
                      this.router.navigateByUrl("/auth/onboarding/step1");
                    }
                  });
              }
            }
          } else {
            // console.error("User already exist:", error?.error?.message);
            this.sharedService
              .showDialog(`${error?.error?.message}`)
              .subscribe((response) => {
                if (response === "") {
                  this.router.navigateByUrl("/auth/onboarding/step1");
                }
              });
          }
        }
      );
      // this.router.navigate(["/auth/onboarding/step2"]);
    } else {
      // If the form is invalid, show an error or handle it accordingly
      //console.log("Please fill in all required fields in Step 1.");
      if (
        this.registerForm.get("first_name")?.hasError("required") ||
        this.registerForm.get("last_name")?.hasError("required") ||
        this.registerForm.get("user_name")?.hasError("required") ||
        this.registerForm.get("email")?.hasError("required") ||
        this.registerForm.get("email")?.hasError("email") ||
        this.registerForm.get("password")?.hasError("required") ||
        this.registerForm.get("cPassword")?.hasError("required") ||
        this.registerForm.get("cPassword")?.errors?.confirmPasswordValidator
      ) {
        this.sharedService.showMessage("Please fill all required fields");
      } else {
        this.sharedService.showMessage(
          "Please agree to the terms of usage & privacy policy"
        );
      }
    }
  }

  convertData(inputData) {
    const profileFieldsData = [
      { field: "first_name", value: inputData.first_name },
      { field: "last_name", value: inputData.last_name },
      { field: "user_name", value: inputData.user_name },
      { field: "email", value: inputData.email },
      // { field: "gender", value: genderLookup.male },
      // { field: "mobile_phone", value: inputData.mobile_phone },
    ];

    const convertedData = {
      profile_fields_data: profileFieldsData,
      password: inputData.password,
      platform: "Web", // or "iOS" depending on the platform
    };

    return convertedData;
  }
}
