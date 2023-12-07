import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "@app/shared";
import { MaterialModule } from "@app/material.module";
import { OnboardingRoutingModule } from "@app/auth/onboarding/onboarding-routing.module";

// components
import { Step1Component } from "@app/auth/onboarding/step1/step1.component";
import { Step2Component } from "@app/auth/onboarding/step2/step2.component";
import { Step3Component } from "@app/auth/onboarding/step3/step3.component";
import { Step4Component } from "./step4/step4.component";
import { Step5Component } from "./step5/step5.component";
import { ClubNotHereComponent } from "./club-not-here/club-not-here.component";
import { SuccessReponseScreenComponent } from "./success-reponse-screen/success-reponse-screen.component";
import { UniversityDetailComponent } from "./university-detail/university-detail.component";
import { OTPComponent } from "./otp/otp.component";
import { SelectSubscriptionComponent } from "./select-subscription/select-subscription.component";
import { DoPaymentComponent } from "./do-payment/do-payment.component";
import { SelectAthletesComponent } from "./select-athletes/select-athletes.component";
import { SelectAthleteCoachComponent } from "./select-athlete-coach/select-athlete-coach.component";

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
    Step5Component,
    SelectSubscriptionComponent,
    DoPaymentComponent,
    ClubNotHereComponent,
    UniversityDetailComponent,
    OTPComponent,
    SuccessReponseScreenComponent,
    SelectAthletesComponent,
    SelectAthleteCoachComponent
  ],
})
export class OnboardingModule {}
