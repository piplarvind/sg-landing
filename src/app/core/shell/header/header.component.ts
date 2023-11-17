import { Title } from "@angular/platform-browser";
import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSidenav } from "@angular/material/sidenav";

import { AuthenticationService } from "@app/core/authentication/authentication.service";
import { I18nService } from "@app/core/i18n.service";
import { SportsService } from "@app/sports/sports.service";
import { ClubsService } from "@app/clubs/clubs.service";
import { SharedService } from "@app/shared/shared.service";

import { environment } from "../../../../environments/environment";
import { GenderService } from "@app/gender/gender.service";
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
    private sportService: SportsService,
    private clubService: ClubsService,
    private sharedService: SharedService,
    private genderService: GenderService
  ) {
    // ref = this;
  }

  ngOnInit() {
    const obj = JSON.parse(localStorage.userDetails);
    this.id = obj._id;
    ref = this;
    
    this.apiUrl = environment.imageUrl;
    if (localStorage.sport_id !== undefined && localStorage.sport_id !== "") {
      this.selectedSport = localStorage.super_cur_sportId || "";
      this.sportLogo =
        this.apiUrl + localStorage.getItem("super_cur_sportLogo") ||
        this.apiUrl + localStorage.getItem("updatedLogo") ||
        this.apiUrl + "assets/no_logo.png";
    }

    if (obj?.club) {
      // this.clubSelected(obj?.club);
      if (
        localStorage.user_role === "COA" ||
        localStorage.user_role === "CAD"
      ) {
        this.sportSelected(obj?.sport);
      }
    }

    // Club data
    if (localStorage.club_id !== undefined && localStorage.club_id !== "") {
      this.selectedClub = localStorage.super_cur_clubId || "";
      this.getAllCLubs();
      this.getAllSeasons();
      this.clubLogo =
        localStorage.getItem("super_cur_clubLogo") ||
        localStorage.getItem("updatedLogo") ||
        "assets/no_logo.png";
      this.clubLogo =
        this.clubLogo === "assets/no_logo.png"
          ? this.clubLogo
          : `${environment.imageUrl}${this.clubLogo}`;
    }
    // Season data
    this.selectedSeason = localStorage.super_cur_seasonId || "";

    this.user_role = localStorage.user_role;
    this.storedVal = localStorage;

    this.sharedService.clubStatus.subscribe((res: any) => {
      this.getAllSports();
      //this.getAllCLubs();
      //this.getAllSeasons();
    });

    if (localStorage.user_role === "SAD" || localStorage.user_role === "PLA") {
      this.isSuperAdmin = true;
      this.getAllSports();
      //this.getAllCLubs();
      //this.getAllSeasons();
    }

    if (localStorage.user_role === "CAD") {
      const obj = JSON.parse(localStorage.userDetails);
      this.storedVal.super_cur_clubName = obj.club.club_name;
    }

    if (localStorage.user_role === "COA" || localStorage.user_role === "CAD") {
      // console.log({...localStorage});
      // Sports
      this.getAllSports();

      // Club
      //this.getAllCLubs();
      this.storedVal.super_cur_clubName = obj.club.club_name;
      const clubId = obj.club._id;
      this.clubService
        .getClubList(this.selectedSport)
        .then((e: any) => {
          if (
            localStorage.user_role === "COA" ||
            localStorage.user_role === "CAD"
          ) {
            const clubDetails = e.data.find((club) => club._id === clubId);
            if (clubDetails) {
              this.clubLogo = `${environment.imageUrl}${clubDetails.logo}`;
            }
          }
        })
        .catch((err) => {});
    }
    if (localStorage.user_role === "SAD" || localStorage.user_role === "PLA") {
      // age categories
      this.genderService
        .getGenderList(0, 10)
        .then((e: any) => {
          this.genderList = e.data;
        })
        .catch((err) => {});
    }
  }

  ngOnInitOld() {
    const obj = JSON.parse(localStorage.userDetails);
    this.id = obj._id;
    ref = this;

    //Sport data
    this.selectedSport = localStorage.super_cur_sportId
      ? localStorage.super_cur_sportId
      : "";
    this.sportLogo =
      localStorage.getItem("super_cur_sportLogo") || "assets/no_logo.png";

    if (this.sportLogo === "assets/no_logo.png") {
      this.sportLogo = `${this.sportLogo}`;
    } else {
      this.sportLogo = `${environment.imageUrl}${this.sportLogo}`;
    }

    //Club data
    this.selectedClub = localStorage.super_cur_clubId
      ? localStorage.super_cur_clubId
      : "";
    this.clubLogo =
      localStorage.getItem("super_cur_clubLogo") ||
      localStorage.getItem("updatedLogo") ||
      "assets/no_logo.png";

    if (this.clubLogo === "assets/no_logo.png") {
      this.clubLogo = `${this.clubLogo}`;
    } else {
      this.clubLogo = `${environment.imageUrl}${this.clubLogo}`;
    }

    //Season data
    this.selectedSeason = localStorage.super_cur_seasonId
      ? localStorage.super_cur_seasonId
      : "";

    this.user_role = localStorage.user_role;
    this.storedVal = localStorage;

    this.sharedService.clubStatus.subscribe((res: any) => {
      this.getAllSports();
      this.getAllSeasons();
      this.getAllCLubs();
    });

    if (localStorage.user_role === "SAD" || localStorage.user_role === "PLA") {
      this.isSuperAdmin = true;
      this.getAllSports();
      this.getAllSeasons();
      this.getAllCLubs();
    }

    if (localStorage.user_role === "COA" || localStorage.user_role === "CAD") {
      // sports
      this.getAllSports();
      if (obj.club) {
        this.sportSelected(obj.club.sport);
      }
      //this.storedVal.super_cur_sportName = obj.sport.sport_name;
      this.sportService
        .getSportList()
        .then((e: any) => {
          if (
            localStorage.user_role === "COA" ||
            localStorage.user_role === "CAD"
          ) {
            const sportDetails = e.data.filter(
              (sport) => sport._id === obj.club.sport
            );
            this.sportLogo = `${environment.imageUrl}${sportDetails[0].logo}`;
          }
        })
        .catch((err) => {});

      // club
      this.getAllCLubs();
      this.storedVal.super_cur_clubName = obj.club.club_name;
      const clubId = obj.club._id;
      this.clubService
        .getClubList(this.selectedSport)
        .then((e: any) => {
          if (
            localStorage.user_role === "COA" ||
            localStorage.user_role === "CAD"
          ) {
            const clubDetails = e.data.filter((club) => club._id === clubId);

            this.clubLogo = `${environment.imageUrl}${clubDetails[0].logo}`;
          }
        })
        .catch((err) => {});
    }
    //console.log('header sportLogo', this.sportLogo);
    // this.getSportList();
    //this.getClubList();
  }

  ngAfterViewInit() {
    //   this.getClubLogo();
  }

  selectClub() {}

  getSportList() {
    this.sportService
      .getActiveSportList()
      .then((e: any) => {
        this.sportsList = e.data;
      })
      .catch((err) => {});
  }

  getClubList() {
    if (typeof this.selectedSport !== "undefined") {
      this.clubService
        .getClubList(this.selectedSport)
        .then((e: any) => {
          this.clubsList = e.data;
        })
        .catch((err) => {});
    }
  }

  getAllSports() {
    this.sportService
      .getSportList()
      .then((e: any) => {
        this.sportsList = e.data;
      })
      .catch((err) => {});
  }

  getAllCLubs() {
    this.clubService
      .getClubList(this.selectedSport)
      .then((e: any) => {
        this.clubsList = e.data;
      })
      .catch((err) => {});
  }

  getAllSeasons() {
    if (this.selectedSport !== undefined) {
      this.sportService
        .getSportSeasonList(this.selectedSport)
        .then((e: any) => {
          this.seasonsList = e.data;
        })
        .catch((err) => {});
    }
  }

  clubSelected(club: any) {
    localStorage.club_id = club?._id;
    localStorage.super_cur_clubId = club?._id;
    localStorage.super_cur_club = club.db_name;
    localStorage.super_cur_clubName = club.club_name;
    localStorage.super_cur_clubLogo = club.logo;
    if (club.logo !== "") {
      this.clubLogo = `${environment.imageUrl}${club.logo}`;
    } else {
      this.clubLogo = "assets/no_logo.png";
    }
  }

  sportSelected(sport: any) {
    this.selectedSport = sport?._id;
    localStorage.sport_id = sport?._id;
    localStorage.super_cur_sportId = sport?._id;
    localStorage.super_cur_sport = sport?.db_name;
    localStorage.super_cur_sportName = sport?.sport_name;
    localStorage.super_cur_sportLogo = sport?.logo;
    if (sport?.logo !== "") {
      this.sportLogo = `${environment.imageUrl}${sport?.logo}`;
    } else {
      this.sportLogo = "assets/no_logo.png";
    }
  }

  seasonSelected(season: any) {
    localStorage.super_cur_seasonId = season?._id;
    localStorage.super_cur_season = season?.db_name;
    localStorage.super_cur_seasonName = season?.season_name;
    localStorage.super_cur_seasonPreStartDate = season?.pre_start_date;
    localStorage.super_cur_seasonStartDate = season?.start_date;
    localStorage.super_cur_seasonEndDate = season?.end_date;
  }

  public changeLogo(logo: string, club_id) {
    if (club_id === localStorage.super_cur_clubId) {
      this.clubLogo = `${environment.imageUrl}${logo}`;
    }
  }

  dropdownSportChange(sportId: any) {
    this.clubsList = [];
    this.selectedClub = "";
    localStorage.club_id = undefined;
    let id = sportId !== undefined ? sportId : "";
    //console.log("dropdownSportChange", id);
    if (id !== "") {
      localStorage.setItem("sport_id", id);
      localStorage.setItem("curentSelectedSport", id);
      const sportData = this.sportsList.filter((f) => f._id === id)[0];

      /* switch (this.router.url) {
      case "/clubs/add":
      case "/clubs/edit":
      case "/users/add":
      case "/users/edit":
      case "/teams/add":
      case "/teams/edit":
      case "/coach/add":
      case "/coach/edit":
      case "/athletes/add":
      case "/athletes/edit":
      case "/resources/add":
      case "/resources/edit":
      case "/training/add":
      case "/training/edit":
        this.sharedService
          .showDialog({ name: "Please set required info" })
          .subscribe((response: any) => {
            if (response) {
              this.router.navigate(["/sports"]);
            }
          });
        break;
      default:
        this.router.navigate(["/sports"]);
    } */

      this.selectedSport = id;
      localStorage.setItem("sport_id", sportData?._id);
      localStorage.setItem("curentSelectedSport", sportData?._id);
      localStorage.setItem("super_cur_sportId", sportData?._id);
      localStorage.setItem("super_cur_sport", sportData?.db_name);
      localStorage.setItem("super_cur_sportName", sportData?.sport_name);
      // localStorage.setItem("super_cur_sportLogo", sportData?.logo);
      this.sportLogo = `${environment.imageUrl}${sportData?.logo}`;
      localStorage.setItem("super_cur_sportLogo", this.sportLogo);

      //Rest the club data
      localStorage.setItem("curentSelectedClub", "");
      localStorage.setItem("super_cur_clubId", "");
      localStorage.setItem("super_cur_club", "");
      localStorage.setItem("super_cur_clubName", "");
      localStorage.setItem("super_cur_clubLogo", "");

      this.clubLogo = "assets/no_logo.png";

      this.getSportLogo();

      //Reset season data
      this.selectedSeason = "";
      this.seasonsList = [];
      localStorage.setItem("super_cur_seasonId", "");
      this.seasonSelected("");
      if (sportData?._id !== undefined) {
        this.getClubList();
        this.getAllSeasons();
        this.sharedService.updateSelectedValue(sportData?._id);
      } else {
        this.sharedService.updateSelectedValue("");
      }
    } else {
      
      // localStorage.userDetails.club = null;
      this.selectedSport = "";
      localStorage.setItem("sport_id", "");
      localStorage.setItem("curentSelectedSport", "");
      localStorage.setItem("super_cur_sportId", "");
      localStorage.setItem("super_cur_sport", "");
      localStorage.setItem("super_cur_sportName", "");
      localStorage.setItem("super_cur_sportLogo", "");
      // this.sportLogo = 'assets/no_logo.png';

      //Rest the club data
      this.selectedClub = "";
      localStorage.setItem("curentSelectedClub", "");
      localStorage.setItem("super_cur_clubId", "");
      localStorage.setItem("super_cur_club", "");
      localStorage.setItem("super_cur_clubName", "");
      localStorage.setItem("super_cur_clubLogo", "");

      // this.clubLogo = "assets/no_logo.png";

      this.getSportLogo();

      //Reset season data
      this.selectedSeason = "";
      this.seasonsList = [];
      localStorage.setItem("super_cur_seasonId", "");
      this.seasonSelected("");
      this.sharedService.updateSelectedValue("");
    }
    this.router.navigate(["/home"]);
  }

  dropdownClubChange(id: any) {
    localStorage.setItem("club_id", id);
    localStorage.setItem("curentSelectedClub", id);
    const clubData = this.clubsList.filter((f) => f._id === id)[0];
    /* switch (this.router.url) {
      case "/clubs/add":
      case "/clubs/edit":
      case "/users/add":
      case "/users/edit":
      case "/teams/add":
      case "/teams/edit":
      case "/coach/add":
      case "/coach/edit":
      case "/athletes/add":
      case "/athletes/edit":
      case "/resources/add":
      case "/resources/edit":
      case "/training/add":
      case "/training/edit":
        this.sharedService
          .showDialog({ name: "Please set required info" })
          .subscribe((response: any) => {
            if (response) {
              this.router.navigate(["/clubs"]);
            }
          });
        break;
      default:
        this.router.navigate(["/clubs"]);
    } */

    this.selectedClub = id;
    localStorage.setItem("super_cur_clubId", clubData?._id);
    localStorage.setItem("super_cur_club", clubData?.db_name);
    localStorage.setItem("super_cur_clubName", clubData?.club_name);
    localStorage.setItem("super_cur_clubLogo", clubData?.logo);
    // this.clubLogo = clubData.logo;
    this.clubLogo = `${environment.imageUrl}${clubData?.logo}`;
    this.getClubLogo();

    if (clubData?._id !== undefined) {
      this.sharedService.updateSelectedValue(clubData?._id);
    } else {
      this.sharedService.updateSelectedValue("");
    }
    this.router.navigate(["/home"]);
  }

  dropdownSeasonChange(id: any) {
    this.selectedSeason = id;
    this.router.navigate(["/home"]);
  }
  changeGender(id: any) {
    this.selectedGender = id;
    this.router.navigate(["/home"]);
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
