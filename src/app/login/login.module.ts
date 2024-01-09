import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "@app/shared";
import { MaterialModule } from "@app/material.module";
import { LoginRoutingModule } from "@app/login/login-routing.module";
import { LoginComponent } from "@app/login/login.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { PolicyComponent } from "./policy/policy.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { MessageComponent } from "./message/message.component";
import { PublicCmsPageComponent } from "./public-cms-page/public-cms-page.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LoginService } from "./login.service";
import { FormsModule } from "@angular/forms";
import { LayoutModule } from "@app/layout/layout.module";
import { LowercaseFirstCharDirectiveTwo } from "@app/lowercase-first-char.directive-two";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    LoginRoutingModule,
    LayoutModule,
  ],
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    PolicyComponent,
    PrivacyPolicyComponent,
    MessageComponent,
    PublicCmsPageComponent,
    LowercaseFirstCharDirectiveTwo
  ],
  providers: [LoginService],
})
export class LoginModule {}
