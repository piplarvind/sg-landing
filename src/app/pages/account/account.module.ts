import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { AccountRoutingModule } from '@app/pages/account/account-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    AccountRoutingModule
  ],
  declarations: [
    DashboardComponent,
    SubscriptionComponent,
    MakePaymentComponent
  ]
})
export class AccountModule {}
