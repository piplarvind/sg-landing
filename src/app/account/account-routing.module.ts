import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { DashboardComponent } from '@app/account/dashboard/dashboard.component';

const routes: Routes = [
 
  { path: 'account', component: DashboardComponent, data: { title: extract('Dashboard') } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AccountRoutingModule {}
