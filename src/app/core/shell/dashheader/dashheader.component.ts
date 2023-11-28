// home.component.ts
import { Component, ElementRef, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { ScrollService } from "@app/core/scroll.service";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-dashheader",
  templateUrl: "./dashheader.component.html",
  styleUrls: ["./dashheader.component.scss"],
})
export class DashheaderComponent implements OnInit {
  constructor(
    private el: ElementRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.handleScroll();
      });
  }

  private handleScroll(): void {
    this.activatedRoute.fragment.subscribe(fragment => {
      if (fragment) {
        this.scrollService.scrollToElement(fragment);
      }
    });
  }

  // scrollToElement(scrollTarget: string) {
  //   const padding = 55; // Adjust this value to set the desired padding
  //   const targetElement = this.el.nativeElement.querySelector(
  //     "#" + scrollTarget
  //   );
  //   if (targetElement) {
  //     const scrollPosition =
  //       targetElement.getBoundingClientRect().top + window.scrollY - padding;
  //     window.scrollTo({ top: scrollPosition, behavior: "smooth" });
  //   } else {
  //     console.warn("Element with ID '" + scrollTarget + "' not found.");
  //   }
  // }

  handleMenuClick() {
    document.getElementById("navbarSupportedContent").classList.remove("show");
  }
}
