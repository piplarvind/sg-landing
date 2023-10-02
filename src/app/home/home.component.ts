import {
  Component,
  ElementRef,
  OnInit,
  HostListener,
  ViewEncapsulation,
} from "@angular/core";
import { OwlOptions } from "ngx-owl-carousel-o";
import { HomeService } from "./home.service";
import { environment } from "../../environments/environment";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  isSticky = false;
  landingData: any;
  newEnv: any = environment;
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ["", ""],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  slides = [
    {
      id: 1,
      img: "https://dummyimage.com/350x150/423b42/fff",
      title: "1",
      alt: "1",
    },
    {
      id: 2,
      img: "https://dummyimage.com/350x150/2a2b7a/fff",
      title: "2",
      alt: "2",
    },
    {
      id: 3,
      img: "https://dummyimage.com/350x150/1a2b7a/fff",
      title: "3",
      alt: "3",
    },
    {
      id: 4,
      img: "https://dummyimage.com/350x150/7a2b7a/fff",
      title: "4",
      alt: "4",
    },
    {
      id: 5,
      img: "https://dummyimage.com/350x150/9a2b7a/fff",
      title: "5",
      alt: "5",
    },
    {
      id: 6,
      img: "https://dummyimage.com/350x150/5a2b7a/fff",
      title: "6",
      alt: "6",
    },
    {
      id: 6,
      img: "https://dummyimage.com/350x150/4a2b7a/fff",
      title: "7",
      alt: "7",
    },
  ];

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

  constructor(
    private el: ElementRef,
    public _DomSanitizationService: DomSanitizer,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.fetchLanding();
  }

  scrollToElement(scrollTarget: string) {
    const padding = 55; // Adjust this value to set the desired padding
    const targetElement = this.el.nativeElement.querySelector(
      "#" + scrollTarget
    );
    console.log(targetElement);
    if (targetElement) {
      // Calculate the scroll position with padding
      const scrollPosition =
        targetElement.getBoundingClientRect().top + window.scrollY - padding;
      // targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      // Scroll to the calculated position with smooth behavior
      window.scrollTo({ top: scrollPosition, behavior: "smooth" });
    } else {
      console.warn("Element with ID '" + scrollTarget + "' not found.");
    }
  }

  handleMenuClick() {
    document.getElementById("navbarSupportedContent").classList.remove("show");
  }

  fetchLanding() {
    this.homeService
      .getLandingData()
      .then((e: any) => {
        const obj = e.data;
        console.log("obj", obj);
        this.landingData = obj;
      })
      .catch((err) => {
        console.log(err);
        // this.sharedService.showLoader = false;
      });
  }
}
