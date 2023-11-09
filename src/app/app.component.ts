import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { merge } from "rxjs";
import { filter, map, mergeMap } from "rxjs/operators";

import { NgwWowService } from "ngx-wow";

import { environment } from "@env/environment";
import { Logger, I18nService } from "@app/core";
import { MessagingService } from "../messaging.service";
import { ThemeService } from "theme.service";

const log = new Logger("App");

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  message;
  constructor(
    private router: Router,
    protected themeService: ThemeService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private msgService: MessagingService,
    private translateService: TranslateService,
    private i18nService: I18nService,
    private wowService: NgwWowService
  ) {
    const body = document.getElementsByTagName("body")[0];
    if (themeService.isDarkTheme) {
      body.classList.add("dark");
    }

    if (body.classList.contains("dark")) {
      body.classList.remove("dark");
    } else {
      body.classList.add("light");
    }
    this.wowService.init();
  }

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;

    // Setup translations
    this.i18nService.init(
      environment.defaultLanguage,
      environment.supportedLanguages
    );

    const onNavigationEnd = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    );

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === "primary"),
        mergeMap((route) => route.data)
      )
      .subscribe((event) => {
        const title = event["title"];
        if (title) {
          this.titleService.setTitle(this.translateService.instant(title));
        }
      });
  }
}
