import {
  Component,
  ElementRef,
  OnInit,
  HostListener,
  ViewEncapsulation,
} from "@angular/core";
import { switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { VimeoService } from "./vimeo.service";

import { OwlOptions } from "ngx-owl-carousel-o";
import { HomeService } from "./home.service";
import { environment } from "../../environments/environment";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { FetchThumbnailURLService } from "./fetchThumbnailURL.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  videoId = "28916465";
  thumbnailUrl: string;
  year = new Date().getFullYear();
  isSticky = false;
  landingData: any;
  sports: any;
  android_app_url: string;
  ios_app_url: string;
  newEnv: any = environment;

  trustedVideoUrls: {
    video_title: string;
    video_url: SafeResourceUrl;
    thumbnail: string;
  }[];

  api_url = environment.imageUrl;

  currentPlayingVideo: HTMLIFrameElement | null = null;

  imageToShow: string = ""; // URL of the image to display
  hoveredElem: string = ""; // Track which h5 tag is hovered
  setFeatureImages = [];

  featureImgOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>",
    ],
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
    autoplay: true, // Enable autoplay
    autoplayTimeout: 3000, // Set autoplay timeout in milliseconds (e.g., 3000ms or 3 seconds)
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>",
    ],
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

  selectedVideo: {
    video_url: SafeResourceUrl;
    video_title: string;
    thumbnail: string;
  } | null = null;

  constructor(
    private el: ElementRef,
    public _DomSanitizationService: DomSanitizer,
    private homeService: HomeService,
    private vimeoService: VimeoService,
    private fetchThumbnailURLService: FetchThumbnailURLService
  ) {}

  ngOnInit() {
    this.fetchLanding();
    this.fetchSportsData();
    this.getSettingData();
  }

  scrollToElement(scrollTarget: string) {
    const padding = 55; // Adjust this value to set the desired padding
    const targetElement = this.el.nativeElement.querySelector(
      "#" + scrollTarget
    );
    //console.log(targetElement);
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
      .then(async (e: any) => {
        const obj = e.data;
        this.landingData = obj;

        // show first item by default
        this.hoveredElem = obj?.feature?.feature_left_1_title;
        this.setFeatureImages =
          obj?.feature?.landing_features[0].feature_images;
        this.imageToShow =
          this.newEnv.imageUrl + obj?.feature?.feature_left_1_image;

        this.trustedVideoUrls = await Promise.all(
          obj?.videos.map(async (video) => {
            const videoUrl = this.isYouTubeUrl(video.video_url)
              ? this.sanitizeYouTubeUrl(video.video_url)
              : this._DomSanitizationService.bypassSecurityTrustResourceUrl(
                  video.video_url
                );

            try {
              const thumbnailUrl = await this.fetchThumbnailURLService
                .fetchThumbnailURL(video.video_url)
                .toPromise();
              return {
                _id: video._id,
                video_title: video.video_title,
                video_url: videoUrl,
                thumbnail: thumbnailUrl,
              };
            } catch (error) {
              console.error("Error fetching thumbnail URL:", error);
              return null;
            }
          })
        );

        // Remove any null values (thumbnails that failed to fetch)
        this.trustedVideoUrls = this.trustedVideoUrls.filter(
          (video) => video !== null
        );

        this.selectedVideo = {
          video_url: this.trustedVideoUrls[0].video_url,
          video_title: this.trustedVideoUrls[0].video_title,
          thumbnail: this.trustedVideoUrls[0].thumbnail,
        };
      })
      .catch((err) => {
        console.log(err);
        // this.sharedService.showLoader = false;
      });
  }

  fetchSportsData() {
    this.homeService
      .getSportsData()
      .then((e: any) => {
        const obj = e.data;
        //console.log("sports data", obj);
        this.sports = obj;
      })
      .catch((err) => {
        console.log(err);
        // this.sharedService.showLoader = false;
      });
  }
  getSettingData() {
    this.homeService
      .getSettingData()
      .then((e: any) => {
        const settingObj = e.data;
        // console.log("setting obj", settingObj);
        // this.settingData = obj;
        for (const itemKey in settingObj) {
          if (settingObj.hasOwnProperty(itemKey)) {
            const key = settingObj[itemKey].key;
            if (key === "android_app") {
              this.android_app_url = settingObj[itemKey].value;
            }
            if (key === "ios_app") {
              this.ios_app_url = settingObj[itemKey].value;
            }
            // console.log(`Key: ${key}, Value: ${value}`);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        // this.sharedService.showLoader = false;
      });
  }

  sanitizeYouTubeUrl(url: string): SafeResourceUrl {
    // Extract the video ID from the URL
    const videoId = this.extractVideoId(url);

    // Construct the YouTube embed URL
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    // Sanitize and return the embed URL
    return this._DomSanitizationService.bypassSecurityTrustResourceUrl(
      embedUrl
    );
  }

  isYouTubeUrl(url: string): boolean {
    return url.includes("youtube.com") || url.includes("youtu.be");
  }

  extractVideoId(url: string): string {
    // Use a regular expression to extract the video ID from the URL
    const regex =
      /(?:\?v=|&v=|youtu\.be\/|embed\/|\/v\/|\/e\/|watch\?v=|watch\?feature=player_embedded&v=|watch\?feature=player_embedded&v=|watch\?v=)([a-zA-Z0-9_-]{11})/i;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return "";
  }

  playVideo(index: number) {
    const video = this.trustedVideoUrls[index];
    this.selectedVideo = {
      video_url: video.video_url,
      video_title: video.video_title,
      thumbnail: video.thumbnail,
    };
  }
}
