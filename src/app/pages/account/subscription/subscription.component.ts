import { Component, OnInit } from "@angular/core";
import { finalize, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { MatTableDataSource } from "@angular/material/table";
import { SubscriptionService } from "./subscription.service";
import { OnboardingProcessService } from "@app/auth/onboarding/onboarding.process.service";
import { SharedService } from "@app/shared/shared.service";
import { PaymentService } from "../make-payment/payment.service";
import { PaymentProcessService } from "@app/auth/onboarding/payment.process.service";

@Component({
  selector: "app-subscription",
  templateUrl: "./subscription.component.html",
  styleUrls: ["./subscription.component.scss"],
})
export class SubscriptionComponent implements OnInit {
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
    private paymentService: PaymentService,
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
          this.router.navigate(["account"]);
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
      this.router.navigate(["account/make-payment/"+subscriptionFormData.plan]);
    } else {
      this.sharedService.showMessage("Please select subscription");
    }
    
  }
}
