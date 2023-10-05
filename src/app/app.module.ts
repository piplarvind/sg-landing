import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
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
import { environment } from "../environments/environment";
import { CoreModule } from "@app/core";
import { CarouselModule } from "ngx-owl-carousel-o";
import { SharedModule } from "@app/shared";
import { HomeModule } from "@app/home/home.module";
import { LoginModule } from "@app/login/login.module";
import { AppComponent } from "@app/app.component";
import { AppRoutingModule } from "@app/app-routing.module";
import { MessagingService } from "../messaging.service";
import { JwtInterceptor } from "./core/http/jwt.interceptor";
import { ThemeService } from "theme.service";

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
    HomeModule,
    LoginModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgwWowModule,
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
