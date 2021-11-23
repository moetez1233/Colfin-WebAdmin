import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Constants } from 'src/Constants/Constants';
import { Administrateur } from 'src/Models/Administrateur';
import { AdminProfileService } from '../../../../../demo/dashboard/admin-profile/Admin-Profile-Service';



@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {
  user;
  imgsrc;
  constructor(private AUTH: AngularFireAuth, private router: Router) {
    let currentUser: Administrateur = Constants.admin;
    this.user = currentUser.prenom + " " + currentUser.nom;
    let url = Constants.imgsrc;
    if (currentUser.profileImgUrl)
      url = currentUser.profileImgUrl;
    this.imgsrc = url;
  }

  ngOnInit() {
    AdminProfileService.getAdminDetails()
      .subscribe(item => { this.user = item.name; this.imgsrc = item.url });
  }
  profile() {
    Constants.redirect = true;
    this.router.navigateByUrl('/dashboard/profile')
  }
  logout() {
    Constants.redirect = true;
    this.AUTH.auth.signOut();
    this.router.navigateByUrl('')
  }

}
