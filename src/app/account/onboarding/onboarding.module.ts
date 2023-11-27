import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "@app/shared";
import { MaterialModule } from "@app/material.module";
import { OnboardingRoutingModule } from "@app/account/onboarding/onboarding-routing.module";

// components
import { Step1Component } from "@app/account/onboarding/step1/step1.component";
import { Step2Component } from "@app/account/onboarding/step2/step2.component";
import { Step3Component } from "@app/account/onboarding/step3/step3.component";
import { Step4Component } from "./step4/step4.component";
import { Step5Component } from "./step5/step5.component";

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
  declarations: [
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component
  ],
})
export class OnboardingModule {}
