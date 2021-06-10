import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class WindowResizeService {
  windowResized = new EventEmitter<boolean>();
  windowWidth = window.innerWidth;
  constructor() {}

  onWindowResized() {
    if (window.innerWidth !== this.windowWidth) {
      this.windowResized.emit(true);
    } else {
      this.windowResized.emit(false);
    }
  }
}
