import { Component, OnInit } from "@angular/core";

import { OnboardingProcessService } from "../onboarding.process.service";
import { Router } from "@angular/router";
import { OnboardingService } from "../onboarding.service";
@Component({
  selector: "app-step5",
  templateUrl: "./step5.component.html",
  styleUrls: ["./step5.component.scss"],
})
export class Step5Component {
  nextButtonClicked = false;

  step5Form = this.onboardingProcessService.step5Form;

  ages: any = [];

  constructor(
    private router: Router,
    private onboardingProcessService: OnboardingProcessService,
    private onboardingService: OnboardingService
  ) {}

  ngOnInit() {
    this.getSportClubs();
  }

  getSportClubs() {
    let gender = localStorage.getItem("genderId");
    this.onboardingService.getGenderAges(gender).subscribe(
      (response) => {
        console.log("ages data:", response);
        this.ages = response.data;
      },
      (error) => {
        console.error("Error getting ages data:", error);
      }
    );
  }

  onSubmit(): void {
    this.nextButtonClicked = true;
    // Perform form validation
    if (this.onboardingProcessService.step5Form.valid) {
      const ageFormData = this.onboardingProcessService.step5Form.value;

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
          // localStorage.removeItem('userId');
          // localStorage.removeItem('sportId');
          // localStorage.removeItem('genderId');
          // localStorage.removeItem('clubId');
          console.log("Age data saved successfully:", response.data);
          // Navigate to the next step
          this.router.navigate(["/login"]);
        },
        (error) => {
          console.error("Error saving age data:", error);
          this.router.navigate(["/auth/onboarding/step5"]);
        }
      );
      //
    } else {
      // If the form is invalid, show an error or handle it accordingly
      console.log("Please fill in all required fields in Step 5.");
    }
  }
}
