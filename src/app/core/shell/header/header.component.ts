// home.component.ts
import { Component, ElementRef, OnInit, HostListener } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { ScrollService } from "@app/core/scroll.service";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  userId:any;
  constructor(
    private el: ElementRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('user_id');
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.handleScroll();
      });
  }

  
  @HostListener("window:scroll", [])
  onWindowScroll() {
    // Check the scroll position to determine if the header should be sticky
    // this.isSticky = window.scrollY > 50; // Adjust the offset value as needed
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      document.getElementById("header-navbar").classList.add("nav-scroll");
      // document.getElementById("paragraph").classList.add("green");
    } else {
      document.getElementById("header-navbar").classList.remove("nav-scroll");
    }
  }

  private handleScroll(): void {
    this.activatedRoute.fragment.subscribe(fragment => {
      if (fragment) {
        this.scrollService.scrollToElement(fragment);
      }
    });
  }

  hardRefresh(url:string) {
    // Navigate to the same route to trigger a hard refresh
    //this.router.navigate([this.router.url]);
    this.router.navigate([url]).then(() => {
      // After navigation, perform a hard refresh
      window.location.reload();
    });
  }

  scrollToElement(scrollTarget: string) {
    const padding = 55; // Adjust this value to set the desired padding
    const targetElement = this.el.nativeElement.querySelector(
      "#" + scrollTarget
    );
    if (targetElement) {
      const scrollPosition =
        targetElement.getBoundingClientRect().top + window.scrollY - padding;
      window.scrollTo({ top: scrollPosition, behavior: "smooth" });
    } else {
      console.warn("Element with ID '" + scrollTarget + "' not found.");
    }
  }

  handleMenuClick() {
    document.getElementById("navbarSupportedContent").classList.remove("show");
  }
}
