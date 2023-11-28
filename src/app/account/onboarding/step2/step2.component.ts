import { Component, OnInit } from "@angular/core";

import { OnboardingProcessService } from "../onboarding.process.service";
import { Router } from "@angular/router";
import { OnboardingService } from "../onboarding.service";
@Component({
  selector: "app-step2",
  templateUrl: "./step2.component.html",
  styleUrls: ["./step2.component.scss"],
})
export class Step2Component implements OnInit {
  nextButtonClicked = false;

  step2Form = this.onboardingProcessService.step2Form;

  sports: any = [];
  // sports = [
  //   { value: 'football', label: 'Football' },
  //   { value: 'basketball', label: 'Basketball' },
  //   { value: 'soccer', label: 'Soccer' },
  //   { value: 'tennis', label: 'Tennis' },
  //   { value: 'volleyball', label: 'Volleyball' },
  // ];

  constructor(
    private router: Router,
    private onboardingProcessService: OnboardingProcessService,
    private onboardingService: OnboardingService
  ) {}

  ngOnInit() {
    this.getSports();
  }

  getSports() {
    this.onboardingService.getSports().subscribe(
      (response) => {
        console.log("sport data:", response);
        this.sports = response.data;
      },
      (error) => {
        console.error("Error getting sport data:", error);
      }
    );
  }

  onSubmit(): void {
    this.nextButtonClicked = true;
    // Perform form validation
    if (this.onboardingProcessService.step2Form.valid) {
      const sportFormData = this.onboardingProcessService.step2Form.value;
      localStorage.setItem("sportId", sportFormData.sport);
      let sportData = {
        profile_id: localStorage.getItem('userId'),
        sport_id: sportFormData.sport
      }
      
      this.onboardingService.saveSportData(sportData).subscribe(
        (response) => {
          console.log("Sport data saved successfully:", response.data);
          // Navigate to the next step
          this.router.navigate(["/account/onboarding/step3"]);
        },
        (error) => {
          console.error("Error saving user data:", error);
          this.router.navigate(["/account/onboarding/step2"]);
        }
      );
    } else {
      // If the form is invalid, show an error or handle it accordingly
      console.log("Please fill in all required fields in Step 2.");
    }
  }
}
