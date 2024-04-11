import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ThemePalette } from "@angular/material/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ConfirmPasswordValidator } from "@app/validators/confirm-password.validator";
import { SharedService } from "@app/shared/shared.service";
// import { RegisterService } from "./register.service";

@Component({
  selector: "app-get-in-touch",
  templateUrl: "./get-in-touch.component.html",
  styleUrls: ["./get-in-touch.component.scss"],
})
export class GetInTouchComponent implements OnInit {
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
    // private registerService: RegisterService,
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

  ngOnInit() {
    localStorage.removeItem("stepperCurrentStepIndex");
  }

  togglePasswordVisibility(controlName: string): void {
    if (controlName === "password") {
      this.showPassword = !this.showPassword;
    } else if (controlName === "cPassword") {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onSubmit(): void {
    this.submitButtonClicked = true;
  }

  convertData(inputData: any) {
    const profileFieldsData = [
      { field: "first_name", value: inputData.first_name },
      { field: "last_name", value: inputData.last_name },
      // { field: "user_name", value: inputData.user_name },
      { field: "email", value: inputData.email },
      // { field: "gender", value: genderLookup.male },
      { field: "mobile_phone", value: inputData.mobile_phone },
    ];

    const convertedData = {
      profile_fields_data: profileFieldsData,
      password: inputData.password,
      platform: "Web", // or "iOS" depending on the platform
    };

    return convertedData;
  }
}

