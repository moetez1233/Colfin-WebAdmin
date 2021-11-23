import { Component, OnInit } from '@angular/core';

import { User } from 'src/Models/User';
import { Demande } from 'src/Models/demande';
import { Transaction } from 'src/Models/transaction';
import { Notification } from 'src/Models/notification';
import { Justification } from 'src/Models/Justification';
import { Reclamation } from 'src/Models/reclamation';
import{ Claim } from 'src/Models/claim'

import{ chaqueClaim } from 'src/Models/chaqueClaim'//new 

import {Administration} from 'src/Models/administration';
import { MapServices } from 'src/app/demo/dashboard/map/MapServices';


import { Service } from 'src/Services/Service';
import { ConsulterUsersService } from './ConsulterUsersService';
import { ConsulterDemandesServices } from '../consulter-demandes/Consulter-Demandes.Service';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Constants, RolesId } from 'src/Constants/Constants';
import { Tag } from 'src/Models/tags';
import { MapAgreeService } from 'src/app/demo/dashboard/map-agree/MapAgreeService';
import { AngularFireStorage } from '@angular/fire/storage';




@Component({
  selector: 'app-consulter-users',
  templateUrl: './consulter-users.component.html',
  styleUrls: ['./consulter-users.component.scss']
})


export class ConsulterUsersComponent implements OnInit {

  window = window;
  propertie: string = "";
  users: User[] = [];
  listeUsers :User[] =[];
  displayUsers: User[] = [];
  usersColor: string[] = [];
  claims:Claim[]=[];//new
  clickedClaims : Claim[]=[]
  chaqueClaims:Claim[]=[];//new 
  administrations:Administration[] =[];


  clickedUserIndex = -1;
  clickedUser: User = new User();
  //clickeduserSearch :User =new User();
  clickedUserClaim:Claim =new Claim()
  clickedclaimUser:Claim =new Claim()
  clickedAdministration:Administration=new Administration()

  userLastDemandes: Demande[] = [];
  userLastDisplayDemandes: Demande[] = [];
  userLastClaims: Claim[]=[];
  userLastDisplaytClaims:Claim[]=[];
  claimComponent : Claim[]=[]
  CliamUsers:Claim[]=[]


  demandeType: string[] = ["Approuvé", "Identité", " Portefeuille"];
  searching = false;
  verifReclam=false;
  initDems = false;
  initClaim=false;
  initUsers = false;

  adminGotTheRole = false;
  adminCanSeeDemandes = false;
  adminCanSeeReclamation = false;

  claimTags : Tag[]=[];
  
  images: string;
  url:string;
  images1: string;
  url1:string;
  PhoneUser:string;

  justifyingImage;

  constructor(
    private http?: HttpClient,
    private titleService?: Title,
    private storage?:AngularFireStorage,


  ) {
    if (Constants.admin.rolesGroupe.indexOf(RolesId.Users_Consultation) !== -1) {
      this.adminGotTheRole = true;

      if (Constants.admin.rolesGroupe.indexOf(RolesId.consulter_demandes) !== -1) {
        this.adminCanSeeDemandes = true;
      }
      if (Constants.admin.rolesGroupe.indexOf(RolesId.consulter_demandes) !== -1) {
        this.adminCanSeeReclamation = true;
      }
    }
  }
  async ngOnInit() {
    this.titleService.setTitle("Consulter les Utilisateurs");
    if (this.adminGotTheRole) {
      this.getClaim()
      this.initializeUsers()
      //this.getClaim()
      this.getAdministartion()
      
      //this.getClaimComponent()
      //this.getCliamByUserid()
      //this.affichimage()
      
    }
  }

  async initializeUsers() {
    this.initUsers = true;
    //this.users = []
    this.displayUsers = []
    this.clickedUserIndex = -1;
    let result = (await ConsulterUsersService.getUsers(this.http));
    //let listeUsers:User[] = [];
    this.users=[];
    this.listeUsers= Object.values(result.users);
    
      let users = Object.values(result.users);
    let displayUsers = result.displayUsers
    users = (users ? Object.values(users) : [])
    displayUsers = (displayUsers ? Object.values(displayUsers) : [])
    for (let i = 0; i < users.length; i++) {
      displayUsers[i] = this.createNewBlankUser(displayUsers[i]);
      this.usersColor[this.usersColor.length] = "light"
    }
    this.users = Object.values(result.users);;
    this.displayUsers = displayUsers
    this.initUsers = false;
    
    
  }
  

