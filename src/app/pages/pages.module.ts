import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { FlexLayoutModule } from "@angular/flex-layout";

import { NgChartsModule } from "ng2-charts";
import { CarouselModule } from "ngx-owl-carousel-o";
import { VgCoreModule } from "@videogular/ngx-videogular/core";
import { VgControlsModule } from "@videogular/ngx-videogular/controls";
import { VgOverlayPlayModule } from "@videogular/ngx-videogular/overlay-play";
import { VgBufferingModule } from "@videogular/ngx-videogular/buffering";
import { CoreModule } from "@app/core";
import { SharedModule } from "@app/shared";
import { MaterialModule } from "@app/material.module";
import { PagesRoutingModule } from "./pages-routing.module";

@NgModule({
  imports: [
    CommonModule,
    NgChartsModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    PagesRoutingModule,
    CarouselModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
  declarations: [],
  providers: [],
})
export class PagesModule {}
