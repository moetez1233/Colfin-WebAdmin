import { Component, OnInit, ɵConsole } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { MapAgreeService } from './MapAgreeService';
import { Agree } from 'src/Models/Agree';
import { MapServices } from '../map/MapServices';
import { Constants, RolesId } from 'src/Constants/Constants';
import {Administration} from 'src/Models/administration';
import{Categorie} from 'src/Models/Categorie'
import { Location } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';





@Component({
  selector: 'app-map-agree',
  templateUrl: './mapAgree.component.html',
  styleUrls: ['./mapAgree.component.scss']
})

export class MapAgreeComponent implements OnInit {
  //url = "https://firebasestorage.googleapis.com/v0/b/colfin-00001.appspot.com/o/imagesfa%C3%A7ades%2F29f313f3-3c88-44b7-8318-75fb6230a447?alt=media&token=1d615511-a4f0-431e-81ed-edcd1be1ce63"
url:string;
  images: string;
  window = window
  agrees: Agree[] = [];
  displayAgrees: Agree[] = [];
  administrations:Administration[] =[];
  displayadministrations :Administration[]=[];
  categories :Categorie[] =[];
  displaycategories:Categorie[]=[];
  searching = false;
  /* autocomplet  */
  clickedNomfre: Administration = new Administration();
  ClikedCat:Administration=new Administration()
  clickedDisplayadministration:Administration=new Administration()
  clickNomfrCategorie:Categorie =new Categorie();

  adminsColor = []
  administrationIndex = -1;
  categorieIndex =-1;
  deuxiemeClick=0;
  nip:string;
  Nomfrcategori:string;
   //x = document.getElementById("myDialog");
  // x:symbol;
  /* end variables autocomplet  */
  
  
  clickedIndex: number = -1;
  clickedSearch:number=-1

  adminGotTheRole = false
  constructor(
    private Location: Location,
    private http?: HttpClient,
    private titleService?: Title,
    private storage?:AngularFireStorage,
    
  ) {
    if (Constants.admin.rolesGroupe.indexOf(RolesId.consulter_agree) !== -1) {
      this.adminGotTheRole = true;
    }
  }
  
  

  /*ngOnInit() {
    this.titleService.setTitle("Consulter les Agréés");
    //  this.firebase.list("agrees").snapshotChanges().subscribe(async () => {
    this.initializeAgrees()
    //this.initializeAdministration()
   // this.hello()
    // })
    MapAgreeService.get().subscribe(item => {
      if (item.agreeClicked) {
        this.agreeClick(item.index, item.marker);
      }
    })
  }*/
  
 
 ngOnInit() {
  this.titleService.setTitle("Consulter les Administrations");
  //  this.firebase.list("agrees").snapshotChanges().subscribe(async () => {
    //var x = document.getElementById("mypopup");
    //x.style.display = "none";
 this.initializeAdministration()
}
 


  // agreeClick(index, marker) {
  //   let clickedAgree = this.displayAgrees[index];
  //   this.clickedIndex = index
  //   setTimeout(() => { MapAgreeService.setAgree(this.agrees[index], this.displayAgrees[index]); }, 200);

  //   MapServices.setNewView(
  //     [
  //       clickedAgree.Lat,
  //       clickedAgree.Long,
  //     ],
  //     20,
  //     marker
  //   )
  //   this.resize();

