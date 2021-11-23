import { Component, OnInit } from '@angular/core';
import{ Claim } from 'src/Models/claim'
//import{Administration} from 'src/Models/Administrateur'
import{ReclamationsService} from './reclamations.service'
import { HttpClient } from '@angular/common/http';
import { Constants, RolesId } from 'src/Constants/Constants';
import { Title } from '@angular/platform-browser';
import { RoleService } from '../roles/RoleService';
import { Tag } from 'src/Models/tags';
import { AngularFireStorage } from '@angular/fire/storage';
import { MapServices } from 'src/app/demo/dashboard/map/MapServices';
import { Administration } from 'src/Models/administration';
import{MapAgreeService } from 'src/app/demo/dashboard/map-agree/MapAgreeService'
import { ConsulterUsersService } from 'src/app/demo/dashboard/consulter-users/ConsulterUsersService';

import { User } from 'src/Models/User';
import { style } from '@angular/animations';




@Component({
  selector: 'app-consulter-reclamation',
  templateUrl: './consulter-reclamation.component.html',
  styleUrls: ['./consulter-reclamation.component.scss']
})
export class ConsulterReclamationComponent implements OnInit {
  claims:Claim[]=[];
  users:User[]=[];
  claimTags : Tag[]=[];
  initializing = false;

  adminGotTheRole = false;
  adminCanSeeDemandes = false;
  adminCanSeeReclamation = false;
  adminIndex = -1;
  clickedClaimIndex = -1;

  adminsColor = []
  adminRoles: string[] = []
  clickedClaimParent: Claim = new Claim();
  clickedAdministration:Administration=new Administration()
  clickedClaimUser:User=new User()
 administrations:Administration[]=[];
 clickedIndex: number = -1;


  clickedClaims : Claim[]=[]
  chaqueClaims:Claim[]=[];//new
  CliamUsers:Claim[]=[]
  propertie;
  justifyingImage;
  images: string;
  url:string;
  images1: string;
  url1:string;
  icone0:string;
  icone1:string;
  icone2:string;
  icone3:string;
  icone4:string;
  icone5:string;
  icone6:string;
  url2:string;
  img0:string;
  img1:string;
  img2:string;
  img3:string;
  img4:string;
  img5:string;
  img6:string;
  text:string;

  imageclicked:[];
  IconType: string[] = ["assets/images/tags/0.png", "assets/images/tags/1.png", " assets/images/tags/2.png", "assets/images/tags/3.png","assets/images/tags/4.png","assets/images/tags/5.png","assets/images/tags/6.png"];

  Grouptags:string[]=["Fermeture des locaux","Espace non hygienne","Injustice","Corruption","Discrimination","Blocage administratif","Mauvais service"]
icones = new Array()





  constructor(
    private http?: HttpClient,
    private titleService?: Title,
    private storage?:AngularFireStorage,

  ) {
    if (Constants.admin.rolesGroupe.indexOf(RolesId.admin_Consultation) !== -1) {
      this.adminGotTheRole = true;

    }
  }

  async ngOnInit() {
    this.titleService.setTitle("Consulter les reclamation");
   // this.clickedIndex=-1

    this.getClaim();
    this.getAdministartion()
    this.initializeUsers()
  }

  ngAfterViewInit() {
    if (this.adminGotTheRole) {
      
      RoleService.get().subscribe(item => {
        if (item.setAdminRoles) {
          this.adminRoles = item.adminRoles;
        }
      })
    }

  }
  /* ========================= liste des claim ================================== */
  async getClaim(){
    
    await ReclamationsService.getreclamation(this.http).then((result)=> {
      this.claims =[]
      this.chaqueClaims=[]
      let claims :Claim[]= result.claims; 
      //let displayclaims :Claim[]= result.displayclaim;
      this.claims=(claims ? Object.values(claims) :[]);
    
      
  
      for (let i=0;i<this.claims.length;i++) {
        let clickedClaims = this.claims[i] ? Object.values(this.claims[i]) : []
        
        for (let j=0;j<clickedClaims.length;j++) {
          this.CliamUsers[this.CliamUsers.length]=clickedClaims[j]
          
        } 
        }
        //console.log(this.CliamUsers[0].satisfaction);

        //console.log(this.CliamUsers);
})
}
  /* ========================= end liste des claim ================================== */

  /* ========================= liste des administrations  ================================== */

  async getAdministartion(){
  this.administrations = []
  //this.searching = false;
  await MapAgreeService.getAdministrations(this.http).then((result) => {
    let administrations: Administration[] = result.administrations;
    //console.log(administrations)
    let displayadministrations: Administration[] = result.displayadministrations;
    //console.log("displayadministrations "+this.displayadministrations)
    this.administrations = (administrations ? Object.values(administrations) : []);
    //console.log(this.administrations);
    
    //console.log("administration 1 "+this.administrations)
    //this.displayadministrations = (displayadministrations ? Object.values(displayadministrations) : [])
    //console.log("displayadministration1 "+this.displayadministrations)
       //   console.log("administartion : "+this.administrations[0].id)

  });
}
  /* ========================= end liste des administration ================================== */

