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

  user_role: any;
  clubId: any;
  ClubSelected: any;
  message;
  panelOpenState: Boolean = false;
  sportLogo = "./assets/ClubV_logo.png";

  constructor(
    private sharedService: SharedService
  ) {
    this.user_role = localStorage.user_role;
    this.clubId = localStorage.club_id;
  }

  ngOnInit() {
    const obj = JSON.parse(localStorage.userDetails);
    if (obj.club) {
      if (
        localStorage.user_role === "COA" ||
        localStorage.user_role === "CAD"
      ) {
        this.sportSelected(obj?.sport);
      }
    }
  }

  sportSelected(sport: any) {
    localStorage.super_cur_sportId = sport?._id;
    localStorage.super_cur_sport = sport?.db_name;
    localStorage.super_cur_sportName = sport?.sport_name;
    localStorage.super_cur_sportLogo = sport?.logo;
    if (sport.logo !== "") {
      this.sportLogo = `${environment.imageUrl}${sport?.logo}`;
    } else {
      this.sportLogo = "assets/no_logo.png";
    }
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

  
}
