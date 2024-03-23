import { Component, OnInit } from "@angular/core";
import { finalize, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { MatTableDataSource } from "@angular/material/table";
import { AccountService } from "../account.service";
import { CountryCode, getCountryCallingCode } from "libphonenumber-js";

@Component({
  selector: "app-my-fan-of",
  templateUrl: "./my-fan-of.component.html",
  styleUrls: ["./my-fan-of.component.scss"],
})
export class MyFanOfComponent implements OnInit {
  keyup: boolean = false;
  tabledataloaded: boolean = false;
  limit: number = 25;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [25, 50, 100];
  tabledata: any = [];
  dataSource = new MatTableDataSource();
  displayedColumns: any = [
    "name",
    "email",
    "mobile"
  ];

  startDate: Date; // Initialize this with the start date
  endDate: Date; // Initialize this with the end date
  isLoading: boolean;
  isSuperAdmin: Boolean = false;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private service: AccountService
  ) {
    // console.log('localStorage.user_role', localStorage.user_role);
  }

  ngOnInit() {
    this.fetchMyFanOf();
  }

  fetchMyFanOf() {
    let userId = localStorage.user_id;
    this.service
      .getFanOf(userId)
      .then((e: any) => {
        const res = e.data;

        const newresult = res?.recruiter_athletes.map((prof:any) => {
          const prop = prof;
          let name: any = {
              fname: "",
              lname: "",
            },
            email: string = "",
            phone_code: any = "",
            mobile_phone: any = "";

          for (let i = 0; i < prop?.profile_fields.length; i++) {
            if (prop?.profile_fields[i].field) {
              if (prop?.profile_fields[i].field.name === "first_name") {
                name.fname = prop?.profile_fields[i].value;
              }
              if (prop?.profile_fields[i].field.name === "last_name") {
                name.lname = prop?.profile_fields[i].value;
              }
              if (prop?.profile_fields[i].field.name === "email") {
                email = prop?.profile_fields[i].value;
              }
              
              if (prop.profile_fields[i].field.name === "phone_code") {
                const iso2: CountryCode = prop.profile_fields[i].value
                  ? prop.profile_fields[i].value
                  : "US";
                phone_code = getCountryCallingCode(iso2);
              }
              if (prop?.profile_fields[i].field.name === "mobile_phone") {
                mobile_phone = prop?.profile_fields[i].value;
              }
            }
          }
          return {
            ...prop,
            name: name.fname + " " + name.lname,
            email: email,
            phone_code: phone_code,
            mobile_phone: mobile_phone
          };
        });
        this.dataSource.data = newresult;
      })
      .catch((err) => {
        console.log(err);
        // this.sharedService.showLoader = false;
      });
  }

  public doFilter = (event: Event) => {
    if (event['keyCode'] === 13) {
      //  value can't be send with white space in url
      let value = event.target['value'];
      value = value.split(' ').join('_');
      let url = '?searchBy=club_name&values=';

      let data;
      // this.service.getfilterClub(url + value).then((res: any) => {
      //   data = res;

      //   this.dataSource.data = data['data'];

      //   this.tabledataloaded = true;
      // });
    } else {
      this.keyup = true;
    }
  };
  inputChanged(e: any) {
    let s = "";
    e = e.slice(-10);
    if (e.length <= 10 && e.length > 0) {
      const first = e.substring(0, 3);
      const mid = e.substring(3, 6);
      const last = e.substring(6, 10);
      s = "(" + first + ") " + mid + "-" + last;
      return s;
    }
    return "";
  }
  
}
