// onboarding.process.service.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OnboardingService {
  private genderLookupUrl = "/lookup/gender";
  private saveStep1Url = "onboard/register";
  private getSportsUrl = "sports/api";
  private saveSportUrl = "onboard/save-sport";
  private getRolesUrl = "profiles/api-types";
  private saveRolesUrl = "onboard/save-roles";
  private getSportClubsUrl = "clubs/api-sport-clubs";
  private saveClubUrl = "onboard/save-club";
  private getGenderAgesUrl = "lookup/age";
  private saveAgeUrl = "onboard/save-age";
  private saveClubNotHereUrl = "leads";
  private saveUniversityUrl = "onboard/enter-university-detail";
  private verifyOTPUrl = "onboard/verify-phone";
  private resendOTPUrl = "onboard/resend-otp";
  // get athlets
  private getClubAthletesUrl = "onboard/parent/get-athlete";

  constructor(private http: HttpClient) {}

  getGenders(): Observable<any> {
    return this.http.get(`${this.genderLookupUrl}`);
  }

  saveStep1Data(userData: any): Observable<any> {
    return this.http.post(`${this.saveStep1Url}`, userData);
  }

  getSports(): Observable<any> {
    return this.http.get(`${this.getSportsUrl}`);
  }

  saveSportData(sportData: any): Observable<any> {
    return this.http.post(`${this.saveSportUrl}`, sportData);
  }

  getRoles(): Observable<any> {
    return this.http.get(`${this.getRolesUrl}`);
  }

  saveRoleData(roleData: any): Observable<any> {
    return this.http.post(`${this.saveRolesUrl}`, roleData);
  }

  getClubsBySport(sport: any): Observable<any> {
    return this.http.post(`${this.getSportClubsUrl}`, sport);
  }

  saveClubData(clubData: any): Observable<any> {
    return this.http.post(`${this.saveClubUrl}`, clubData);
  }

  getGenderAges(gender: string): Observable<any> {
    return this.http.get(`${this.getGenderAgesUrl}?filter=${gender}`);
  }

  saveAgeData(ageData: any): Observable<any> {
    return this.http.post(`${this.saveAgeUrl}`, ageData);
  }

  saveClubNotHereData(clubData: any): Observable<any> {
    return this.http.post(`${this.saveClubNotHereUrl}`, clubData);
  }

  saveUniversityData(universityData: any): Observable<any> {
    return this.http.post(`${this.saveUniversityUrl}`, universityData);
  }

  verifyOTPData(otpData: any): Observable<any> {
    return this.http.post(`${this.verifyOTPUrl}`, otpData);
  }
  resendOTPData(otpData: any): Observable<any> {
    return this.http.post(`${this.resendOTPUrl}`, otpData);
  }

  getClubAthletes(payload: any): Observable<any> {
    return this.http.post(`${this.getClubAthletesUrl}`, payload);
  }
}
