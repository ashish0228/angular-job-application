import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JobAppFrontApp';

  showImage = false;
  constructor(private router: Router) { 
    router.events.subscribe((val) => {
      if (this.router.url == '/') {
        this.showImage = true;
      } else {
        this.showImage = false;
      }
  });
  }
}
