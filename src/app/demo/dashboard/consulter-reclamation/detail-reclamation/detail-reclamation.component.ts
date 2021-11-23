import { Component, OnInit } from '@angular/core';
import{ Claim } from 'src/Models/claim'
//import{Administration} from 'src/Models/Administrateur'
import{ReclamationsService} from '../reclamations.service'
import { HttpClient } from '@angular/common/http';
import { Constants, RolesId } from 'src/Constants/Constants';
import { Title } from '@angular/platform-browser';
//import { RoleService } from '../roles/RoleService';
import { Tag } from 'src/Models/tags';
import { AngularFireStorage } from '@angular/fire/storage';
import { MapServices } from 'src/app/demo/dashboard/map/MapServices';
import { Administration } from 'src/Models/administration';
import{MapAgreeService } from 'src/app/demo/dashboard/map-agree/MapAgreeService'

@Component({
  selector: 'app-detail-reclamation',
  templateUrl: './detail-reclamation.component.html',
  styleUrls: ['./detail-reclamation.component.scss']
})
export class DetailReclamationComponent implements OnInit {
  adminGotTheRole=false
  clickedClaimParent: Claim = new Claim();
  clickedAdministration: Administration=new Administration();
  administrations:Administration[]=[];
  clickedIndex = -1;
  initializing = false;
  claimTags : Tag[]=[];
  images:string;
  url:string;

  constructor(
    private http?: HttpClient,
    private titleService?: Title,
    private storage?:AngularFireStorage,

  ) {
    if (Constants.admin.rolesGroupe.indexOf(RolesId.admin_Consultation) !== -1) {
      this.adminGotTheRole = true;

    }
  }

  ngOnInit() {
    ReclamationsService.getData().subscribe(item => {
      if (item.claim && item.claim) {
        this.clickedClaimParent = item.claim;
        this.claimTags= this.clickedClaimParent.tags;
        //console.log(this.claimTags)

        console.log(this.clickedClaimParent.idUser)
        this.initializing = true;
        //this.clickedDisplayDemande = item.displayDemande;
        //this.demandeTypeSelected.fill(false)
        //this.demandeTypeSelected[this.clickedDemande.typeDemande] = true;
        this.clickedIndex = 0;
        this.getAdministartion()
      }

    })
    
  }
  async getAdministartion(){
    this.administrations = []
    this.clickedAdministration =new Administration();

    //this.searching = false;
    await MapAgreeService.getAdministrations(this.http).then((result) => {
      let administrations: Administration[] = result.administrations;
      //console.log(this.administrations)
      let displayadministrations: Administration[] = result.displayadministrations;
      //console.log("displayadministrations "+this.displayadministrations)
      this.administrations = (administrations ? Object.values(administrations) : []);
      //console.log(this.administrations[0].id);
      
      //console.log("administration 1 "+this.administrations)
      //this.displayadministrations = (displayadministrations ? Object.values(displayadministrations) : [])
      //console.log("displayadministration1 "+this.displayadministrations)
         //   console.log("administartion : "+this.administrations[0].id)
        
  
    });
    for(let i=0;i<this.administrations.length;i++){
      if(this.administrations[i].id==this.clickedClaimParent.idAdministration){
        this.clickedAdministration=this.administrations[i]
        console.log(this.clickedAdministration.id);

      }
    }
  }
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
  async ReclamAdmininstrationimag(justificationModal1){
    justificationModal1.show();
    const imgAdminnistration=this.clickedClaimParent.urlImage
    //console.log(imgAdminnistration)
    this.images = await this.storage.storage.refFromURL(imgAdminnistration).getDownloadURL()
    this.url=this.images
    //console.log(this.url)
  }
}
