import { Component, OnInit } from "@angular/core";

import { OnboardingProcessService } from "../onboarding.process.service";
import { Router } from "@angular/router";
import { OnboardingService } from "../onboarding.service";
import { SharedService } from "@app/shared/shared.service";
@Component({
  selector: "app-step1",
  templateUrl: "./step1.component.html",
  styleUrls: ["./step1.component.scss"],
})
export class Step1Component implements OnInit {
  nextButtonClicked = false;

  step1Form = this.onboardingProcessService.step1Form;

  sports: any = [];

  constructor(
    private router: Router,
    private onboardingProcessService: OnboardingProcessService,
    private onboardingService: OnboardingService,
    public sharedService: SharedService
  ) {}

  ngOnInit() {
    this.getSports();
  }

  getSports() {
    this.onboardingService.getSports().subscribe(
      (response) => {
        //console.log("sport data:", response);
        this.sports = response.data;
      },
      (error) => {
        //console.error("Error getting sport data:", error);
        this.sharedService.showMessage(error.error.message);
      }
    );
  }

  onSubmit(): void {
    this.nextButtonClicked = true;
    // Perform form validation
    if (this.onboardingProcessService.step1Form.valid) {
      const sportFormData = this.onboardingProcessService.step1Form.value;
      localStorage.setItem("sportId", sportFormData.sport);
      let sportData = {
        profile_id: localStorage.getItem('userId'),
        sport_id: sportFormData.sport
      }
      
      this.onboardingService.saveSportData(sportData).subscribe(
        (response) => {
          //console.log("Sport data saved successfully:", response.data);
          //this.sharedService.showMessage(response.message);
          // Navigate to the next step
          this.router.navigate(["/auth/onboarding/step2"]);
        },
        (error) => {
          //console.error("Error saving user data:", error);
          this.sharedService.showMessage(error.error.message);
          this.router.navigate(["/auth/register"]);
        }
      );
    } else {
      // If the form is invalid, show an error or handle it accordingly
      //console.log("Please fill in all required fields in Step 2.");
      //this.sharedService.showMessage("Please select required field");
    }
  }
}
