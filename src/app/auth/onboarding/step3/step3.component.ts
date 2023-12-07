import { Component, OnInit } from "@angular/core";
import { OnboardingProcessService } from "../onboarding.process.service";
import { Router } from "@angular/router";
import { OnboardingService } from "../onboarding.service";
import { environment } from "@env/environment";
import { SharedService } from "@app/shared/shared.service";
@Component({
  selector: "app-step3",
  templateUrl: "./step3.component.html",
  styleUrls: ["./step3.component.scss"],
})
export class Step3Component implements OnInit {
  env: any = environment;

  nextButtonClicked = false;

  clubs: any = [];

  step3Form = this.onboardingProcessService.step3Form;

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
    if (this.onboardingProcessService.step3Form.valid) {
      const roleFormData = this.onboardingProcessService.step3Form.value;
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
          if(localStorage.getItem("userType") === 'ATH'){
            this.router.navigate(["/auth/onboarding/step4"]);
          }else if(localStorage.getItem("userType") === 'REC'){
            this.router.navigate(["/auth/onboarding/university-detail"]);
          }else if(localStorage.getItem("userType") === 'PAR'){
            this.router.navigate(["/auth/onboarding/select-athletes"]);
          }else if(localStorage.getItem("userType") === 'FFF'){
            this.router.navigate(["/auth/onboarding/success-screen"]); // need to change this once page is ready
          }else{
            this.router.navigate(["/auth/onboarding/success-screen"]);
          }
        },
        (error) => {
          //console.error("Error saving club data:", error);
          this.sharedService.showMessage(error.error.message);
          this.router.navigate(["/auth/onboarding/step3"]);
        }
      );
    } else {
      // If the form is invalid, show an error or handle it accordingly
      //console.log("Please fill in all required fields in Step 4.");
      this.sharedService.showMessage("Please select required field");
    }
  }

  selectClub(club: any) {
    this.step3Form.controls["club"].setValue(club._id); // Update 'club' with your actual form control name
  }
}
