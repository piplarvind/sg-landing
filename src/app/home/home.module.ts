import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { FlexLayoutModule } from "@angular/flex-layout";

import { NgChartsModule } from "ng2-charts";
import { CoreModule } from "@app/core";
import { SharedModule } from "@app/shared";
import { MaterialModule } from "@app/material.module";
import { HomeRoutingModule } from "@app/home/home-routing.module";
import { HomeComponent } from "@app/home/home.component";
import { HomeService } from "@app/home/home.service";

@NgModule({
  imports: [
    CommonModule,
    NgChartsModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    HomeRoutingModule,
  ],
  declarations: [HomeComponent],
  providers: [HomeService],
})
export class HomeModule {}
