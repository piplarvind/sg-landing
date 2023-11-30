import { Component, OnInit } from "@angular/core";
import { finalize, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { MatTableDataSource } from "@angular/material/table";

const MY_ATHLETES = [
  {
    name: "Athlete 1",
    email: "ath1@gmail.com"
  },
  {
    name: "Athlete 2",
    email: "ath2@gmail.com"
  },
  {
    name: "Athlete 3",
    email: "ath3@gmail.com"
  },
];

const RECENT_PAYMENTS = [
  {
    payments: "Tryouts",
    date: "07 Nov 2023",
    time: "10:30 AM"
  },
  {
    payments: "Events",
    date: "09 Nov 2023",
    time: "11:10 AM"
  },
  {
    payments: "John Doe",
    date: "10 Nov 2023",
    time: "01:30 PM"
  },
];

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  keyup: boolean = false;
  tabledataloaded: boolean = false;
  limit: number = 100;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 25, 50, 100];
  tabledata: any = [];
  // dataSource = new MatTableDataSource();
  // Define data sources for each table
  dataSourceAthletes = new MatTableDataSource<any>();
  dataSourcePayments = new MatTableDataSource<any>();
  displayedColumns: any = [
    'name',
    'email'
  ];

  displayedPaymentColumns: string[] = ['payments', 'date', 'time'];

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
    private sanitizer: DomSanitizer
  ) {
  }

  get remainingDays(): number {
    const currentTime = new Date().getTime();
    this.endDate = new Date(localStorage.getItem("super_cur_seasonEndDate"));

    const timeDifference = this.endDate.getTime() - currentTime;
    // Calculate remaining days by dividing milliseconds by (milliseconds in a day)
    const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return remainingDays >= 0 ? remainingDays : 0; // Ensure the result is non-negative
  }

  get seasonName(): string {
    return localStorage.getItem("super_cur_seasonName");
  }

  ngOnInit() {
    this.dataSourceAthletes.data = MY_ATHLETES;
    this.dataSourcePayments.data = RECENT_PAYMENTS;
  }

  // namesort(event) {
  //   let value;
  //   if (event.direction === 'desc') {
  //     value = '-' + event.active;
  //   } else {
  //     value = event.active;
  //   }

  //   // let url = '?skip=' + this.skip + '&limit=' + this.limit + '&sort=' + value;
  
  //   let data;
  //   // this.clubService.getSortedClub(url).then((res: any) => {
  //   //   data = res;
  //   //   this.dataSource.data = data['data'];

  //   //   this.tabledataloaded = true;
  //   // });
  // }

  // public doFilter = (event: Event) => {
  //   // if (event['keyCode'] === 13) {
  //   //   //  value can't be send with white space in url
  //   //   let value = event.target['value'];
  //   //   value = value.split(' ').join('_');
  //   //   let url = '?searchBy=club_name&values=';
   

  //   //   let data;
  //   //   this.clubService.getfilterClub(url + value).then((res: any) => {
  //   //     data = res;

  //   //     this.dataSource.data = data['data'];

  //   //     this.tabledataloaded = true;
  //   //   });
  //   // } else {
  //   //   this.keyup = true;
  //   // }
  // };

  navigateToPage(page: string) {
    //console.log("page", page);
    let pageUrl = "athletes";
    switch (page) {
      case "ATH":
        pageUrl = "athletes";
        break;
      case "PAR":
        pageUrl = "parent";
        break;
      case "FFF":
        pageUrl = "friends-family-fans";
        break;
      case "COA":
        pageUrl = "coach";
        break;
      case "CAD":
        pageUrl = "club-admins";
        break;
      case "REC":
        pageUrl = "recruiter";
        break;
      default:
        pageUrl = "/home";
        break;
    }
    this.router.navigateByUrl("/" + pageUrl);
  }
}
