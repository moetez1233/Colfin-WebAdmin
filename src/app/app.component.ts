import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { Location } from "@angular/common";
import { Constants } from 'src/Constants/Constants';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router,private location: Location) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    Constants.route=this.location.path();
    Constants.redirect=true;
    this.router.navigateByUrl('');
  }
}