  // }
 /* async initializeAgrees() {
  this.agrees = []
  await MapAgreeService.getAgrees(this.http).then((result) => {
    let agrees: Agree[] = result.agrees;
    let displayAgrees: Agree[] = result.displayAgrees;
    this.agrees = (agrees ? Object.values(agrees) : []);
    displayAgrees = (displayAgrees ? Object.values(displayAgrees) : [])
    for (let i = 0; i < this.agrees.length; i++) {
      this.displayAgrees[i] = this.createNewBlankAgree(displayAgrees[i]);
      console.log("hello")
        console.log(this.agrees[i].Long)
        MapServices.addMarker(
          [
            this.agrees[i].Lat,
            this.agrees[i].Long,
          ],
          false,
          i
        )
      }
    });
}*/
 

  
  createNewBlankAgree(agree: Agree) {
    agree.id = "***************";
    return agree;
  }
/*================================== les administrations ==============================  */

administrationClick(index, marker,x) {
  let clickedAdministration = this.administrations[index];
  this.clickedIndex = index
  setTimeout(() => { MapAgreeService.setAdministration(this.administrations[index], this.administrations[index]); }, 200);

  MapServices.setNewView(
    [
      clickedAdministration.Lat,
      clickedAdministration.Long,
    ],
    20,
    marker
  )
  this.resize();
  x = document.getElementById("myDialog") ;
  x.show(); 
 

}
async initializeAdministration(){
  this.administrations = []
  this.searching = false;
  await MapAgreeService.getAdministrations(this.http).then((result) => {
    let administrations: Administration[] = result.administrations;
    //console.log(this.administrations)
    let displayadministrations: Administration[] = result.displayadministrations;
    //console.log("displayadministrations "+this.displayadministrations)
    this.administrations = (administrations ? Object.values(administrations) : []);
    this.displayadministrations = (displayadministrations ? Object.values(displayadministrations) : [])
  });
  //console.log(" l'appel du Categories ")
  this.categories =[]
      await MapAgreeService.getCategories(this.http).then((result)=> {
        let categories :Categorie[]= result.categories;
        let displaycategories :Categorie[]= result.displaycategories;
        this.categories=(categories ? Object.values(categories) :[]);
        //console.log("Categories "+this.categories[0].nomfr)
        displaycategories =(displaycategories ? Object.values(categories) :[])
 })
  
    //this.searching = false;
    let s=0;
    for (let i = 0; i < this.administrations.length; i++) {
      //console.log("Categories "+this.administrations[i].Lat)
    
        MapServices.addMarker(
          [
            this.administrations[i].Lat,
            this.administrations[i].Long,
          ],
          false,
          i,
          this.administrations[i].nip
          
        )

     
      
       
      /*  MapServices.setNewView(
          [
            this.administrations[i].Lat,
            this.administrations[i].Long,
          ],
          20,
          i
        )  */   
  }
    
  
  /*else{
    console.log("hello")
    //this.searching = true;
    MapServices.removeAllMarkers(
        
      )
    for(let i=0;i<this.administrations.length;i++){
      //console.log(this.categories[i].nomfr)
      if(this.administrations[i].nomfr==search){
        console.log(this.administrations[i].nomfr)
        this.clickedIndex = i
          setTimeout(() => { MapAgreeService.setAdministration(this.administrations[i], this.displayadministrations[i]); }, 200);
         MapServices.addMarker(
          [
                 this.administrations[i].Lat,
                this.administrations[i].Long,
          ],
          false,
           i
           )
           MapServices.setNewView(
            [
                   this.administrations[i].Lat,
                  this.administrations[i].Long,
            ],
            20,
             i
             )
      }
      
    }
  } */
}
/*
async searchagence(search?:string){
  this.administrations = []
  this.searching = true;
  await MapAgreeService.getAdministrations(this.http).then((result) => {
    let administrations: Administration[] = result.administrations;
    let displayadministrations: Administration[] = result.displayadministrations;
    this.administrations = (administrations ? Object.values(administrations) : []);
    this.displayadministrations = (displayadministrations ? Object.values(displayadministrations) : [])
  });
  console.log("hello")
    //this.searching = true;
    MapServices.removeAllMarkers(
        
      )
      let r=0;
    for(let i = 0; i < this.administrations.length; i++){
      r=r+1
      console.log("r= "+r)
      //console.log(this.categories[i].nomfr)
      if(this.administrations[i].nomfr==search){
        this.clickedIndex = -1
         // setTimeout(() => { MapAgreeService.setAdministration(this.administrations[i], this.displayadministrations[i]); }, 200);
      }
      console.log("r1= "+r)
      MapServices.addMarker(
          [
                 this.administrations[i].Lat,
                this.administrations[i].Long,
          ],
          false,
           i
           )
           MapServices.setNewView(
            [
                   this.administrations[i].Lat,
                  this.administrations[i].Long,
            ],
            15,
             i
             )
      
      
      
    }
}*/

/*refreshPage(numbersearch?:number,search?:string) {
  if(numbersearch===2){
    this.searchagence(search)
    //window.location.reload();
  }else{
  
    //this.initializeAdministration()
    window.location.reload();

  }
  
}*/
/*createNewBlankAdministration(administration: Administration) {
  administration.id = "***************";
  return administration;
}*/
/* ================================end administration ===============================  */

/* ================================= Categorie Function ======================== */
/*async getCategories(){
  this.categories =[]
      await MapAgreeService.getCategories(this.http).then((result)=> {
        let categories :Categorie[]= result.categories;
        let displaycategories :Categorie[]= result.displaycategories;
        this.categories=(categories ? Object.values(categories) :[]);
        displaycategories =(displaycategories ? Object.values(categories) :[])
})
}


/* =================================== end Categorie function ================== */

/* ============================ function searsh ========================== */
async Search() {
  let numbersearch=0;
  
  let search: string = (<HTMLInputElement>document.getElementById('m-search')).value;
  console.log(search.length)
  if (search.length===0) {
    console.log(search.length)
    this.searching = false;
    this.initializeAdministration()
    numbersearch=1;
  } else{
    //this.searching = true;
    //console.log(search.length)
    //this.searchagence(search)
    numbersearch=2;
    
  }
}
verifyingSearch(event) {
  let search: string = (<HTMLInputElement>document.getElementById('m-search')).value;
  if (search == "") {
    this.searching = false;
    this.initializeAdministration()
  } else {
    if (event.key == "Enter")
      this.Search()
  }
}
/* ===============================end searsh =============================== */



