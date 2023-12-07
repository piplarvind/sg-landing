import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { SharedService } from "@app/shared/shared.service";
import { DomSanitizer } from "@angular/platform-browser";

//
import { SubscriptionService } from "@app/pages/account/subscription/subscription.service";
import { OnboardingProcessService } from "../onboarding.process.service";
import { OnboardingService } from './../onboarding.service';

@Component({
  selector: "app-select-athletes",
  templateUrl: "./select-athletes.component.html",
  styleUrls: ["./select-athletes.component.scss"],
})
export class SelectAthletesComponent {
  athletesForm: FormGroup = new FormGroup({
    athletes: new FormControl("")
  });
  nextButtonClicked = false;

  athleteList: any;

  constructor(
    private router: Router,
    public _DomSanitizationService: DomSanitizer,
    private onboardingProcessService: OnboardingProcessService,
    private onboardingService: OnboardingService,
    private subscriptionService: SubscriptionService,
    public sharedService: SharedService
  ) {}

  ngOnInit() {
    let clubPayload = {
      club: localStorage.getItem("clubId")
    };
    this.onboardingService.getClubAthletes(clubPayload).subscribe(
      (response) => {
        this.athleteList = response.data;
        console.log('athleteList', this.athleteList);
      },
      (error) => {
        //console.error("Error saving club data:", error);
        this.sharedService.showMessage(error.error.message);
      }
    );
  }

  testBeta(subscription: any) {}

  onSubmit() {
    if (this.onboardingProcessService.subscriptionForm.valid) {
      const subscriptionFormData =
        this.onboardingProcessService.subscriptionForm.value;
      //console.log("subscriptionFormData", subscriptionFormData);
      localStorage.setItem('selectedPlan', subscriptionFormData.plan);
      this.router.navigate(["auth/onboarding/do-payment/"+subscriptionFormData.plan]);
    } else {
      this.sharedService.showMessage("Please select subscription");
    }
    
  }
}
