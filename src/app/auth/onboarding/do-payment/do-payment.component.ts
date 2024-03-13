import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { PaymentService } from "@app/pages/account/make-payment/payment.service";
import { SharedService } from "@app/shared/shared.service";

@Component({
  selector: "app-do-payment",
  templateUrl: "./do-payment.component.html",
  styleUrls: ["./do-payment.component.scss"],
})
export class DoPaymentComponent implements OnInit {
  paymentForm: FormGroup;
  subscriptionList: any;
  package_amount = 39.99;
  activeRouteSubscriber: any;
  planId: any;
  plan: any;
  requestData: {
    profile_id: any;
    profile_type: any;
  } = { profile_id: null, profile_type: null };

  months = [
    { value: "01", viewValue: "January" },
    { value: "02", viewValue: "February" },
    { value: "03", viewValue: "March" },
    { value: "04", viewValue: "April" },
    { value: "05", viewValue: "May" },
    { value: "06", viewValue: "June" },
    { value: "07", viewValue: "July" },
    { value: "08", viewValue: "August" },
    { value: "09", viewValue: "September" },
    { value: "10", viewValue: "October" },
    { value: "11", viewValue: "November" },
    { value: "12", viewValue: "December" },
  ];

  currentYear = new Date().getFullYear();
  year = this.currentYear + 1;
  years = Array.from({ length: 10 }, (_, index) => this.currentYear + index);

