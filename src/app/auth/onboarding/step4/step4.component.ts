import { Component, OnInit } from "@angular/core";

import { OnboardingProcessService } from "../onboarding.process.service";
import { Router } from "@angular/router";
import { OnboardingService } from "../onboarding.service";
import { SharedService } from "@app/shared/shared.service";
@Component({
  selector: "app-step4",
  templateUrl: "./step4.component.html",
  styleUrls: ["./step4.component.scss"],
})
export class Step4Component {
  nextButtonClicked = false;

  step4Form = this.onboardingProcessService.step4Form;

  ages: any = [];

  constructor(
    private router: Router,
    private onboardingProcessService: OnboardingProcessService,
    private onboardingService: OnboardingService,
    public sharedService: SharedService
  ) {}

  ngOnInit() {
    this.getSportClubs();
  }

  getSportClubs() {
    let gender = localStorage.getItem("genderId");
    let club = localStorage.getItem("clubId");
    this.onboardingService.getClubGenderAges(club, gender).subscribe(
      (response) => {
        this.ages = response.data;
      },
      (error) => {
        this.sharedService.showMessage(error.error.message);
      }
    );
  }

  onSubmit(): void {
    this.nextButtonClicked = true;
    // Perform form validation
    if (this.onboardingProcessService.step4Form.valid) {
      const ageFormData = this.onboardingProcessService.step4Form.value;

      let ageData = {
        profile_id: localStorage.getItem("userId"),
        profile_fields_data: [
          {
            field: "age",
            value: ageFormData.age,
          },
        ],
      };

      this.onboardingService.saveAgeData(ageData).subscribe(
        (response) => {
          //console.log("Age data saved successfully:", response.data);
          //this.sharedService.showMessage(response.message);
          // Navigate to the next step
          if (localStorage.getItem("userType") === "ATH" || localStorage.getItem("userType") === "FFF") {
            // Navigate to the next step
            this.router.navigate(["/auth/onboarding/select-subscription"]);
          } else if (localStorage.getItem("userType") === "REC") {
            // Navigate to the next step to verify the mobile number
            this.router.navigate(["/auth/onboarding/university-detail"]);
          } else {
            this.router.navigate(["/login"]);
          }
        },
        (error) => {
          //console.error("Error saving age data:", error);
          this.sharedService.showMessage(error.error.message);
          this.router.navigate(["/auth/onboarding/step4"]);
        }
      );
      //
    } else {
      // If the form is invalid, show an error or handle it accordingly
      //console.log("Please fill in all required fields in Step 5.");
      //this.sharedService.showMessage("Please select required field");
    }
  }
}
