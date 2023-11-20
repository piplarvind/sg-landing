import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";

import { NgChartsModule } from "ng2-charts";
import { CarouselModule } from "ngx-owl-carousel-o";
import { VgCoreModule } from "@videogular/ngx-videogular/core";
import { VgControlsModule } from "@videogular/ngx-videogular/controls";
import { VgOverlayPlayModule } from "@videogular/ngx-videogular/overlay-play";
import { VgBufferingModule } from "@videogular/ngx-videogular/buffering";

import { SharedModule } from "@app/shared";
import { MaterialModule } from "@app/material.module";
import { HomeRoutingModule } from "@app/pages/home/home-routing.module";
import { HomeComponent } from "@app/pages/home/home.component";
import { HomeService } from "@app/pages/home/home.service";

@NgModule({
  imports: [
    CommonModule,
    NgChartsModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    HomeRoutingModule,
    CarouselModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
  declarations: [HomeComponent],
  providers: [HomeService],
})
export class HomeModule {}