  /* ========================= chaque claim clicked ================================== */

  ClaimClicked(adminIndex,justificationModal) {
    this.claims=[];
    this.adminsColor.fill('light');
    this.adminsColor[adminIndex] = "primary"
    this.clickedAdministration=new Administration()
    

   // this.clickedUserClaim = new Claim(); /* traja3ilna tableau fari8 ken l id user != id claim */
    this.claimTags =[];//pour traja3 tableau tag fera8
    this.clickedClaimUser= new User()
    if (this.clickedClaimIndex !== adminIndex) {
      this.clickedIndex=adminIndex  
      this.initializing=true;
      this.clickedClaimParent = this.CliamUsers[adminIndex]
      //console.log(this.clickedClaimParent.idUser)

      

      for(let i=0;i<this.administrations.length;i++){
        if(this.administrations[i].id==this.clickedClaimParent.idAdministration){
          this.clickedAdministration=this.administrations[i]
          //console.log(this.clickedAdministration.nomfr);
          
        }
      }
     // console.log(this.clickedAdministration.imagefacade)
      for(let i=0;i<this.users.length;i++){
        if(this.users[i].id==this.clickedClaimParent.idUser){
          this.clickedClaimUser=this.users[i]
          
          
        }
      }
      ReclamationsService.setReclamation(this.clickedClaimParent, this.clickedClaimParent);

      
      this.claimTags= this.clickedClaimParent.tags;
      /** ============================= icone tages ======================================= */
       for(let i=0;i<this.claimTags.length;i++){
         
     
       /*if(this.claimTags[i]==this.Grouptags[0])
      {this.icone0=this.IconType[0]
            //console.log(this.icone0)
            }

      else  if(this.claimTags[i]==this.Grouptags[1])
      {this.icone1=this.IconType[1]
      //console.log(this.icone1)
      }
       else  if(this.claimTags[i]==this.Grouptags[2])
     {  this.icone2=this.IconType[2]
      //console.log(this.icone2)
      }
       else  if(this.claimTags[i]==this.Grouptags[3])
      { this.icone3=this.IconType[3]
      //console.log(this.icone3)
      }
       else  if(this.claimTags[i]==this.Grouptags[4])
      { this.icone4=this.IconType[4]
      //console.log(this.icone4)
      }
       else  if(this.claimTags[i]==this.Grouptags[5])
      { this.icone5=this.IconType[5]
      //console.log(this.icone5)
      }*/
       /*else  if(this.claimTags[i]==this.Grouptags[6])
      { this.icone6=this.IconType[6]
      //console.log(this.icone6)
       }*/
      
      
         
       
    

    

    }
     
     //this.icones = Array(this.icone0,this.icone1, this.icone2,this.icone3,this.icone4,this.icone5,this.icone6);
    
    //console.log(this.icones)
    
      /* =============================== end icone tags =================================== */
      //console.log("tags :"+this.claimTags[1])

      //console.log(this.clickedClaimParent);
      
     // document.getElementById('valeur1').innerHTML="**********";
      
      this.adminsColor.fill('light');
      this.clickedClaimIndex = adminIndex;
      this.adminsColor[adminIndex] = "primary"
      //this.initializeDemandes();
    }
    this.affichimage()
    this.affichimageAgence()
    this.iconeTags()
    /*
    var text =document.getElementById('text').style.marginRight='12%';
    var text =document.getElementById('text').style.marginLeft='12%';


    
     
  
      setTimeout(
        () => {
     var text =document.getElementById('text').style.marginRight='1%';
     var text =document.getElementById('text').style.marginLeft='1%';


        }, 3000
        
        
      );*/
     
      
    
    
  }
    /* ========================= end chaque claim clicked  ================================== */

  /* ========================= affichage d'image de claim  ================================== */

  async affichimage(){
    const imgAdminnistration=this.clickedClaimParent.urlImage
    //console.log(imgAdminnistration)
    this.images = await this.storage.storage.refFromURL(imgAdminnistration).getDownloadURL()
    this.url=this.images
    //console.log(this.url)

  }
    /* ========================= end affichage d'image de claim  ================================== */
  /* ========================= affichage d'image d'admiistration ================================== */

  async affichimageAgence(){
    const imgAdminnistration1=this.clickedAdministration.imagefacade
    //console.log(imgAdminnistration)
    this.images1 = await this.storage.storage.refFromURL(imgAdminnistration1).getDownloadURL()
    this.url1=this.images1
    //console.log(this.url1)

  }
    /* ========================= end affichage d'image d'admiistration ================================== */

