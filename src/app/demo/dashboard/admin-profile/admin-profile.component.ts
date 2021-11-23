import { Component, OnInit } from '@angular/core';
import { Constants, } from 'src/Constants/Constants'
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';

import { HttpClient } from '@angular/common/http';
import { AdminProfileService } from './Admin-Profile-Service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  type;
  alertText;
  reader = new FileReader()
  uploadedFile: string = "";

  email = Constants.authAdmin.email;
  isSent = false;
  isUploading = false;
  Uploadingstatus = ""
  imageurl = Constants.imgsrc;
  imagPath: string;
  admin = Constants.admin;
  updateForm: FormGroup;
  fileIsSelected = true;
  isSubmitted = false;
  UplodedImage = null;
  constructor(
    private formBuilder?: FormBuilder,
    private AUTH?: AngularFireAuth,
    private strorage?: AngularFireStorage,
    private http?: HttpClient
  ) { }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      nom: [this.admin.nom],
      prenom: [this.admin.prenom],
      phoneNumber: [this.admin.phoneNumber]

    });

    this.reader.onload = function (e) {
      //@ts-ignore
      (<HTMLInputElement>document.getElementById("uploadedFile")).setAttribute('src', e.target.result.toString());
    }
  }


  fileLoaded(event) {
    this.fileIsSelected = event.target.files.length < 0 || !this.validateFileType(event.target.value);
    if (this.fileIsSelected) {
      (<HTMLInputElement>document.getElementById("saveChangeBtn")).style.cursor = "not-allowed";
      (<HTMLInputElement>document.getElementById("uploadedFile")).setAttribute('src', "");
    } else {
      (<HTMLInputElement>document.getElementById("saveChangeBtn")).style.cursor = "pointer";
      this.UplodedImage = event.target.files[0];
      this.reader.readAsDataURL(this.UplodedImage);
    }
  }

  validateFileType(fileName): boolean {
    let isVerifyed = false;
    let idxDot = fileName.lastIndexOf(".") + 1;
    let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
      isVerifyed = true
      this.imagPath = Constants.imageStorageRef + this.admin.id + ".jpg"
    }
    return isVerifyed;
  }

  async update() {
    if (this.validateForm(this.updateForm)) {
      if (!this.isSubmitted) {
        this.isSubmitted = true;
        let time = new Date().getTime().toString();
        this.type = "info";
        this.alertText = "Mise à jour du profile";
        (<HTMLInputElement>document.getElementById("alert")).hidden = false;

        Constants.admin.id = Constants.admin.id;
        Constants.admin.nom = this.updateForm.value.nom;
        Constants.admin.prenom = this.updateForm.value.prenom
        Constants.admin.phoneNumber = this.updateForm.value.phoneNumber;
        Constants.admin.profileImgUrl = Constants.admin.profileImgUrl ? Constants.admin.profileImgUrl : "";

        let result = await AdminProfileService.updateAdminProfile(this.http, Constants.admin, Constants.refAdmin.adminUID);
        if (result.status) {
          AdminProfileService.updateNameandUrl(this.updateForm.value.nom + " " + this.updateForm.value.prenom, Constants.imgsrc)
          this.isSubmitted = false;
          this.type = "success";
          this.alertText = "Profile est à jour";
          (<HTMLInputElement>document.getElementById("alert")).hidden = false;
        } else {
          this.type = "danger";
          this.alertText = "Erreur dans la mise à jour du profile";
          (<HTMLInputElement>document.getElementById("alert")).hidden = false;
        }
      }
    }
  }

  validateForm(updateForm: FormGroup) {
    return (updateForm.value.nom !== "" && updateForm.value.prenom !== "" && updateForm.value.phoneNumber !== "")
  }

  sendResetPasswordMail() {
    this.isSent = true;
    AdminProfileService.sendResetPassword(this.AUTH).then(e => {
      //<app-alert type="{{type}}" dismiss="true" class="alert" id="alert" hidden>{{alertText}}</app-alert>
      this.type = "success";
      this.alertText = "E-mail envoyé! Verifier vos emails";
      (<HTMLInputElement>document.getElementById("alert")).hidden = false;
      this.isSent = false;
    })

  }

  async saveChanges() {
    this.isSubmitted = true;
    this.type = "info";
    this.alertText = "Téléchargement ...";
    (<HTMLInputElement>document.getElementById("alert")).hidden = false;
    this.Uploadingstatus = "Téléchargement ..."
    this.isUploading = true;
    (<HTMLInputElement>document.getElementById("validatedCustomFile")).value = "";
    this.fileIsSelected = true;
    (<HTMLInputElement>document.getElementById("saveChangeBtn")).style.cursor = "not-allowed";

    await this.strorage.storage.ref(this.imagPath).put(this.UplodedImage)
      .catch(e => {
        this.type = "danger";
        this.alertText = "Erreur dans le téléchargement";
        (<HTMLInputElement>document.getElementById("alert")).hidden = false;
        this.Uploadingstatus = "Erreur dans le téléchargement"
      }).then(async () => {
        await this.strorage.storage.ref(this.imagPath).getDownloadURL()
          .then(async (url) => {
            let geturl = url;
            Constants.imgsrc = geturl;
            Constants.admin.profileImgUrl = Constants.imgsrc
            this.type = "info";
            this.alertText = "Mise à jour du profile ...";
            (<HTMLInputElement>document.getElementById("alert")).hidden = false;
            this.Uploadingstatus = "Mise à jour du profile ...";
            let result = await AdminProfileService.updateAdminProfile(this.http, Constants.admin, Constants.refAdmin.adminUID);
            if (result.status) {
              this.type = "success";
              this.alertText = "Téléchargement et mise à jour términés!";
              (<HTMLInputElement>document.getElementById("alert")).hidden = false;
              this.Uploadingstatus = "Téléchargement et mise à jour términés!";
              this.imageurl = Constants.imgsrc;
            } else {
              this.type = "danger";
              this.alertText = "Erreur dans la mise à jour du profile";
              (<HTMLInputElement>document.getElementById("alert")).hidden = false;
              this.Uploadingstatus = "Erreur dans la mise à jour du profile";
            }
            this.isUploading = false;
            AdminProfileService.updateNameandUrl(this.updateForm.value.nom + " " + this.updateForm.value.prenom, Constants.imgsrc)
            this.isSubmitted = false;
          })

      })


  }
}
