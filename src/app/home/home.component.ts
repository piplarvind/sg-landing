import { Component, ElementRef, OnInit, HostListener  } from "@angular/core";
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {

  isSticky = false;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
   
    slides = [
      {id: 1, img: "https://dummyimage.com/350x150/423b42/fff", title:"1", alt:"1"},
      {id: 2, img: "https://dummyimage.com/350x150/2a2b7a/fff", title:"2", alt:"2"},
      {id: 3, img: "https://dummyimage.com/350x150/1a2b7a/fff", title:"3", alt:"3"},
      {id: 4, img: "https://dummyimage.com/350x150/7a2b7a/fff", title:"4", alt:"4"},
      {id: 5, img: "https://dummyimage.com/350x150/9a2b7a/fff", title:"5", alt:"5"},
      {id: 6, img: "https://dummyimage.com/350x150/5a2b7a/fff", title:"6", alt:"6"},
      {id: 6, img: "https://dummyimage.com/350x150/4a2b7a/fff", title:"7", alt:"7"}
    ];
 
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Check the scroll position to determine if the header should be sticky
    this.isSticky =  window.scrollY > 50; // Adjust the offset value as needed
  }

  constructor(private el: ElementRef) {}

  ngOnInit() {}
 

    scrollToElement(scrollTarget: string) {
      const targetElement = this.el.nativeElement.querySelector("#"+scrollTarget);
      console.log(targetElement);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        console.warn("Element with ID '"+scrollTarget+"' not found.");
      }
    }
  
}
