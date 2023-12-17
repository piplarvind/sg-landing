import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthenticationGuard, extract } from "@app/core";
import { DashboardComponent } from "@app/pages/account/dashboard/dashboard.component";
import { MyAthletesComponent } from "./my-athletes/my-athletes.component";
import { MyParentsComponent } from "./my-parents/my-parents.component";
import { SubscriptionComponent } from "./subscription/subscription.component";
import { SubscriptionService } from "./subscription/subscription.service";
import { MakePaymentComponent } from "./make-payment/make-payment.component";
import { PaymentHistoriesComponent } from "./payment-histories/payment-histories.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { FFFComponent } from "./my-fff/my-fff.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { AuthGuard } from "@app/core/authentication/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { title: extract("Dashboard") },
  },
  {
    path: "my-athletes",
    component: MyAthletesComponent,
    canActivate: [AuthGuard],
    data: { title: extract("My Athletes") },
  },
  {
    path: "my-parents",
    component: MyParentsComponent,
    canActivate: [AuthGuard],
    data: { title: extract("My Parents") },
  },
  {
    path: "my-fff",
    component: FFFComponent,
    canActivate: [AuthGuard],
    data: { title: extract("My Friends Family & Fans") },
  },
  {
    path: "payments",
    component: PaymentHistoriesComponent,
    canActivate: [AuthGuard],
    data: { title: extract("Payments") },
  },
  {
    path: "subscriptions",
    component: SubscriptionComponent,
    canActivate: [AuthGuard],
    data: { title: extract("Subscriptions") },
  },
  {
    path: "make-payment/:plan",
    component: MakePaymentComponent,
    canActivate: [AuthGuard],
    data: { title: extract("Make Payment") },
  },
  {
    path: "profile",
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    data: { title: extract("Profile") },
  },
  {
    path: "change-password",
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
    data: { title: extract("Change Password") },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SubscriptionService, AuthenticationGuard],
})
export class AccountRoutingModule {}
