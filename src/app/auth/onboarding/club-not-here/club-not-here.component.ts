import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ThemePalette } from "@angular/material/core";
import { ClubnothereProcessService } from "../clubnothere.process.service";
import { OnboardingService } from "../onboarding.service";
import { SharedService } from "@app/shared/shared.service";

@Component({
  selector: "app-club-not-here",
  templateUrl: "./club-not-here.component.html",
  styleUrls: ["./club-not-here.component.scss"],
})
export class ClubNotHereComponent implements OnInit {
  nextButtonClicked = false;
  clubForm = this.clubnothereProcessService.clubForm;
  genders: any;

  color: ThemePalette = "accent";
  checked = false;
  disabled = false;

  constructor(
    private router: Router,
    private clubnothereProcessService: ClubnothereProcessService,
    private onboardingService: OnboardingService,
    public sharedService: SharedService
  ) {}

  ngOnInit() {
   
  }



  onSubmit(): void {
    this.nextButtonClicked = true;
    // Perform form validation
    if (this.clubnothereProcessService.clubForm.valid) {
      const clubData = this.clubnothereProcessService.clubForm.value;
      clubData.profile_id = localStorage.getItem('userId');
      this.onboardingService.saveClubNotHereData(clubData).subscribe(
        (response) => {
          //console.log("Club data saved successfully:", response);
          localStorage.setItem("userId", response?.data?._id);
          // Navigate to the next step
          if (response?.status === "Success") {
            this.router.navigate(["/success-screen"]);
          } 
        },
        (error) => {
          //console.error("Error saving user data:", error);
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
              this.router.navigate(["/auth/onboarding/step1"]);
            }
          } else {
            //console.error("User already exist:", error);
            this.sharedService.showMessage("Please fill in all required fields");
            this.router.navigate(["/auth/onboarding/step1"]);
          }
        }
      );

      // this.router.navigate(["/auth/onboarding/step2"]);
    } else {
      // If the form is invalid, show an error or handle it accordingly
      this.sharedService.showMessage("Please fill in all required fields");
    }
  }

  
}
