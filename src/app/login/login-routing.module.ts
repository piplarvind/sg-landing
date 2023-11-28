import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { extract } from "@app/core";
import { LoginComponent } from "@app/login/login.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { MessageComponent } from "./message/message.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { PublicCmsPageComponent } from "./public-cms-page/public-cms-page.component";

const routes: Routes = [
  {
    path: "login2",
    component: LoginComponent,
    data: { title: extract("Login") },
  },
  {
    path: "message",
    component: MessageComponent,
    data: { title: extract("Meassage") },
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
    data: { title: extract("Reset Passsword") },
  },
  {
    path: "reset-password/:token",
    component: ResetPasswordComponent,
    data: { title: extract("Reset Password") },
  },
  { path: 'cms-page/:slug', component: PublicCmsPageComponent, data: { title: extract('CMS Page') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class LoginRoutingModule {}
