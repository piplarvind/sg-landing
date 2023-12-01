import { NgModule, inject } from "@angular/core";
import { Router, Routes, RouterModule } from "@angular/router";

import { extract } from "@app/core";
import { Step1Component } from "@app/auth/onboarding/step1/step1.component";
import { Step2Component } from "./step2/step2.component";
import { OnboardingGuard } from "./onboarding.gaurd";
import { Step3Component } from "./step3/step3.component";
import { Step4Component } from "./step4/step4.component";
import { Step5Component } from "./step5/step5.component";
import { ClubNotHereComponent } from "./club-not-here/club-not-here.component";
import { SuccessReponseScreenComponent } from "./success-reponse-screen/success-reponse-screen.component";
import { UniversityDetailComponent } from "./university-detail/university-detail.component";
import { OTPComponent } from "./otp/otp.component";

const routes: Routes = [
  {
    path: "step1",
    component: Step1Component,
    data: { title: extract("Onboarding Step 1") },
    // canDeactivate: [OnboardingGuard],
    // canActivate: [OnboardingGuard],
  },
  {
    path: "step2",
    component: Step2Component,
    data: { title: extract("Onboarding Step 2") },
    // canActivate: [OnboardingGuard],
  },
  {
    path: "step3",
    component: Step3Component,
    data: { title: extract("Onboarding Step 3") },
    // canActivate: [OnboardingGuard],
  },
  {
    path: "step4",
    component: Step4Component,
    data: { title: extract("Onboarding Step 4") },
    // canActivate: [OnboardingGuard],
  },
  {
    path: "step5",
    component: Step5Component,
    data: { title: extract("Onboarding Step 5") },
    // canActivate: [OnboardingGuard],
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
    data: { title: extract("Club Not Here") },
  },
  // { path: 'account/onboarding', redirectTo: 'auth/onboarding/step1', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class OnboardingRoutingModule {}
