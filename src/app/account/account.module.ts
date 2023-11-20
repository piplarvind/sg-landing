import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { AccountRoutingModule } from '@app/account/account-routing.module';
import { LoginComponent } from '@app/account/login/login.component';
import { AuthLeftSectionComponent } from './left-section/left-section.component';
import { OnboardingModule } from '@app/account/onboarding/onboarding.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    AccountRoutingModule,
    OnboardingModule
  ],
  declarations: [
    AuthLeftSectionComponent,
    LoginComponent
  ]
})
export class AccountModule {}
