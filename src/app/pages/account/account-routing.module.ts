import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { DashboardComponent } from '@app/pages/account/dashboard/dashboard.component';
import { MyAthletesComponent } from './my-athletes/my-athletes.component';
import { MyParentsComponent } from './my-parents/my-parents.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SubscriptionService } from './subscription/subscription.service';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { PaymentHistoriesComponent } from './payment-histories/payment-histories.component';

const routes: Routes = [
 
  { path: '', component: DashboardComponent, data: { title: extract('Dashboard') } },
  { path: 'my-athletes', component: MyAthletesComponent, data: { title: extract('My Athletes') } },
  { path: 'my-parents', component: MyParentsComponent, data: { title: extract('My Parents') } },
  { path: 'payment-histories', component: PaymentHistoriesComponent, data: { title: extract('Payment Histories') } },
  { path: 'subscriptions', component: SubscriptionComponent, data: { title: extract('Subscriptions') } },
  { path: 'make-payment', component: MakePaymentComponent, data: { title: extract('Make Payment') } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SubscriptionService]
})
export class AccountRoutingModule {}
