import { Component, OnInit } from '@angular/core';
import { Agree } from 'src/Models/Agree';
import { MapAgreeService } from '../MapAgreeService';
import { Justification } from 'src/Models/Justification';
import { Service } from 'src/Services/Service';
import { HttpClient } from '@angular/common/http';
import { Administration } from 'src/Models/administration';
import { AngularFireStorage } from '@angular/fire/storage';
import{Categorie} from 'src/Models/Categorie'


@Component({
  selector: 'app-agree-details',
  templateUrl: './agree-details.component.html',
  styleUrls: ['./agree-details.component.scss']
})
export class AgreeDetailsComponent implements OnInit {
 // url = "https://firebasestorage.googleapis.com/v0/b/colfin-00001.appspot.com/o/imagesfa%C3%A7ades%2F50456326-61d2-469d-a357-6e9a3f61ff88?alt=media&token=95715206-1eca-4114-aba8-598f581cdc33"
  window = window;
  clickedDisplayAgree: Agree = new Agree();
  clickedAgree: Agree = new Agree();
  clickedDisplayadministration: Administration = new Administration();
  clickedadministration: Administration = new Administration();
  clickedCategorie: Categorie=new Categorie() ;
  images: string;
  url:string;
  clickedIndex:number=-1;
  categories :Categorie[] =[];
  propertie;
  justifyingImage;
  constructor(
    private http: HttpClient,
    private storage?:AngularFireStorage,

  ) { }

 /* ngOnInit() {
    MapAgreeService.get().subscribe(item => {
      if (item.clickedDisplayAgree && item.clickedAgree) {
        this.clickedDisplayAgree = item.clickedDisplayAgree;
        this.clickedAgree = item.clickedAgree;
      }
    })
  }*/
  ngOnInit() {
    MapAgreeService.get().subscribe(item => {
      if (item.clickedDisplayadministration && item.clickedadministration) {
        this.clickedDisplayadministration = item.clickedDisplayadministration;
        this.clickedadministration = item.clickedadministration;
        console.log("contact : "+this.clickedDisplayadministration.contact);
        
        console.log(this.clickedDisplayadministration.nomfr)
        
        this.affichimage()
        this.categorie()
        /*if (item.clickedDisplayAgree && item.clickedAgree) {
          this.clickedDisplayAgree = item.clickedDisplayAgree;
          this.clickedAgree = item.clickedAgree;
        }*/
       
        
      }
      
    })
  }
  async categorie(){
    this.clickedCategorie=new Categorie()
    this.categories =[]
    await MapAgreeService.getCategories(this.http).then((result)=> {
      let categories :Categorie[]= result.categories;
      let displaycategories :Categorie[]= result.displaycategories;
      this.categories=(categories ? Object.values(categories) :[]);
      //console.log("Categories "+this.categories[0].nomfr)
      //displaycategories =(displaycategories ? Object.values(categories) :[])
      for(let i=0;i<this.categories.length;i++){
        if(this.categories[i].id==this.clickedDisplayadministration.categorie){
          this.clickedCategorie=this.categories[i]
        }
      }
})
  }
   /* ===================== images ===================================== */
  async affichimage(){
    const imgAdminnistration=this.clickedDisplayadministration.imagefacade
    //console.log(imgAdminnistration);
    

    this.images = await this.storage.storage.refFromURL(imgAdminnistration).getDownloadURL()
    this.url=this.images
    console.log(this.url)

  }
  
   /* =====================end  images ===================================== */

  justifying(propertie: string, justificationModal,justificationModal1, justification, justifyingImage) {
    justification.value = "";
    justificationModal.show()
    justificationModal1.show()
    this.propertie = propertie;
    this.justifyingImage = justifyingImage;
  }


  /*justify(justificationModal, justify) {
    if (justify.value !== "") {
      let justification: Justification = new Justification();
      justification.attribute = this.propertie;
      justification.description = justify.value;
      justification.interface = "Consulter agrees"
      justification.fromCollection = "user"
      justification.idObject = this.clickedDisplayAgree.id;
      this.justifyingImage.src = "assets/images/loading.gif";
      Service.sendJustification(this.http, justification).then(result => {
        if (result.status) {
          this.clickedDisplayAgree[this.propertie] = this.clickedAgree[this.propertie]
        }
      }).finally(() => {
        this.justifyingImage.src = "assets/images/showInfo.png";
      })
      justificationModal.hide();
    }
  }*/
  
  justify(justificationModal, justify) {
    if (justify.value !== "") {
      let justification: Justification = new Justification();
      justification.attribute = this.propertie;
      justification.description = justify.value;
      justification.interface = "Consulter agence"
      justification.fromCollection = "user"
      justification.idObject = this.clickedDisplayadministration.id;
      this.justifyingImage.src = "assets/images/loading.gif";
      Service.sendJustification(this.http, justification).then(result => {
        if (result.status) {
          this.clickedDisplayadministration[this.propertie] = this.clickedadministration[this.propertie]
        }
      }).finally(() => {
        this.justifyingImage.src = "assets/images/showInfo.png";
      })
      justificationModal.hide();
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
 
 

}
