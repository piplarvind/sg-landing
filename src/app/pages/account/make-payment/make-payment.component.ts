import { Component, OnInit } from "@angular/core";
import { finalize, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { MatTableDataSource } from "@angular/material/table";
import { PaymentService } from "./payment.service";
import { SharedService } from "@app/shared/shared.service";
import { PaymentProcessService } from "@app/auth/onboarding/payment.process.service";

@Component({
  selector: "app-make-payment",
  templateUrl: "./make-payment.component.html",
  styleUrls: ["./make-payment.component.scss"],
})
export class MakePaymentComponent implements OnInit {
  paymentForm = this.paymentProcessService.paymentForm;
  subscriptionList: any;
  package_amount = 49.99;
  requstData: {
    profile_id: any;
    profile_type: any;
  } = { profile_id: null, profile_type: null };

  constructor(
    private router: Router,
    public _DomSanitizationService: DomSanitizer,
    private paymentProcessService: PaymentProcessService,
    public sharedService: SharedService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.requstData.profile_id = localStorage.getItem("user_id");
    this.requstData.profile_type = localStorage.getItem("role_id");
  }

  testBeta(subscription: any) {}

  onSubmit() {
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
      console.log("paymentFormData", paymentFormData);
      this.paymentService
        .makeAPayment(paymentFormData)
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
      this.sharedService.showMessage("Please fill all required fields");
    }
    console.log("onSubmit");
  }
}
