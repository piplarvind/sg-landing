import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ThemePalette } from "@angular/material/core";
import { UniversityProcessService } from "../university.process.service";
import { OnboardingService } from "../onboarding.service";
import { SharedService } from "@app/shared/shared.service";

@Component({
  selector: "app-university-detail",
  templateUrl: "./university-detail.component.html",
  styleUrls: ["./university-detail.component.scss"],
})
export class UniversityDetailComponent implements OnInit {
  nextButtonClicked = false;
  universityForm = this.universityProcessService.universityForm;
  genders: any;

  color: ThemePalette = "accent";
  checked = false;
  disabled = false;

  constructor(
    private router: Router,
    private universityProcessService: UniversityProcessService,
    private onboardingService: OnboardingService,
    public sharedService: SharedService
  ) {}

  ngOnInit() {}

  onSubmit(): void {
    this.nextButtonClicked = true;
    // Perform form validation
    if (this.universityProcessService.universityForm.valid) {
      const universityData = this.universityProcessService.universityForm.value;
      const convertedData = this.convertData(universityData);

      this.onboardingService.saveUniversityData(convertedData).subscribe(
        (response) => {
          //console.log("University data saved successfully:", response);
          this.sharedService.showMessage(response.message);
          localStorage.setItem("userId", response?.data?._id);
          // Navigate to the next step
          if (response?.status === "Success") {
            localStorage.setItem("userId", response.data?._id);
            localStorage.setItem("phone_code", response?.data?.phone_code);
            localStorage.setItem("mobile_phone", response?.data?.mobile_phone);
            localStorage.setItem("otp", response?.data?.otp);
            this.router.navigate(["/otp"]);
          }
        },
        (error) => {
          //console.error("Error saving data:", error);
          if (error.status === 409) {
            localStorage.setItem("userId", error?.error?.data?._id);
            if (error?.error?.data[0]?.completed_steps === 1) {
              this.router.navigate(["/auth/onboarding/step2"]);
            } else if (error?.error?.data[0]?.completed_steps === 2) {
              this.router.navigate(["/auth/onboarding/step3"]);
            } else if (error?.error?.data[0]?.completed_steps === 3) {
              this.router.navigate(["/auth/onboarding/step4"]);
            } else if (error?.error?.data[0]?.completed_steps === 4) {
              this.router.navigate(["/auth/onboarding/step5"]);
            } else {
              console.error("User already exist:", error);
              this.router.navigate(["/auth/onboarding/step1"]);
            }
          } else {
            console.error("User already exist:", error);
            this.router.navigate(["/auth/onboarding/step1"]);
          }
        }
      );

      // this.router.navigate(["/auth/onboarding/step2"]);
    } else {
      // If the form is invalid, show an error or handle it accordingly
      console.log("Please fill all required fields.");
    }
  }

  convertData(inputData:any) {
    const profileFieldsData = [
      { field: "recruiter_title", value: inputData.recruiter_title },
      { field: "official_email", value: inputData.official_email },
      { field: "program_website_url", value: inputData.program_website_url },
      { field: "university_name", value: inputData.university_name },
      { field: "phone_code", value: inputData.phone_code },
      { field: "mobile_phone", value: inputData.mobile_phone },
      { field: "street_address", value: inputData.street_address },
      { field: "city", value: inputData.city },
      { field: "state", value: inputData.state },
      { field: "zip", value: inputData.zip },
    ];

    localStorage.setItem("phone_code", inputData.phone_code );
    localStorage.setItem("mobile_phone", inputData.mobile_phone);

    const convertedData = {
      profile_fields_data: profileFieldsData,
      profile_id: localStorage.getItem("userId"),
    };

    return convertedData;
  }
}
