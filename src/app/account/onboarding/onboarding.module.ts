import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "@app/shared";
import { MaterialModule } from "@app/material.module";
import { OnboardingRoutingModule } from "@app/account/onboarding/onboarding-routing.module";

// components
import { StepOneComponent } from "@app/account/onboarding/step-one/step-one.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    OnboardingRoutingModule,
  ],
  declarations: [StepOneComponent],
})
export class OnboardingModule {}