  ngAfterViewInit() {
   // let search: string = (<HTMLInputElement>document.getElementById('m-search')).value;
    this.resize()
    this.initializeAdministration()
    // })
    MapAgreeService.get().subscribe(item => {
      if (item.administrationClicked) {
        this.administrationClick(item.index, item.marker,item.x);
      }
    })
  }

  resize() {
    setTimeout(() => { MapServices.resize() }, 400);
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
  numbersearch(numbersearch?:number){
    //if()
  }
/* test autocomplet */
myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
 // console.log('hello')
}
filterFunctionAdministration() {
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
filterFunctionCategorie() {
  var input,output, filter, ul, li, a, i1,administrations,j;
  input = document.getElementById("newsearch");
 // output=document.getElementById("choix");
  filter = input.value.toUpperCase();
  let div = document.getElementById("myDropdown");
  i1 = div.getElementsByTagName("dt");
  for (j = 0; j < i1.length; j++) {
    let txtValue = i1[j].textContent || i1[j].innerText;
    
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      i1[j].style.display = "";
      //output=i[j]
    } else {
      i1[j].style.display = "none";
      //output=i[j]
    }
  }
  document.getElementById("myDropdown").classList.toggle("hide");

}
filterFunctionAdress() {
  var input,output, filter, ul, li, a, i2,administrations,j;
  input = document.getElementById("newsearch");
 // output=document.getElementById("choix");
  filter = input.value.toUpperCase();
  let div = document.getElementById("myDropdown");
  i2 = div.getElementsByTagName("dt");
  for (j = 0; j < i2.length; j++) {
    let txtValue = i2[j].textContent || i2[j].innerText;
    
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      i2[j].style.display = "";
      //output=i[j]
    } else {
      i2[j].style.display = "none";
      //output=i[j]
    }
  }
}
hoverOn(administrationIndex) {
  if (administrationIndex !== this.administrationIndex)
    this.adminsColor[administrationIndex] = "dark"
}

hoverOff(administrationIndex) {
  if (administrationIndex === this.administrationIndex) {
    this.adminsColor[administrationIndex] = "primary"
  } else {
    this.adminsColor[administrationIndex] = "light"
  }
}
/*verifClick(index){
  if(this.deuxiemeClick==0){
    this.clickedNomfr(index)
  }else{
   // this.ReclickedNomfr(index)
  }
  this.deuxiemeClick=1;
}*/
/* ===================================================== click sur your choix d'agence ============================================ */
async clickedNomfr(index){
  //this. categorieIndex=index
  this.clickedSearch=index
  this.clickedNomfre = new Administration()
  var input;
  this.adminsColor.fill('light');
  this.adminsColor[index] = "primary"
  this.administrationIndex = index
  this.clickedNomfre = this.administrations[index];
  //this.clickedDisplayadministration=this.administrations[index]
  this.Nomfrcategori=this.clickedNomfre.nip
  console.log(this.clickedNomfre.nomfr)
  for(let i=0;i<this.administrations.length;i++){
    if(this.clickedNomfre.categorie==this.categories[index].id){
      this.clickNomfrCategorie=this.categories[index]
      console.log(this.clickNomfrCategorie.id)
      console.log(this.administrations[i].categorie);}}
      /* affiche l'image  */
      const imgAdminnistration=this.clickedNomfre.imagefacade
      this.images = await this.storage.storage.refFromURL(imgAdminnistration).getDownloadURL()
      this.url=this.images
      console.log(this.url)
      /* end code affiche image  */
 this.myFunction()
  MapServices.removeAllMarkers(
        
    )
  MapServices.addMarker(
    [
           this.clickedNomfre.Lat,
          this.clickedNomfre.Long,
    ],
    false,
    index,
    this.clickedNomfre.nip
     );

     MapServices.setNewView(
      [
             this.clickedNomfre.Lat,
            this.clickedNomfre.Long,
      ],
      20,
     
       );
       MapServices.resize()
      /* var x = document.getElementById("mypopup");
       if (x.style.display === "none") {
         x.style.display = "block";
       } */

}

