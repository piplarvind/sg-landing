import { Component, OnInit } from "@angular/core";
import { finalize, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { MatTableDataSource } from "@angular/material/table";
import { SubscriptionService } from "./subscription.service";
import { OnboardingProcessService } from "@app/auth/onboarding/onboarding.process.service";
import { SharedService } from "@app/shared/shared.service";

@Component({
  selector: "app-subscription",
  templateUrl: "./subscription.component.html",
  styleUrls: ["./subscription.component.scss"],
})
export class SubscriptionComponent implements OnInit {
  subscriptionForm = this.onboardingProcessService.subscriptionForm;
  subscriptionList: any;
  requstData: {
    profile_id: any;
    profile_type: any;
  } = { profile_id: null, profile_type: null };

  constructor(
    private router: Router,
    public _DomSanitizationService: DomSanitizer,
    private onboardingProcessService: OnboardingProcessService,
    private subscriptionService: SubscriptionService,
    public sharedService: SharedService
  ) {}

  ngOnInit() {
    this.requstData.profile_id = localStorage.getItem("user_id");
    this.requstData.profile_type = localStorage.getItem("role_id");
    this.subscriptionService.getPlans(this.requstData).then((res) => {
      this.subscriptionList = res;
      //console.log('this.subscriptionList', this.subscriptionList);
    });
  }

  testBeta(subscription: any) {}

  onSubmit() {
    if (this.onboardingProcessService.subscriptionForm.valid) {
      const subscriptionFormData =
        this.onboardingProcessService.subscriptionForm.value;
      //console.log("subscriptionFormData", subscriptionFormData);
      localStorage.setItem('selectedPlan', subscriptionFormData.plan);
      this.router.navigate(["account/make-payment/"+subscriptionFormData.plan]);
    } else {
      this.sharedService.showMessage("Please select subscription");
    }
    
  }
}