  /*================================ administration =====================================*/
async getAdministartion(){
  this.administrations = []
  //this.searching = false;
  await MapAgreeService.getAdministrations(this.http).then((result) => {
    let administrations: Administration[] = result.administrations;
    //console.log(this.administrations)
    let displayadministrations: Administration[] = result.displayadministrations;
    //console.log("displayadministrations "+this.displayadministrations)
    this.administrations = (administrations ? Object.values(administrations) : []);
    //console.log("administration 1 "+this.administrations)
    //this.displayadministrations = (displayadministrations ? Object.values(displayadministrations) : [])
    //console.log("displayadministration1 "+this.displayadministrations)
       //   console.log("administartion : "+this.administrations[0].id)

  });
}

 
  /* ==================================end administration ===============================*/
  /* ============================= Claim function =========================== */
  
  async getClaim(){
    
        await ConsulterUsersService.getreclamation(this.http).then((result)=> {
          this.claims =[]
          this.chaqueClaims=[]
          let claims :Claim[]= result.claims; 
          //let displayclaims :Claim[]= result.displayclaim;
          this.claims=(claims ? Object.values(claims) :[]);
          // tableau parent 
          
          // for (let i=0;i<this.claims.length;i++) {
          //   //this.chaqueClaims[this.chaqueClaims.length]=this.claims[i];// en met les parents dans un tableau
          //   let chaqueClaims = Object.values(this.claims[i])
          //   for (let j=0;j<chaqueClaims.length;j++){
          //     this.chaqueClaims[this.chaqueClaims.length]=chaqueClaims[j];
          //   }
            
          //   //console.log(this.chaqueClaims[i].idUser);
          // }
          console.log(this.chaqueClaims);
          
      
          for (let i=0;i<this.claims.length;i++) {
            let clickedClaims = this.claims[i] ? Object.values(this.claims[i]) : []
            
            for (let j=0;j<clickedClaims.length;j++) {
              this.CliamUsers[this.CliamUsers.length]=clickedClaims[j]
              
            } 
            }
            console.log(this.CliamUsers[0].satisfaction);

            console.log(this.CliamUsers);
  })
  }
  
  async initializeReclamation() {
    //this.initializing = true;
    //this.clickedIndex = -1;
    await ConsulterUsersService.getChaqueClaim(this.http).then(result => {
      this.claims = result.claims
      console.log(this.claims);
      
      console.log("hello "+this.claims[0].satisfaction);
      
      
      
     
      
    })
  }


  


  /* =============================== end claim functions ======================= */
  /*clickedadministration(userIndex){
    this.clickedAdministration=this.administrations[userIndex]
    for(let i=0;i<this.claims.length;i++){
      //console.log("claim idAdmiistration : "+this.claims[i].idAdministration)
      if(this.claims[i].idAdministration===this.clickedAdministration.id){
        console.log("administrationclicked : "+this.clickedAdministration.id);

      }

    }

    
  
  }*/

  createNewBlankUser(user: User): User {
    user.balance = "***************";
    user.email = "***************";
    user.phoneNumber = "***************";
    return user;
  }

  hoverOnUsers(userIndex) {
    if (userIndex !== this.clickedUserIndex)
      this.usersColor[userIndex] = "dark"
  }

  hoverOffUsers(userIndex) {
    if (userIndex === this.clickedUserIndex) {
      this.usersColor[userIndex] = "primary"
    } else {
      this.usersColor[userIndex] = "light"
    }
  }
  userClicked(userIndex) {
    this.clickedUserClaim = new Claim(); /* traja3ilna tableau fari8 ken l id user != id claim */
    this.claimTags =[];//pour traja3 tableau tag fera8
    //this.clickedAdministration=new Administration
    if (this.clickedUserIndex !== userIndex) {
      this.clickedUser = this.users[userIndex]
      this.PhoneUser=this.clickedUser.phoneNumber
     
      
      this.usersColor.fill('light');
      this.clickedUserIndex = userIndex;
      this.usersColor[userIndex] = "primary"
      this.initializeDemandes();
      this.getCliamByUserid()
      this.affichimage()
      this.myFunction()
      //this.initializeReclamation()
     
     // this.getIduser()

    }
  }
  /* pour l'affichage d'image de l'administration  */
 
