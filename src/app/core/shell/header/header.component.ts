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
export class HeaderComponent implements OnInit {
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

  ngOnInit() {}
}

export function headerCompRef() {
  return ref;
}
