import { Component, OnInit } from "@angular/core";

import { OnboardingProcessService } from "../onboarding.process.service";
import { Router } from "@angular/router";
import { SharedService } from "@app/shared/shared.service";
import { DomSanitizer } from "@angular/platform-browser";
import { SubscriptionService } from "@app/pages/account/subscription/subscription.service";
import { PaymentProcessService } from "../payment.process.service";
import { PaymentService } from "@app/pages/account/make-payment/payment.service";
@Component({
  selector: "app-select-subscription",
  templateUrl: "./select-subscription.component.html",
  styleUrls: ["./select-subscription.component.scss"],
})
export class SelectSubscriptionComponent {
  subscriptionForm = this.onboardingProcessService.subscriptionForm;
  paymentForm = this.paymentProcessService.paymentForm;
  subscriptionList: any;
  requstData: {
    profile_id: any;
    profile_type: any;
  } = { profile_id: null, profile_type: null };

  constructor(
    private router: Router,
    public _DomSanitizationService: DomSanitizer,
    private onboardingProcessService: OnboardingProcessService,
    private paymentProcessService: PaymentProcessService,
    private subscriptionService: SubscriptionService,
    public sharedService: SharedService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.requstData.profile_id = localStorage.getItem("userId");
    this.requstData.profile_type = localStorage.getItem("selectedRoleValue");
    this.subscriptionService.getPlans(this.requstData).then((res) => {
      this.subscriptionList = res;
      //console.log('this.subscriptionList', this.subscriptionList);
    });
  }

  betaTesting() {

    if (this.paymentProcessService.paymentForm.valid) {
      const paymentFormData = this.paymentProcessService.paymentForm.value;
      paymentFormData.planId = localStorage.getItem("selectedPlan");
      paymentFormData.payer = localStorage.getItem("user_id");
      paymentFormData.clubId = localStorage.getItem("club_id");
      paymentFormData.sportId = localStorage.getItem("sport_id");
      paymentFormData.is_event_transaction = false;
      paymentFormData.transaction_for = "subscription";
      paymentFormData.ccexp =
        paymentFormData.exp_month + paymentFormData.exp_year;
      //console.log("paymentFormData", paymentFormData);
      this.paymentService
        .subscribeBeta(paymentFormData)
        .then((res: any) => {
          const resData = res.data;
          this.sharedService.showMessage(res?.message);
          this.router.navigate(["login"]);
        })
        .catch((error) => {
          console.log(error);
          this.sharedService.showMessage(error?.error.message);
        });
    } else {
      this.sharedService.showMessage("Please select subscription");
    }
  }

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
