import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { extract } from "@app/core";
import { LoginComponent } from "@app/auth/login/login.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    data: { title: extract("Login") },
  },
  {
    path: "onboarding",
    loadChildren: () =>
      import("app/auth/onboarding/onboarding.module").then(
        (m) => m.OnboardingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AuthRoutingModule {}
