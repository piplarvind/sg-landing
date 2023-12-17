import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "@app/core/authentication/authentication.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // For simplicity, let's assume the user is authenticated.

    if (this.authenticationService.isAuthenticated()) {
      return true;
    } else {
      // Redirect to the login page if not authenticated.
      //return this.router.createUrlTree(["/login"]);
      this.router.navigate(["/login"], { replaceUrl: true });
      return false;
    }
  }
}