async clickedcaegories(index){
  this.clickedSearch=index
  this.adminsColor.fill('light');
  this.adminsColor[index] = "primary"
  this.categorieIndex = index
  console.log(this.categories[index].id)
 
  //console.log(this.clickNomfrCategorie.id)
  this.Nomfrcategori=this.categories[index].nomfr
  for(let i=0;i<this.administrations.length;i++){
    if(this.administrations[i].categorie==this.categories[index].id){
      this.clickNomfrCategorie=this.categories[index]
      console.log(this.clickNomfrCategorie.id)
      console.log(this.administrations[i].categorie);
      

      
      index=i;
      console.log(index)
      this.ClikedCat=this.administrations[index]
         /* affiche l'image  */
         const imgAdminnistration=this.administrations[index].imagefacade
         this.images = await this.storage.storage.refFromURL(imgAdminnistration).getDownloadURL()
         this.url=this.images
         console.log(this.url)
         /* end code affiche image  */
      
     console.log('hello '+this.administrations[i].nomfr)
      //this.myFunction()
      document.getElementById("myDropdown").classList.toggle("hide");
      console.log(this.administrations[i].Lat)
      console.log(this.administrations[i].Long)
      MapServices.removeAllMarkers(
        
        )

  MapServices.addMarker(
    [
      this.ClikedCat.Lat,
      this.ClikedCat.Long,
    ],
    false,
    index,
    this.ClikedCat.nip
     )
    MapServices.setNewView(
      [
        this.administrations[i].Lat,
        this.administrations[i].Long,
      ],
      20,
     // index,
      //marker
       );
       MapServices.resize()}}
   


}
VerifPopup(justificationModal1){
  if(this.clickedSearch==-1){
    alert("vous devez chercher  votre agence au début ")
  }else{
    justificationModal1.show()

  }
}
/*vuluesearch(){
  if(this. categorieIndex!=-1){
    this.Nomfrcategori= this.clickedNomfre.nip 


   
  }
}*/
/* ================= recherche par adress ========================================= */
/*
clickedadress(index){
  this.adminsColor.fill('light');
  this.adminsColor[index] = "primary"
  this.administrationIndex = index
  this.clickedNomfre = this.administrations[index];
  this.myFunction()
  MapServices.addMarker(
    [
           this.clickedNomfre.Lat,
          this.clickedNomfre.Long,
    ],
    false,
    index
     )
    MapServices.setNewView(
      [
             this.clickedNomfre.Lat,
            this.clickedNomfre.Long,
      ],
      20,
     // index,
      //marker
       );
       MapServices.resize()

}
*/

/* ================================================== end click agence functions ============================================================ */
 
 close(){

  this.clickedIndex = -1
}

/* affiche img */
async affichImg(){
  // const storageRef = firebase.storage().ref().child('/imagesfaçades');
  //   storageRef.getDownloadURL().then(url => this.image = url);
  //   console.log("storegeRef : "+this.image)
  for(let i=0;i<this.administrations.length;i++){
    const imgAdminnistration=this.administrations[i].imagefacade
    this.images = await this.storage.storage.refFromURL(imgAdminnistration).getDownloadURL()
       console.log("storegeRef : "+this.images)
    //const imgAdminnistration4=this.administrations[4].imagefacade
    //var res1 = imgAdminnistration.substr(50);
  }

    //this.url = "https://firebasestorage.googleapis.com/v0/b/colfin-00001.appspot.com/o/imagesfa%C3%A7ades%2F"+res1+"?alt=media&token=1d615511-a4f0-431e-81ed-edcd1be1ce63"
//console.log("url image = "+this.url)
//return this.url
}
clickedMarkcer(justificationModal1){
  //this.clickedDisplayadministration=this.administrations[index]
  justificationModal1.show()

}
showimage(justificationModal2){
  justificationModal2.show()
}
PopupAgence(x){
   x = document.getElementById("myDialog");
  x.close()
}

  
}
