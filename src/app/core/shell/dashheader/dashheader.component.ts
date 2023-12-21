import { Title } from "@angular/platform-browser";
import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSidenav } from "@angular/material/sidenav";

import { AuthenticationService } from "@app/core/authentication/authentication.service";
import { I18nService } from "@app/core/i18n.service";
// import { SportsService } from "@app/sports/sports.service";
// import { ClubsService } from "@app/clubs/clubs.service";
import { SharedService } from "@app/shared/shared.service";

import { environment } from "../../../../environments/environment";
// import { GenderService } from "@app/gender/gender.service";
import { ThemeService } from "theme.service";

let ref = null;

@Component({
  selector: "app-dashheader",
  templateUrl: "./dashheader.component.html",
  styleUrls: ["./dashheader.component.scss"],
})
export class DashheaderComponent implements OnInit {
  @Output() toggleLeftMenuClick = new EventEmitter<void>();

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
    private sharedService: SharedService
  ) {
    // ref = this;
  }

  ngOnInit() {
    const obj = JSON.parse(localStorage.userDetails);
    this.id = obj._id;
    ref = this;
    
    this.apiUrl = environment.imageUrl;
  }

  toggleLeftMenu() {
    this.toggleLeftMenuClick.emit();
  }

  public changeLogo(logo: string, club_id) {
    if (club_id === localStorage.super_cur_clubId) {
      this.clubLogo = `${environment.imageUrl}${logo}`;
    }
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.sharedService
      .showDialog("Are you sure you want to logout?")
      .subscribe((res: any) => {
        if (res) {
          this.authenticationService.logout().subscribe(() => {
            localStorage.setItem(
              "app_theme",
              this.themeService.isDarkTheme ? "dark" : "light"
            );
            this.router.navigate(["/login"], { replaceUrl: true });
          });
        }
      });
  }
  UpdatePassword() {
    this.router.navigate(["/forgotPassword_Web"], {
      queryParams: { user: this.id },
    });
    // this.router.navigate(['/forgotPassword', { id: this.id }]);
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
