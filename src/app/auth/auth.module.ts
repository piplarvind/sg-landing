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
import { OnboardingModule } from '@app/auth/onboarding/onboarding.module';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { StepperModule } from '@app/stepper/stepper.module';
import { RegisterComponent } from './register/register.component';
import { LowercaseFirstCharDirective } from '@app/lowercase-first-char.directive';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    AuthRoutingModule,
    OnboardingModule,
    StepperModule
  ],
  declarations: [
    RegisterComponent,
    OnboardingComponent,
    AuthLeftSectionComponent,
    LoginComponent,
    LowercaseFirstCharDirective
  ]
})
export class AuthModule {}
