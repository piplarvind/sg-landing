import { Component, OnInit } from "@angular/core";
import { OnboardingProcessService } from "../onboarding.process.service";
import { Router } from "@angular/router";
import { OnboardingService } from "../onboarding.service";
import { environment } from "@env/environment";
import { SharedService } from "@app/shared/shared.service";
@Component({
  selector: "app-step4",
  templateUrl: "./step4.component.html",
  styleUrls: ["./step4.component.scss"],
})
export class Step4Component implements OnInit {
  env: any = environment;

  nextButtonClicked = false;

  clubs: any = [];

  step4Form = this.onboardingProcessService.step4Form;

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
    let sport = {
      sport: localStorage.getItem("sportId"),
    };
    this.onboardingService.getClubsBySport(sport).subscribe(
      (response) => {
        //console.log("club data:", response);
        this.clubs = response.data;
      },
      (error) => {
        //console.error("Error getting gender data:", error);
        this.sharedService.showMessage(error.error.message);
      }
    );
  }

  onSubmit(): void {
    this.nextButtonClicked = true;
    // Perform form validation
    if (this.onboardingProcessService.step4Form.valid) {
      const roleFormData = this.onboardingProcessService.step4Form.value;
      // set gender to local storage
      localStorage.setItem("clubId", roleFormData.club);
      let clubData = {
        profile_id: localStorage.getItem("userId"),
        club_id: [roleFormData.club],
      };
      this.onboardingService.saveClubData(clubData).subscribe(
        (response) => {
          // console.log("Club data saved successfully:", response.data);
          this.sharedService.showMessage(response.message);
          if (localStorage.getItem("userType") === "ATH") {
            // Navigate to the next step
            this.router.navigate(["/auth/onboarding/step5"]);
          } else if (localStorage.getItem("userType") === "REC") {
            // Navigate to the next step to verify the mobile number
            this.router.navigate(["/auth/onboarding/university-detail"]);
          } else {
            this.router.navigate(["/login"]);
          }
        },
        (error) => {
          //console.error("Error saving club data:", error);
          this.sharedService.showMessage(error.error.message);
          this.router.navigate(["/auth/onboarding/step4"]);
        }
      );
    } else {
      // If the form is invalid, show an error or handle it accordingly
      //console.log("Please fill in all required fields in Step 4.");
      this.sharedService.showMessage("Please fill all required fields");
    }
  }

  selectClub(club: any) {
    this.step4Form.controls["club"].setValue(club._id); // Update 'club' with your actual form control name
  }
}
