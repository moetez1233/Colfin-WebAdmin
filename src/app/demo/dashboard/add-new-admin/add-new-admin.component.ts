import { Component, OnInit } from '@angular/core';
import { RolesGroupe } from 'src/Models/RolesGroupe';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Administrateur } from 'src/Models/Administrateur';
import { Constants, RolesId } from 'src/Constants/Constants';
import { AddNewAdminService } from './Add-New-Admin-Service';
import { HttpClient } from '@angular/common/http';
import { Role } from 'src/Models/Role';
import { RoleService } from '../roles/RoleService';

@Component({
  selector: 'app-add-new-admin',
  templateUrl: './add-new-admin.component.html',
  styleUrls: ['./add-new-admin.component.scss']
})
export class AddNewAdminComponent implements OnInit {
  type = "";
  alertText = "";
  adminToAdd: Administrateur;
  adminRoles: Role[] = []
  AddForm: FormGroup;
  isSubmitted = false;

  adminGotTheRole = false
  adminCanSeeRoles = false;
  constructor(
    private AUTH: AngularFireAuth,
    private formBuilder: FormBuilder,
    private http?: HttpClient,
  ) {
    if (Constants.admin.rolesGroupe.indexOf(RolesId.add_admin) !== -1) {
      this.adminGotTheRole = true
      if (Constants.admin.rolesGroupe.indexOf(RolesId.Affect_Role_To_Admin) !== -1) {
        this.adminCanSeeRoles = true
      }
    }
  }
  ngOnInit() {
    this.AddForm = this.formBuilder.group({
      email: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });

    RoleService.get().subscribe(item => {
      if (item.adminRoles) {
        this.adminRoles = item.adminRoles;
      }
    })
  }
  ngAfterViewInit() {

  }

  async addAdmin() {
    Constants.redirect = false;
    if (!this.AddForm.invalid) {
      let email = <string>this.AddForm.value.email;
      const regex = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
      if (email.match(regex)) {
        this.isSubmitted = true;
        this.showAlert("info", "Ajout de l'administrateur . . .");
        let result = await AddNewAdminService.createNewAdmin(this.http, this.AddForm, this.adminRoles);
        //@ts-ignore
        if (result.status) {
          this.AUTH.auth.sendPasswordResetEmail(email);
          this.showAlert("success", "Administrateur ajouté!");
          this.resetPage();
        } else {
          //@ts-ignore
          this.showAlert("danger", "Administrateur n'est pas ajouté");
        }
        this.isSubmitted = false;
      } else {
        this.showAlert("danger", "Le format de l'e-mail est incorrect")
      }
    } else {
      this.showAlert("danger", "Certains champs sont vides")
    }
  }


  showAlert(type: string, text: string) {
    this.type = type;
    this.alertText = text;
    if ((<HTMLInputElement>document.getElementById("alert")))
      (<HTMLInputElement>document.getElementById("alert")).hidden = false;
  }


  resetPage() {
    this.AddForm.reset();
    this.isSubmitted = false;
    RoleService.resetPage();
  }
}
