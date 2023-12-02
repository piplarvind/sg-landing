import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { AccountRoutingModule } from '@app/pages/account/account-routing.module';

// components
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyAthletesComponent } from './my-athletes/my-athletes.component';
import { MyParentsComponent } from './my-parents/my-parents.component';

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
    MyAthletesComponent,
    MyParentsComponent
  ]
})
export class AccountModule {}
