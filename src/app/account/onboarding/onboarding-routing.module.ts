import { NgModule, inject } from "@angular/core";
import { Router, Routes, RouterModule } from "@angular/router";

import { extract } from "@app/core";
import { Step1Component } from "@app/account/onboarding/step1/step1.component";
import { Step2Component } from "./step2/step2.component";
import { OnboardingGuard } from "./onboarding.gaurd";
import { Step3Component } from "./step3/step3.component";
import { Step4Component } from "./step4/step4.component";
import { Step5Component } from "./step5/step5.component";

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
  // { path: 'account/onboarding', redirectTo: 'account/onboarding/step1', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class OnboardingRoutingModule {}
