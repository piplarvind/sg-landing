import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TranslateModule } from "@ngx-translate/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { VgCoreModule } from "@videogular/ngx-videogular/core";
import { VgControlsModule } from "@videogular/ngx-videogular/controls";
import { VgOverlayPlayModule } from "@videogular/ngx-videogular/overlay-play";
import { VgBufferingModule } from "@videogular/ngx-videogular/buffering";
import { MaterialModule } from "@app/material.module";
import { NgwWowModule } from "ngx-wow";
import { CoreModule } from "@app/core";
import { CarouselModule } from "ngx-owl-carousel-o";
import { SharedModule } from "@app/shared";
import { AuthModule } from "@app/auth/auth.module";

import { AppComponent } from "@app/app.component";
import { AppRoutingModule } from "@app/app-routing.module";
import { MessagingService } from "../messaging.service";
import { JwtInterceptor } from "./core/http/jwt.interceptor";
import { ThemeService } from "theme.service";
import { LayoutModule } from "@app/layout/layout.module";
// import { AuthLayoutModule } from "@app/authlayout/authlayout.module";
import { DashlayoutModule } from "@app/dashlayout/dashlayout.module";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    CarouselModule,
    BrowserAnimationsModule,
    MaterialModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,

    //
    CoreModule,
    SharedModule,
    AuthModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgwWowModule,
    LayoutModule,
    DashlayoutModule,
  ],
  declarations: [AppComponent],
  providers: [
    ThemeService,
    MessagingService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    //{ provide: LocationStrategy, useClass: HashLocationStrategy },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