  ReclamAdmininstration(justificationModal) {
    justificationModal.show();
    //let justification: Justification = new Justification();
    //justification.description = "Cliquer sur le boutton pour voir la position et la photo de l'agréé";
    //justification.interface = "Consulter Demandes"
    //console.log(this.clickedAdministration.Lat)
    MapServices.addMarker(
      [
        this.clickedClaimParent.position.lat,
        this.clickedClaimParent.position.lon,
      
      ],
      true,
      -1,
      this.clickedClaimParent.idUser
    );
   

   
  }
  ReclamAdmininstration1(justificationModal1){
    justificationModal1.show();
  }
  ReclamAdmininstration2(MapsAndPhoto){
    MapsAndPhoto.show();
    MapServices.addMarker(
      [
        this.clickedAdministration.Lat,
        this.clickedAdministration.Long,
      
      ],
      true,
      -1,
      this.clickedAdministration.nip
    );
  }
  ReclamAdmininstration3(justificationModal3){
    justificationModal3.show();
    
  }

  hoverOn(adminIndex) {
    if (adminIndex !== this.adminIndex)
      this.adminsColor[adminIndex] = "dark"
  }
  
    
  
  
  
   mouseOut() {
    document.getElementById("demo").style.color = "black";
  }

  hoverOff(adminIndex) {
    if (adminIndex === this.adminIndex) {
      this.adminsColor[adminIndex] = "primary"
    } else {
      this.adminsColor[adminIndex] = "light"
    }
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
    //MapsAndPhoto.show()
    this.propertie = propertie;
    this.justifyingImage = justifyingImage;
  }



  /* ==============================  user function ========================================= */
  async initializeUsers(){
    
    let result = (await ConsulterUsersService.getUsers(this.http));
    //let listeUsers:User[] = [];
    this.users=[];
   
    
      let users = Object.values(result.users);
    let displayUsers = result.displayUsers
    users = (users ? Object.values(users) : [])
    displayUsers = (displayUsers ? Object.values(displayUsers) : [])
  
    this.users = Object.values(result.users);
    this.clickedClaimUser=new User()

   // console.log(this.users[0].phoneNumber)
   
    //console.log(this.clickedClaimUser.id)
  }

  /* ================================ end user function ===================================== */
  /* ================================ Icone Tags ============================================ */
  iconeTags(){
    this.icones=new Array()
   // this.tabes=new Array()
    
    for(let i=0;i<this.claimTags.length;i++){
     
      if(this.claimTags[i]==this.Grouptags[0])
      {this.icone0=this.IconType[0]
            console.log(this.icone0)
            this.icones.push(this.IconType[0]);
            }

      else  if(this.claimTags[i]==this.Grouptags[1])
      {this.icone1=this.IconType[1]
      this.icones.push(this.IconType[1]);
      console.log(this.icone1)}
       else  if(this.claimTags[i]==this.Grouptags[2])
     {  this.icone2=this.IconType[2]
     this.icones.push(this.IconType[2]);
      console.log(this.icone2)}
       else  if(this.claimTags[i]==this.Grouptags[3])
      { this.icone3=this.IconType[3]
      this.icones.push(this.IconType[3]);
      console.log(this.icone3)}
       else  if(this.claimTags[i]==this.Grouptags[4])
      { this.icone4=this.IconType[4]
      this.icones.push(this.IconType[4]);
      console.log(this.icone4)}
       else  if(this.claimTags[i]==this.Grouptags[5])
      { this.icone5=this.IconType[5]
      this.icones.push(this.IconType[5]);
      console.log(this.icone5)}
       else  if(this.claimTags[i]==this.Grouptags[6])
      { this.icone6=this.IconType[6]
      this.icones.push(this.IconType[6]);
      console.log(this.icone6)}

    
    

    }
    console.log(this.icones)
    //this.tabes=this.icones
   /* document.getElementById("0").innerHTML = this.icones[0];
document.getElementById("1").innerHTML = this.icones[1];
document.getElementById("2").innerHTML = this.icones[2];
document.getElementById("3").innerHTML = this.icones[3];
document.getElementById("4").innerHTML = this.icones[4];
document.getElementById("5").innerHTML = this.icones[5];
document.getElementById("6").innerHTML = this.icones[6];
*/
this.img0 = this.icones[0];
this.img1 = this.icones[1];
this.img2 = this.icones[2];
this.img3 = this.icones[3];
this.img4 = this.icones[4];
this.img5= this.icones[5];
this.img6 = this.icones[6];

     //this.icones = Array(this.icone0,this.icone1, this.icone2,this.icone3,this.icone4,this.icone5,this.icone6);
    //console.log(this.icones)
    
  
    
  }
  /* ================================= end icone tags========================================= */
  

}
