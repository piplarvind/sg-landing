import { Component, OnInit } from "@angular/core";
import { finalize, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { MatTableDataSource } from "@angular/material/table";
import { AccountService } from "../account.service";
import { PaymentService } from "../make-payment/payment.service";
import { SharedService } from "@app/shared/shared.service";

@Component({
  selector: "app-payment-histories",
  templateUrl: "./payment-histories.component.html",
  styleUrls: ["./payment-histories.component.scss"],
})
export class PaymentHistoriesComponent implements OnInit {
  keyup: boolean = false;
  tabledataloaded: boolean = false;
  limit: number = 100;
  skip: number = 0;
  totalLength: number = 0;
  previousindex: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 25, 50, 100];
  tabledata: any = [];
  dataSource = new MatTableDataSource();
  displayedColumns: any = [
    'date',
    'payer',
    'amount',
    'paymentmethod',
    'card',
    'transacationId',
    'Description'
  ];

  startDate: Date; // Initialize this with the start date
  endDate: Date; // Initialize this with the end date
  isLoading: boolean;
  isSuperAdmin: Boolean = false;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private service: AccountService,
    private paymentService: PaymentService,
    public sharedService: SharedService
  ) {
    // console.log('localStorage.user_role', localStorage.user_role);
  }

  ngOnInit() {
    this.fetchPaymentHistories();
  }

  fetchPaymentHistories() {
    this.sharedService.showLoader = true;
    let data:any;
    let userId = localStorage.user_id;
    const postData = {
      payer: userId,
    };
    this.paymentService
      .getPaymentHistories(postData)
      .then((res: any) => {
        const newres = res.data.map(prop => {
          let name: any = {
            fname: '',
            lname: '',
            moblie: ''
          };
          if (prop.payer) {
            for (let i = 0; i < prop.payer.profile_fields.length; i++) {
              if (prop.payer.profile_fields[i].field.name === 'first_name') {
                name.fname = prop.payer.profile_fields[i].value;
              }
              if (prop.payer.profile_fields[i].field.name === 'last_name') {
                name.lname = prop.payer.profile_fields[i].value;
              }
              if (prop.payer.profile_fields[i].field.name === 'mobile_phone') {
                name.moblie = prop.payer.profile_fields[i].value;
              }
            }
          }

          let Afname = '',
            Alname = '',
            Amoblie = '';
          if (prop.behalf) {
            for (let i = 0; i < prop.behalf.profile_fields.length; i++) {
              if (prop.behalf.profile_fields) {
                if (
                  prop.behalf.profile_fields[i].field.name === 'first_name'
                ) {
                  Afname = prop.behalf.profile_fields[i].value;
                }
                if (prop.behalf.profile_fields[i].field.name === 'last_name') {
                  Alname = prop.behalf.profile_fields[i].value;
                }
                if (
                  prop.behalf.profile_fields[i].field.name === 'mobile_phone'
                ) {
                  Amoblie = prop.behalf.profile_fields[i].value;
                }
              }
            }
          }

          return {
            ...prop,
            date: new Date(prop.created_on),
            card: prop.ccnum,
            athlete: Afname + ' ' + Alname,
            contact_no_athlete: Amoblie,
            payer: name.fname + ' ' + name.lname,
            contact_no_payer: name.moblie
          };
        });
        this.tabledata = newres;

        res.data = this.tabledata;

        data = res;

        this.dataSource.data = data['data'];
        console.log('this.dataSource', this.dataSource.data);

        if (
          this.totalLength === 0 ||
          this.totalLength !== data['pagination']
        ) {
          this.totalLength = data['pagination'];
        }
        this.tabledataloaded = true;
        this.sharedService.showLoader = false;
      })
      .catch((err) => {
        console.log(err);
        // this.sharedService.showLoader = false;
      });
  }

  public doFilter = (event: Event) => {
    if (event["keyCode"] === 13) {
      //  value can't be send with white space in url
      let value = event.target["value"];
      value = value.split(" ").join("_");
      let url = "?searchBy=club_name&values=";

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
}
