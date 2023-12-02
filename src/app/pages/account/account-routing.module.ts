import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { DashboardComponent } from '@app/pages/account/dashboard/dashboard.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SubscriptionService } from './subscription/subscription.service';
import { MakePaymentComponent } from './make-payment/make-payment.component';

const routes: Routes = [
 
  { path: '', component: DashboardComponent, data: { title: extract('Dashboard') } },

  { path: 'subscriptions', component: SubscriptionComponent, data: { title: extract('Subscriptions') } },
  { path: 'make-payment', component: MakePaymentComponent, data: { title: extract('Make Payment') } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SubscriptionService]
})
export class AccountRoutingModule {}
