import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Constants } from 'src/Constants/Constants';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {
  registeForm: FormGroup;
  submitted = false;
  isSubmitted = false;
  type; alertText;

  constructor(private formBuilder: FormBuilder, private AUTH: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.registeForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.isSubmitted) {
      this.isSubmitted = true;
      if (!this.registeForm.invalid) {
        const EMAIL = this.registeForm.value.email;
        const PASSWORD = this.registeForm.value.password;
        this.AUTH.auth.signInWithEmailAndPassword(EMAIL, PASSWORD).then(e => {
          this.submitted = true;
          Constants.redirect = true;
          this.router.navigateByUrl('');
        }).catch(e => {
          switch (e.code) {
            case "auth/invalid-email":
              this.alertText = "Adresse email est invalide"
              break;
            case "auth/user-disabled":
              this.alertText = "Ce compte est désactivé.\nVeuillez contacter votre administrateur pour plus de détails";
              break;
            case "auth/user-not-found":
            case "auth/wrong-password":
              this.alertText = "Adresse email ou mot de passe sont incorrects";
              break;
            default:
              this.alertText = "Une erreur s'est produit. Réessayez dans quelques minutes";
              break;
          }
          this.type = "danger";
          (<HTMLInputElement>document.getElementById("alert")).hidden = false;
          this.isSubmitted = false;
        });
      } else
        this.isSubmitted = false;
    }


  }

}
