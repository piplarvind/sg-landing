import { Title } from "@angular/platform-browser";
import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSidenav } from "@angular/material/sidenav";

import { AuthenticationService } from "@app/core/authentication/authentication.service";
import { I18nService } from "@app/core/i18n.service";
import { SharedService } from "@app/shared/shared.service";

import { environment } from "../../../../environments/environment";
import { ThemeService } from "theme.service";

let ref = null;

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  user_role: any;
  storedVal: any;
  apiUrl: string;
  id: any;
  @Input()
  sidenav: MatSidenav;
  coachClubId: any;
  quote: string;
  clubLogo = "./assets/ClubV_logo.png";
  sportLogo = "./assets/ClubV_logo.png";
  isLoading: boolean;
  isSuperAdmin = false;
  sportsList: Array<any>;
  clubsList: Array<any>;
  seasonsList: Array<any>;
  genderList: Array<any>;
  selectedClub = "";
  selectedSport = "";
  selectedSeason = "";
  selectedGender = "";
  // selectedClub = localStorage.super_cur_clubName ? localStorage.super_cur_clubName : '';

  constructor(
    private router: Router,
    public themeService: ThemeService,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private i18nService: I18nService,
    private sharedService: SharedService,
  ) {
    // ref = this;
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    //   this.getClubLogo();
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get username(): string {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.username : null;
  }

  get title(): string {
    return this.titleService.getTitle();
  }

  showDropdown() {
    const dom: any = document.querySelector(".dropdown");
    const status: any = dom.style.display;
    if (status === "block") {
      dom.style.display = "none";
    } else {
      dom.style.display = "block";
    }
  }

  getClubLogo() {
    if (localStorage.user_role === "SAD" || localStorage.user_role === "PLA") {
      return (this.clubLogo =
        localStorage.getItem("super_cur_clubLogo") || "assets/no_logo.png");
    } else {
      return (this.clubLogo = "assets/no_logo.png");
    }
  }

  getSportLogo() {
    if (localStorage.user_role === "SAD" || localStorage.user_role === "PLA") {
      return (this.sportLogo =
        localStorage.getItem("super_cur_sportLogo") || "assets/no_logo.png");
    } else {
      return (this.sportLogo = "assets/no_logo.png");
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    const body = document.getElementsByTagName("body")[0];
    if (body.classList.contains("dark")) {
      body.classList.remove("dark");
    } else {
      body.classList.add("dark");
    }
    /* this.sharedService
      .showDialog("Are you sure you want to switch the theme?")
      .subscribe((response) => {
        if (response !== "") {
          this.themeService.toggleTheme();
          const body = document.getElementsByTagName("body")[0];
          if (body.classList.contains("dark")) {
            body.classList.remove("dark");
          } else {
            body.classList.add("dark");
          }
        }
      }); */
  }
}

export function headerCompRef() {
  return ref;
}
