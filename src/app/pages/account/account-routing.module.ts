import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { DashboardComponent } from '@app/pages/account/dashboard/dashboard.component';
import { MyAthletesComponent } from './my-athletes/my-athletes.component';
import { MyParentsComponent } from './my-parents/my-parents.component';

const routes: Routes = [
 
  { path: '', component: DashboardComponent, data: { title: extract('Dashboard') } },
  { path: 'my-athletes', component: MyAthletesComponent, data: { title: extract('My Athletes') } },
  { path: 'my-parents', component: MyParentsComponent, data: { title: extract('My Parents') } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AccountRoutingModule {}
