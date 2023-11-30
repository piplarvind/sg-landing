import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ThemePalette } from "@angular/material/core";
import { OnboardingProcessService } from "../onboarding.process.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmPasswordValidator } from "@app/validators/confirm-password.validator";
import { OnboardingService } from "../onboarding.service";
import { SharedService } from "@app/shared/shared.service";

@Component({
  selector: "app-step1",
  templateUrl: "./step1.component.html",
  styleUrls: ["./step1.component.scss"],
})
export class Step1Component implements OnInit {
  nextButtonClicked = false;
  userForm = this.onboardingProcessService.userForm;
  genders: any;

  color: ThemePalette = "accent";
  checked = false;
  disabled = false;

  constructor(
    private router: Router,
    private onboardingProcessService: OnboardingProcessService,
    private onboardingService: OnboardingService,
    public sharedService: SharedService
  ) {}

  ngOnInit() {
    // this.getGenders();
  }

  getGenders() {
    this.onboardingService.getGenders().subscribe(
      (response) => {
        console.log("gender data:", response);
      },
      (error) => {
        console.error("Error getting gender data:", error);
      }
    );
  }

  onSubmit(): void {
    this.nextButtonClicked = true;
    // Perform form validation
    if (this.onboardingProcessService.userForm.valid) {
      const userData = this.onboardingProcessService.userForm.value;
      const convertedData = this.convertData(userData);

      this.onboardingService.saveStep1Data(convertedData).subscribe(
        (response) => {
          //console.log("User data saved successfully:", response);
          localStorage.setItem("userId", response?.data?._id);
          // Navigate to the next step
          if (response?.data?.completed_steps === 1) {
            this.router.navigate(["/auth/onboarding/step2"]);
          } else if (response?.data?.completed_steps === 2) {
            this.router.navigate(["/auth/onboarding/step3"]);
          }
        },
        (error) => {
          if (error.status === 409) {
            localStorage.setItem("userId", error?.error?.data[0]?._id);
            if (error?.error?.data[0]?.completed_steps === 1) {
              this.router.navigate(["/auth/onboarding/step2"]);
            } else if (error?.error?.data[0]?.completed_steps === 2) {
              this.router.navigate(["/auth/onboarding/step3"]);
            } else if (error?.error?.data[0]?.completed_steps === 3) {
              this.router.navigate(["/auth/onboarding/step4"]);
            } else if (error?.error?.data[0]?.completed_steps === 4) {
              this.router.navigate(["/auth/onboarding/step5"]);
            } else {
              //console.error("User already exist:", error);
              this.sharedService
                .showDialog(`${error?.error?.message}`)
                .subscribe((response) => {
                  if (response === "") {
                    this.router.navigateByUrl("/auth/onboarding/step1");
                  }
                });
            }
          } else {
            //console.error("User already exist:", error);
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
      this.sharedService.showMessage("Please fill in all required fields");
    }
  }

  convertData(inputData) {
    const genderLookup = {
      male: "649d571a64477e1b40ca6e22",
      female: "647f68e91ce4530223e85d03",
      // Add more genders if needed
    };

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
