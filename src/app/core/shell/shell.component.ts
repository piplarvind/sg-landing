import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
// import { MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatExpansionPanel } from "@angular/material/expansion";
import { MatSidenav } from "@angular/material/sidenav";
import { filter } from "rxjs/operators";
import { SharedService } from "../../shared/shared.service";
import { environment } from "../../../environments/environment";
import { AuthenticationService } from "../authentication/authentication.service";
import { ThemeService } from "theme.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-shell",
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.scss"],
})
export class ShellComponent implements OnInit {
  @ViewChild("sidenav") sidenav: MatSidenav;
  // new implementations
  @ViewChildren(MatExpansionPanel)
  expansionPanels: QueryList<MatExpansionPanel>;
  // panelOpenState = false;
  userDetails:any;
  user_role: any;
  clubId: any;
  ClubSelected: any;
  message;
  panelOpenState: Boolean = false;
  sportLogo = "./assets/ClubV_logo.png";

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private authenticationService: AuthenticationService,
    public themeService: ThemeService
  ) {
    this.user_role = localStorage.user_role;
    this.clubId = localStorage.club_id;
  }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.userDetails);
  }

  

  // panelClose(panel1: any, panel2: any) {
  //   panel1.close();
  //   panel2.close();
  // }

  // This method will close all other expansion panels except the current one
  panelClose(currentPanel: MatExpansionPanel): void {
    this.expansionPanels.forEach((panel) => {
      if (panel !== currentPanel && panel.expanded) {
        panel.close();
      }
    });
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
  
}
