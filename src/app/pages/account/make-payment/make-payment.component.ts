import { Component, OnInit } from "@angular/core";
import { finalize, map } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
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
  activeRouteSubscriber: any;
  planId:any;
  plan:any;
  requstData: {
    profile_id: any;
    profile_type: any;
  } = { profile_id: null, profile_type: null };

  months = [
    { value: '01', viewValue: 'January' },
    { value: '02', viewValue: 'February' },
    { value: '03', viewValue: 'March' },
    { value: '04', viewValue: 'April' },
    { value: '05', viewValue: 'May' },
    { value: '06', viewValue: 'June' },
    { value: '07', viewValue: 'July' },
    { value: '08', viewValue: 'August' },
    { value: '09', viewValue: 'September' },
    { value: '10', viewValue: 'October' },
    { value: '11', viewValue: 'November' },
    { value: '12', viewValue: 'December' },
  ];

  currentYear = new Date().getFullYear();
  year = this.currentYear +1;
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
    this.requstData.profile_id = localStorage.getItem("user_id");
    this.requstData.profile_type = localStorage.getItem("role_id");
    this.activatedRoute.params.subscribe(params => {
      this.planId = params['plan'];
    });
    
    this.getOnePlan(this.planId);
  }

  getOnePlan(pnaId:any){
    this.sharedService.showLoader = true;
    this.paymentService
      .getOnePlanData(pnaId)
      .then((res: any) => {
        this.plan = res.data;  
        this.sharedService.showLoader = false;
      })
      .catch((err: any) => {});
  }

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
      //console.log("paymentFormData", paymentFormData);
      this.paymentService
        .makeAPayment(paymentFormData)
        .then((res: any) => {
          const resData = res.data;
          this.sharedService.showMessage(res?.message);
          this.router.navigate(["account"]);
        })
        .catch((error) => {
          //console.log(error);
          this.sharedService.showMessage(error?.error.message);
        });
    } else {
      this.sharedService.showMessage("Please fill all required fields");
    }
  }
}