  constructor(
    private router: Router,
    public _DomSanitizationService: DomSanitizer,
    private formBuilder: FormBuilder,
    public sharedService: SharedService,
    private paymentService: PaymentService,
    public activatedRoute: ActivatedRoute
  ) {
    this.paymentForm = this.formBuilder.group({
      promoCode: [""],
      payer: [""],
      behalf: [""],
      planId: [""],
      sportId: [""],
      clubId: [""],
      transaction_for: [""],
      is_event_transaction: [""],
      is_web_trans: [true],
      ccnum: ["", Validators.required],
      exp_month: ["", Validators.required],
      exp_year: ["", Validators.required],
      ccexp: [""],
      cvv: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.requestData.profile_id = localStorage.getItem("user_id");
    this.requestData.profile_type = localStorage.getItem("selectedRoleValue");
    this.activeRouteSubscriber = this.activatedRoute.params.subscribe(
      (params) => {
        this.planId = params["plan"];
      }
    );

    this.getOnePlan(this.planId);
  }

  getOnePlan(pnaId: any) {
    this.sharedService.showLoader = true;
    this.paymentService
      .getOnePlanData(pnaId)
      .then((res: any) => {
        this.plan = res.data;
        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {});
  }

  applyPromoCode() {
    const promoCode = this.paymentForm.get("promoCode").value;
    this.paymentService
      .applyCoupon({ promoCode: promoCode, planId: this.planId })
      .then((res: any) => {
        const resData = res.data;
        this.sharedService.showMessage(res?.message);
        this.plan.package_amount = resData?.finalAmount;
        this.package_amount = resData?.finalAmount;
        if (this.package_amount === 0) {
          // Clear validators if package amount is zero
          this.paymentForm.get("ccnum").clearValidators();
          this.paymentForm.get("exp_month").clearValidators();
          this.paymentForm.get("exp_year").clearValidators();
          this.paymentForm.get("cvv").clearValidators();
        } else {
          // Set validators if package amount is not zero
          this.paymentForm.get("ccnum").setValidators(Validators.required);
          this.paymentForm.get("exp_month").setValidators(Validators.required);
          this.paymentForm.get("exp_year").setValidators(Validators.required);
          this.paymentForm.get("cvv").setValidators(Validators.required);
        }
        // Update form controls validity
        this.paymentForm.get("ccnum").updateValueAndValidity();
        this.paymentForm.get("exp_month").updateValueAndValidity();
        this.paymentForm.get("exp_year").updateValueAndValidity();
        this.paymentForm.get("cvv").updateValueAndValidity();
      })
      .catch((error) => {
        this.sharedService.showMessage(error?.error.message);
        if (error?.error?.data?.finalAmount) {
          this.plan.package_amount = error?.error?.data?.finalAmount;
          this.package_amount = error?.error?.data?.finalAmount;
          if (this.package_amount === 0) {
            // Clear validators if package amount is zero
            this.paymentForm.get("ccnum").clearValidators();
            this.paymentForm.get("exp_month").clearValidators();
            this.paymentForm.get("exp_year").clearValidators();
            this.paymentForm.get("cvv").clearValidators();
          } else {
            // Set validators if package amount is not zero
            this.paymentForm.get("ccnum").setValidators(Validators.required);
            this.paymentForm
              .get("exp_month")
              .setValidators(Validators.required);
            this.paymentForm.get("exp_year").setValidators(Validators.required);
            this.paymentForm.get("cvv").setValidators(Validators.required);
          }
          // Update form controls validity
          this.paymentForm.get("ccnum").updateValueAndValidity();
          this.paymentForm.get("exp_month").updateValueAndValidity();
          this.paymentForm.get("exp_year").updateValueAndValidity();
          this.paymentForm.get("cvv").updateValueAndValidity();
        }
      });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const paymentFormData = this.paymentForm.value;
      paymentFormData.planId = localStorage.getItem("selectedPlan");
      paymentFormData.payer = localStorage.getItem("userId");
      paymentFormData.clubId = localStorage.getItem("clubId");
      paymentFormData.sportId = localStorage.getItem("sportId");
      paymentFormData.is_event_transaction = false;
      paymentFormData.transaction_for = "subscription";
      paymentFormData.ccexp =
        paymentFormData.exp_month + paymentFormData.exp_year;

      this.paymentService
        .makeAGuestPayment(paymentFormData)
        .then((res: any) => {
          const resData = res.data;
          this.sharedService.showMessage(res?.message);
          this.router.navigate(["/auth/onboarding/payment-success"]);
        })
        .catch((error) => {
          this.sharedService.showMessage(error?.error.message);
        });
    } else {
      this.sharedService.showMessage("Please fill all required fields");
    }
  }
}

/*
import { Component, OnInit } from "@angular/core";

import { OnboardingProcessService } from "../onboarding.process.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SharedService } from "@app/shared/shared.service";
import { DomSanitizer } from "@angular/platform-browser";
import { SubscriptionService } from "@app/pages/account/subscription/subscription.service";
import { PaymentProcessService } from "../payment.process.service";
import { PaymentService } from "@app/pages/account/make-payment/payment.service";
@Component({
  selector: "app-do-payment",
  templateUrl: "./do-payment.component.html",
  styleUrls: ["./do-payment.component.scss"],
})
export class DoPaymentComponent {
  paymentForm = this.paymentProcessService.paymentForm;
  subscriptionList: any;
  package_amount = 49.99;
  activeRouteSubscriber: any;
  planId: any;
  plan: any;
  requstData: {
    profile_id: any;
    profile_type: any;
  } = { profile_id: null, profile_type: null };

  months = [
    { value: "01", viewValue: "January" },
    { value: "02", viewValue: "February" },
    { value: "03", viewValue: "March" },
    { value: "04", viewValue: "April" },
    { value: "05", viewValue: "May" },
    { value: "06", viewValue: "June" },
    { value: "07", viewValue: "July" },
    { value: "08", viewValue: "August" },
    { value: "09", viewValue: "September" },
    { value: "10", viewValue: "October" },
    { value: "11", viewValue: "November" },
    { value: "12", viewValue: "December" },
  ];

  currentYear = new Date().getFullYear();
  year = this.currentYear + 1;
  years = Array.from({ length: 10 }, (_, index) => this.currentYear + index);

  constructor(
    private router: Router,
    public _DomSanitizationService: DomSanitizer,
    private paymentProcessService: PaymentProcessService,
    public sharedService: SharedService,
    private paymentService: PaymentService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.requstData.profile_id = localStorage.getItem("userId");
    this.requstData.profile_type = localStorage.getItem("selectedRoleValue");
    this.activatedRoute.params.subscribe((params) => {
      this.planId = params["plan"];
    });

    this.getOnePlan(this.planId);
  }

  getOnePlan(pnaId: any) {
    this.sharedService.showLoader = true;
    this.paymentService
      .getOnePlanData(pnaId)
      .then((res: any) => {
        this.plan = res.data;
        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {});
  }

  applyPromoCode() {
    const paymentFormData = this.paymentProcessService.paymentForm.value;
    const promoCode = paymentFormData.promoCode;
    this.paymentService
      .applyCoupon({ promoCode: promoCode, planId: this.planId })
      .then((res: any) => {
        const resData = res.data;
        this.sharedService.showMessage(res?.message);
        this.plan.package_amount = resData?.finalAmount;
      })
      .catch((error) => {
        this.sharedService.showMessage(error?.error.message);
        if (error?.error?.data?.finalAmount) {
          this.plan.package_amount = error?.error?.data?.finalAmount;
        }
      });
  }

  onSubmit() {
    if (this.paymentProcessService.paymentForm.valid) {
      const paymentFormData = this.paymentProcessService.paymentForm.value;
      paymentFormData.planId = localStorage.getItem("selectedPlan");
      paymentFormData.payer = localStorage.getItem("userId");
      paymentFormData.clubId = localStorage.getItem("clubId");
      paymentFormData.sportId = localStorage.getItem("sportId");
      paymentFormData.is_event_transaction = false;
      paymentFormData.transaction_for = "subscription";
      paymentFormData.ccexp =
        paymentFormData.exp_month + paymentFormData.exp_year;
      //console.log("paymentFormData", paymentFormData);
      this.paymentService
        .makeAUestPayment(paymentFormData)
        .then((res: any) => {
          const resData = res.data;
          this.sharedService.showMessage(res?.message);
          //this.router.navigate(["account"]);
          this.router.navigate(["/auth/onboarding/payment-success"]);
        })
        .catch((error) => {
          this.sharedService.showMessage(error?.error.message);
        });
    } else {
      this.sharedService.showMessage("Please fill all required fields");
    }
  }
}
*/
