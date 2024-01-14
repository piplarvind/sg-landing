import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { SharedService } from "@app/shared/shared.service";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";
export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
}

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

const credentialsKey = "credentials";

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  message: any;
  highestRole: any;
  passwordForgotUrl = "forgot-password/";
  private _credentials: Credentials | null;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    public http: HttpClient
  ) {
    const savedCredentials =
      sessionStorage.getItem(credentialsKey) ||
      localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  login(context: LoginContext) {
    let loggedIn = false;
    const cred = {
      loginBy: "user_name",
      value: context.username,
      password: context.password,
    };
    const url = "auths/";
    let data = {
      username: context.username,
      token: "",
      loggedIn: false,
    };
    this.http.post(url, cred).subscribe(
      (res: any) => {
        //console.log('res', res);
        if(res?.data?.is_onboarding_done === false){

          localStorage.setItem("userId", res?.data?._id);

          if (res?.data?.completed_steps === 1) {
            this.router.navigate(["/auth/onboarding/step1"]);
          } else if (res?.data?.completed_steps === 2) {
            localStorage.setItem("sportId", res?.data?.sport._id);
            this.router.navigate(["/auth/onboarding/step2"]);
          } else if (res?.data?.completed_steps === 3) {
            localStorage.setItem("sportId", res?.data?.sport._id);              
            localStorage.setItem("userType", res?.data?.types[0].abbr);
            this.router.navigate(["/auth/onboarding/step3"]);
          } else if (res?.data?.completed_steps === 4) {
            localStorage.setItem("sportId", res?.data?.sport._id);
            localStorage.setItem("clubId", res?.data?.club._id);
            localStorage.setItem("userType", res?.data?.types[0].abbr);
            if(localStorage.getItem("userType") === 'ATH'){
              this.router.navigate(["/auth/onboarding/step4"]);
            }else if(localStorage.getItem("userType") === 'REC'){
              this.router.navigate(["/auth/onboarding/university-detail"]);
            }else if(localStorage.getItem("userType") === 'PAR'){
              this.router.navigate(["/auth/onboarding/select-athletes"]);
            }else if(localStorage.getItem("userType") === 'FFF'){
              this.router.navigate(["/auth/onboarding/select-athlete-coach"]);
            }else{
              this.router.navigate(["/auth/onboarding/score-screen"]);
            }
          } else {
            this.sharedService.loginDialog(res.message);
          }

          //return of(data);
        }
        if (res.token) {
          loggedIn = true;
        }

        if (!res.token) {
          this.sharedService.loginDialog(
            "You are not authorized to access this portal"
          );
          this.router.navigateByUrl("/login");
        }
        let arr = [];
        let typelist = [];

        for (let i = 0; i < res.data?.types?.length; i++) {
          arr[i] = res.data?.types[i].priority;
          typelist[i] = res.data?.types[i];
        }
        arr.sort();

        this.highestRole = typelist.filter((t) => t.priority === arr[0]);

        loggedIn = true;

        data.token = res.token;
        data.loggedIn = loggedIn;
        localStorage.token = res.token;
        localStorage.user_role = this.highestRole[0].abbr;
        localStorage.role_id = this.highestRole[0]._id;
        localStorage.user_id = res.data._id;
        localStorage.club_id = res.data?.club._id;
        localStorage.sport_id = res.data?.sport._id;

        const headers = new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        });

        localStorage.userDetails = JSON.stringify(res.data);
        window.location.href = "/account";

        return res;
      },
      (error) => this.sharedService.loginDialog(error?.error?.message)
    );
    this.setCredentials(data, context.remember);
    return of(data);
  }

  forgotPassword(username: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.passwordForgotUrl, username).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  // getUserRole(role: any) {
  //   return of(role);
  // }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    localStorage.clear();
    sessionStorage.clear();
    // Customize credentials invalidation here
    this.setCredentials();
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   * @param {boolean=} remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }
}
