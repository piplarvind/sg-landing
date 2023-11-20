import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { extract } from "@app/core";
import { StepOneComponent } from "@app/account/onboarding/step-one/step-one.component";

const routes: Routes = [
  {
    path: "step-one",
    component: StepOneComponent,
    data: { title: extract("Onboarding Step 1") },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class OnboardingRoutingModule {}
