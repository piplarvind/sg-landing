import { NgModule, inject } from "@angular/core";
import { Router, Routes, RouterModule } from "@angular/router";

import { extract } from "@app/core";
import { Step1Component } from "./step1/step1.component";
import { Step2Component } from "./step2/step2.component";
import { Step3Component } from "./step3/step3.component";
import { Step4Component } from "./step4/step4.component";
import { Step5Component } from "./step5/step5.component";
import { ClubNotHereComponent } from "./club-not-here/club-not-here.component";
import { SuccessReponseScreenComponent } from "./success-reponse-screen/success-reponse-screen.component";
import { UniversityDetailComponent } from "./university-detail/university-detail.component";
import { OTPComponent } from "./otp/otp.component";
import { SelectSubscriptionComponent } from "./select-subscription/select-subscription.component";
import { SubscriptionService } from "@app/pages/account/subscription/subscription.service";
import { DoPaymentComponent } from "./do-payment/do-payment.component";
import { PaymentService } from "@app/pages/account/make-payment/payment.service";
import { SelectAthletesComponent } from "./select-athletes/select-athletes.component";

const routes: Routes = [
  {
    path: "step1",
    component: Step1Component,
    data: { title: extract("Onboarding Step 1") },
  },
  {
    path: "step2",
    component: Step2Component,
    data: { title: extract("Onboarding Step 2") }
  },
  {
    path: "step3",
    component: Step3Component,
    data: { title: extract("Onboarding Step 3") },
  },
  {
    path: "step4",
    component: Step4Component,
    data: { title: extract("Onboarding Step 4") },
  },
  {
    path: "step5",
    component: Step5Component,
    data: { title: extract("Onboarding Step 5") },
  },
  {
    path: "select-athletes",
    component: SelectAthletesComponent,
    data: { title: extract("Select Athlete") },
  },
  {
    path: "select-subscription",
    component: SelectSubscriptionComponent,
    data: { title: extract("Select Subscription") },
  },
  {
    path: "do-payment/:plan",
    component: DoPaymentComponent,
    data: { title: extract("Make A Payment") },
  },
  {
    path: "club-not-here",
    component: ClubNotHereComponent,
    data: { title: extract("Club Not Here") },
  },
  {
    path: "university-detail",
    component: UniversityDetailComponent,
    data: { title: extract("University Detail") },
  },
  {
    path: "otp",
    component: OTPComponent,
    data: { title: extract("OTP") },
  },
  {
    path: "success-screen",
    component: SuccessReponseScreenComponent,
    data: { title: extract("Onboaring Done") },
  },
  // { path: 'account/onboarding', redirectTo: 'auth/onboarding/step1', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SubscriptionService, PaymentService]
})
export class OnboardingRoutingModule {}
