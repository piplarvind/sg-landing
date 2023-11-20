import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { extract } from "@app/core";
import { LoginComponent } from "@app/auth/login/login.component";
import { StepOneComponent } from "@app/auth/onboarding/step-one/step-one.component";

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
