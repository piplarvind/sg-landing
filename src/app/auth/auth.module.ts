import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { AuthRoutingModule } from '@app/auth/auth-routing.module';
import { LoginComponent } from '@app/auth/login/login.component';
import { AuthLeftSectionComponent } from './left-section/left-section.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
// import { PolicyComponent } from './policy/policy.component';
// import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
// import { MessageComponent } from './message/message.component';
// import { PublicCmsPageComponent } from './public-cms-page/public-cms-page.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthLeftSectionComponent,
    LoginComponent,
    // ResetPasswordComponent, 
    // PolicyComponent, 
    // PrivacyPolicyComponent,
    // MessageComponent,
    // PublicCmsPageComponent
  ]
})
export class AuthModule {}