   /* end affichage de l'image  */
  
  phoneNumberIsService(phoneNumber: string) {
    if (phoneNumber)
      return Number.parseInt(phoneNumber.substr(4, phoneNumber.length)).toString().length >= 8;
    return false;
  }

 

  async getCliamByUserid(){
    this.initClaim = true
    if (this.clickedUserIndex != -1) {
      this.userLastClaims = [];
      this.userLastDisplaytClaims = [];
      this.clickedAdministration=new Administration

      let result = (await ConsulterUsersService.getClaimByUserId(this.http, this.clickedUser.id))
      let userLastClaims = result.chaqueclaims;
      
      
      
      //console.log(this.clickedUser.id)
      let userLastDisplaytClaims = result.chaqueclaims;
      this.userLastClaims = (userLastClaims ? Object.values(userLastClaims) : [])
      
      //console.log(this.userLastClaims.);
      
      //console.log(userLastClaims[0].idUser);
      //this.claimTags=this.userLastClaims
    
      
      ;
    //  console.log("claim clicked user "+this.clickedUser.id)


      
      this.userLastDisplaytClaims = (userLastDisplaytClaims ? Object.values(userLastDisplaytClaims) : [])
    
      
    }
    this.initClaim = false
  
    
  
  
  }
  clickedReclamUser(index){
    this.claimTags =[];
     this.clickedclaimUser=this.userLastClaims[index]
     this.claimTags=this.userLastClaims[index].tags
     console.log(this.claimTags)
    console.log(this.clickedclaimUser.idAdministration)
   
    for(let i=0;i<this.administrations.length;i++){
      if(this.administrations[i].id==this.clickedclaimUser.idAdministration){
        this.clickedAdministration=this.administrations[i]
      }
    }
    this.affichimgreclam()
   
  }
 
 

  async affichimage(){
    const imgAdminnistration=this.clickedAdministration.imagefacade
    this.images = await this.storage.storage.refFromURL(imgAdminnistration).getDownloadURL()
    this.url=this.images
    console.log(this.url)

  }
  async affichimgreclam(){
    const imgAdminnistration=this.clickedclaimUser.urlImage
    this.images1 = await this.storage.storage.refFromURL(imgAdminnistration).getDownloadURL()
    this.url1=this.images1
    console.log(this.url1)
  }
  async initializeDemandes() {
    this.initDems = true
    if (this.clickedUserIndex != -1) {
      this.userLastDemandes = [];
      this.userLastDisplayDemandes = [];
      let result = (await ConsulterUsersService.getDemandesByUserId(this.http, this.clickedUser.id))
      let userLastDemandes = result.demandes
     //console.log("demande clicked user "+this.clickedUser.id)
      let userLastDisplayDemandes = result.displayDemandes;
      userLastDemandes = (userLastDemandes ? Object.values(userLastDemandes) : [])
      userLastDisplayDemandes = (userLastDisplayDemandes ? Object.values(userLastDisplayDemandes) : [])
      //console.log(("demande clicked"+this.userLastDemandes[0].id));
      
      let i = 0;
      let j = 0;
      while (i < 10 && j < userLastDemandes.length) {
        if (
          userLastDemandes[userLastDemandes.length - j - 1].typeDemande == 0 ||
          userLastDemandes[userLastDemandes.length - j - 1].typeDemande == 1 ||
          userLastDemandes[userLastDemandes.length - j - 1].typeDemande == 2
        ) {
          this.userLastDemandes[this.userLastDemandes.length] = userLastDemandes[userLastDemandes.length - j - 1];
          //console.log("la demande clicked : "+this.userLastDemandes[0].id)
          this.userLastDisplayDemandes[this.userLastDisplayDemandes.length] = this.createNewBlankDemande(userLastDisplayDemandes[userLastDisplayDemandes.length - j - 1]);
          i++;
        }
        j++;
      }
      
    }
    this.initDems = false
  }


