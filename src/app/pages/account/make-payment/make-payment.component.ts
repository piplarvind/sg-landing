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
    public sharedService: SharedService
  ) {}

  ngOnInit() {
    this.requstData.profile_id = localStorage.getItem("user_id");
    this.requstData.profile_type = localStorage.getItem("role_id");
  }

  testBeta(subscription: any) {}

  onSubmit() {
    if (this.paymentProcessService.paymentForm.valid) {
      const paymentFormData =
        this.paymentProcessService.paymentForm.value;
      console.log("paymentFormData", paymentFormData);
      
    } else {
      this.sharedService.showMessage("Please fill all required fields");
    }
    console.log("onSubmit");
  }
}
