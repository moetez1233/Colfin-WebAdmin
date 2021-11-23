import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/Constants/Constants';

@Component({
  selector: 'app-mainten-error',
  templateUrl: './mainten-error.component.html',
  styleUrls: ['./mainten-error.component.scss']
})
export class MaintenErrorComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }

  goHome(){
    Constants.route="";
    Constants.redirect=true;
    this.route.navigateByUrl('');
  }
}