  createNewBlankDemande(demande: Demande): Demande {
    let dem = new Demande();
    dem = demande;
    if (dem.parametreDemande.email)
      dem.parametreDemande.email = "***************"
    if (dem.parametreDemande.phoneNumber)
      dem.parametreDemande.phoneNumber = "***************"
    if (demande.status) {
      dem.traitedBy = "***************";
    }
    return dem
  }

  showDemandeDetails(index: number) {
    ConsulterDemandesServices.setDemande(this.userLastDemandes[index], this.userLastDisplayDemandes[index])
  }
  showClaimDetails(index: number) {
    MapAgreeService.setAdministration(this.clickedAdministration[index], this.clickedAdministration[index])
  }
  ReclamAdmininstration(MapsAndPhoto) {
    MapsAndPhoto.show();
    let justification: Justification = new Justification();
    justification.description = "Cliquer sur le boutton pour voir la position et la photo de l'agréé";
    justification.interface = "Consulter Demandes"
    console.log(this.clickedAdministration.Lat)
    MapServices.addMarker(
      [
        this.clickedAdministration.Lat,
        this.clickedAdministration.Long
      
      ],
      true,
      -1,
      this.clickedAdministration.nip
    );
  }
  ReclamAdmininstration2(justificationModal2){
    justificationModal2.show()
  }

  ngAfterViewInit() { 
    
  }

  timestampToDate(timestamp) {
    let date = new Date(timestamp);
    return this.valueOf(date.getDate()) + "/" + this.valueOf(date.getMonth().valueOf() + 1) + "/" + date.getFullYear() + " - " + this.valueOf(date.getHours()) + ":" + this.valueOf(date.getMinutes()) + ":" + this.valueOf(date.getSeconds());
  }

  valueOf(i: number): string {
    if (i < 10) {
      return "0" + i
    }
    return i.toString();
  }

  justifying(propertie: string, justificationModal,justificationModal1, justification, justifyingImage) {
    justification.value = "";
    justificationModal.show()
    justificationModal1.show()
    this.propertie = propertie;
    this.justifyingImage = justifyingImage;
  }
  justify(justificationModal, justify) {
    if (justify.value !== "") {
      let justification: Justification = new Justification();
      justification.attribute = this.propertie;
      justification.description = justify.value;
      justification.interface = "Consulter Utilisateur"
      justification.fromCollection = "user"
      justification.idObject = this.users[this.clickedUserIndex].id;
      this.justifyingImage.src = "assets/images/loading.gif";
      Service.sendJustification(this.http, justification).then(result => {
        if (result.status) {
          this.clickedUser[this.propertie] = this.users[this.clickedUserIndex][this.propertie]
        }
      }).finally(() => {
        this.justifyingImage.src = "assets/images/showInfo.png";
      })
      justificationModal.hide();
    }
  }

  
/* ============================ function searsh ========================== */
/*async Search() {
  let search: string = (<HTMLInputElement>document.getElementById('m-search')).value;
  if (search !== "") {
    this.searching = true;
    this.initializeUsers(search)
  } 
}
verifyingSearch(event) {
  let search: string = (<HTMLInputElement>document.getElementById('m-search')).value;
  if (search == "") {
    this.searching = false;
    this.initializeUsers(search)
  } else {
    if (event.key == "Enter")
      this.Search()
  }
}*/
/* ===============================end searsh =============================== */

/* =============================== recherche autocomplet ======================================== */

 myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
  //document.getElementById("contenuUtlisateur").classList.toggle("hide");
  var x = document.getElementById("contenuUtlisateur");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }

}

 filterFunction() {
  var input,output, filter, ul, li, a, i,administrations,j;
  input = document.getElementById("newsearch");
 // output=document.getElementById("choix");
  filter = input.value.toUpperCase();
  let div = document.getElementById("myDropdown");
  i = div.getElementsByTagName("dt");
  for (j = 0; j < i.length; j++) {
    let txtValue = i[j].textContent || i[j].innerText;
    
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      i[j].style.display = "";
      //output=i[j]
    } else {
      i[j].style.display = "none";
      //output=i[j]
    }
  }
}

/* ================================ end recherche  =============================================== */
}