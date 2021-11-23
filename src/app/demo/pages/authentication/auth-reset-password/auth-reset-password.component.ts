import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Constants } from 'src/Constants/Constants';

@Component({
  selector: 'app-auth-reset-password',
  templateUrl: './auth-reset-password.component.html',
  styleUrls: ['./auth-reset-password.component.scss']
})
export class AuthResetPasswordComponent implements OnInit {
  type;
  alertText;
  resetForm: FormGroup;
  
  isSubmitted = false;
  constructor(private formBuilder: FormBuilder, private AUTH: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ['', Validators.required],

    });
  }

  onSubmit() {
    if (!this.isSubmitted) {
      if (!this.resetForm.invalid) {
        this.isSubmitted = true;
        const EMAIL = this.resetForm.value.email;
        this.AUTH.auth.sendPasswordResetEmail(EMAIL).then(e => {
          this.type = "success";
          this.alertText = "Email envoyé. Veuillez verifier vos emails";
        }).catch(e => {
          
          switch (e.code) {
            case "auth/invalid-email":
              this.alertText = "Adresse email est invalide"
              break;
            case "auth/user-disabled":
              this.alertText = "Ce compte est désactivé.\nVeuillez contacter votre administrateur pour plus de détails";
              break;
            case "auth/user-not-found":
              this.alertText = "Adresse email n'est pas associé a un compte";
              break;
            default:
              this.alertText = "Une erreur s'est produit. Réessayez dans quelques minutes";
              break;
          }
          this.type = "danger";          
        }).finally(()=>{
          this.isSubmitted = false;
          
          (<HTMLInputElement>document.getElementById("alert")).hidden = false;
        });
      } else
        this.isSubmitted = false;
    }

  }

}
