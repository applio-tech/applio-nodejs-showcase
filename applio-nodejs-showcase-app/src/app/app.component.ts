import { Component } from '@angular/core';
import { WindowResizeService } from './services/window-resize.service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mobileView: boolean;
constructor(private windowResizeService: WindowResizeService){}

ngOnInit() {
  if (window.innerWidth < 1100) {
    this.mobileView = true;
  }
  if (window.innerWidth >= 1100) {
    this.mobileView = false;
  }
}

onResize(event) {
  if (event.target.innerWidth < 1100) {
      this.mobileView = true;
  }
  if (event.target.innerWidth >= 1100) {
      this.mobileView = false;
  }
}

}
