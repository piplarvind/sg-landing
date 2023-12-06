import { Component, OnInit } from "@angular/core";
import { finalize, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { MatTableDataSource } from "@angular/material/table";
import { AccountService } from "../account.service";
import { PaymentService } from "../make-payment/payment.service";

const MY_ATHLETES = [
  {
    name: "Athlete 1",
    email: "ath1@gmail.com",
  },
  {
    name: "Athlete 2",
    email: "ath2@gmail.com",
  },
  {
    name: "Athlete 3",
    email: "ath3@gmail.com",
  },
];

const RECENT_PAYMENTS = [
  {
    payments: "Tryouts",
    date: "07 Nov 2023",
    time: "10:30 AM",
  },
  {
    payments: "Events",
    date: "09 Nov 2023",
    time: "11:10 AM",
  },
  {
    payments: "John Doe",
    date: "10 Nov 2023",
    time: "01:30 PM",
  },
];

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  user_role: any;
  keyup: boolean = false;
  tabledataloaded: boolean = false;
  limit: number = 100;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 25, 50, 100];
  tabledata: any = [];
  
  athleteCount: number = 0;
  parentCount: number = 0;
  successfullPayment: number = 0;
  unSuccessfullPayment: number = 0;

  // Define data sources for each table
  dataSourceAthletes = new MatTableDataSource<any>();
  dataSourceParents = new MatTableDataSource<any>();
  dataSourcePayments = new MatTableDataSource<any>();
  displayedColumns: any = ["name", "email"];

  displayedPaymentColumns: string[] = ["payments", "date", "time"];

  startDate: Date; // Initialize this with the start date
  endDate: Date; // Initialize this with the end date
  totalSports: number = 0;
  totalClubs: number = 0;
  overallStaticsData: any;
  staticsData: any;
  quote: string;
  isLoading: boolean;
  isSuperAdmin: Boolean = false;
  clubsList: Array<any>;
  dashboardStates = [
    { name: "User Types", userCount: 0 },
    { name: "No. of Users", userCount: 0 },
    { name: "No. of Atheletes", userCount: 0 },
    { name: "No. of Coachs", userCount: 0 },
    // Add more states with user count
  ];

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private accountService: AccountService,
    private paymentService: PaymentService
  ) {
    this.user_role = localStorage.user_role;
  }

  ngOnInit() {
    // this.dataSourceAthletes.data = MY_ATHLETES;
    // this.dataSourcePayments.data = RECENT_PAYMENTS;
    if (this.user_role === "PAR" || this.user_role === "FFF") {
      this.fetchMyAthletes();
    }
    if (this.user_role === "ATH") {
      this.fetchMyParents();
    }
    this.fetchSuccessfullPayments();
    this.fetchUnSuccessfullPayments();
  }

  fetchSuccessfullPayments() {
    let userId = localStorage.user_id;
    // let url = `${userId}?limit=${5}`;
    let payload = {
      payer: userId
    };
    this.paymentService
      .getPaymentHistories(payload)
      .then((e: any) => {
        const res = e.data;
        this.successfullPayment = res?.length;
        this.dataSourcePayments.data = res;
      })
      .catch((err) => {
        console.log(err);
        // this.sharedService.showLoader = false;
      });
  }

  fetchUnSuccessfullPayments() {
    let userId = localStorage.user_id;
    // let url = `${userId}?limit=${5}`;
    let payload = {
      payer: userId
    };
    this.paymentService
      .getFailedPaymentHistories(payload)
      .then((e: any) => {
        const res = e.data;
        this.unSuccessfullPayment = res?.length;
        this.dataSourcePayments.data = res;
      })
      .catch((err) => {
        console.log(err);
        // this.sharedService.showLoader = false;
      });
  }

  fetchMyAthletes() {
    let userId = localStorage.user_id;
    // let url = `${userId}?limit=${5}`;
    let url = `${userId}`;
    this.accountService
      .getParentAthletes(url)
      .then((e: any) => {
        const res = e.data;
        this.athleteCount = res?.child?.length;
        const newresult = res?.child.map((prof) => {
          const prop = prof?.profile_id;
          let name: any = {
              fname: "",
              lname: "",
            },
            email: string = "";

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
            }
          }
          return {
            ...prop,
            name: name.fname + " " + name.lname,
            email: email,
          };
        });
        this.dataSourceAthletes.data = newresult;
      })
      .catch((err) => {
        console.log(err);
        // this.sharedService.showLoader = false;
      });
  }

  fetchMyParents() {
    let userId = localStorage.user_id;
    // let url = `${userId}?limit=${5}`;
    let url = `${userId}`;
    this.accountService
      .getAthleteParents(url)
      .then((e: any) => {
        const res = e.data;
        this.parentCount = res?.parents?.length;
        const newresult = res?.parents.map((prof) => {
          const prop = prof?.profile_id;
          let name: any = {
              fname: "",
              lname: "",
            },
            email: string = "";

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
            }
          }
          return {
            ...prop,
            name: name.fname + " " + name.lname,
            email: email,
          };
        });
        this.dataSourceParents.data = newresult;
      })
      .catch((err) => {
        console.log(err);
        // this.sharedService.showLoader = false;
      });
  }
}
