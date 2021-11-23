import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth/auth';
import { Constants } from 'src/Constants/Constants';
import { HttpClient } from '@angular/common/http';
import { PageLoaderService } from './Page-Loader-service';




@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.scss']
})
export class PageLoaderComponent implements OnInit {

  constructor(private router: Router, private AUTH?: AngularFireAuth, private http?: HttpClient) {
  }

  async ngOnInit() {
    this.initWebSite();
  }


  initWebSite() {
    let rout: string = Constants.route;
    if (Constants.redirect) {
      this.AUTH.authState.subscribe(async user => {
        if (user === null) {
          if (rout.indexOf("/auth") == -1)
            rout = "/auth/signin";
          this.router.navigateByUrl(rout)
          Constants.authAdmin = null;
          Constants.refAdmin = null;
          Constants.admin = null;
        } else {
          Constants.authAdmin = user;
          let details = await PageLoaderService.getUserDetails(this.http, user.uid);
          Constants.refAdmin = details.ref;
          Constants.admin = details.admin;
          if (!Constants.admin.rolesGroupe) {
            Constants.admin.rolesGroupe = []
          }
          if (Constants.admin.profileImgUrl) {
            Constants.imgsrc = Constants.admin.profileImgUrl;
          } else {
            Constants.imgsrc = "assets/images/user/anonymous.png"
          }
          if (Constants.redirect) {
            if (rout === "" || rout === "/auth/signin" || rout === "/auth/reset-password" || rout === "/error" || rout === "/maintenance")
              rout = '/dashboard';
            this.router.navigateByUrl(rout).catch(e => {
              // console.log(e);
              this.router.navigateByUrl("error")
            })
          }
        }
      })
    }
  }
}
