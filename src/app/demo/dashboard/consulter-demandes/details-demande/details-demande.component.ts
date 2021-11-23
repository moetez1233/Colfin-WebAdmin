import { Component, OnInit } from '@angular/core';
import { Demande } from 'src/Models/demande';
import { ConsulterDemandesServices } from '../Consulter-Demandes.Service';
import { Justification } from 'src/Models/Justification';
import { MapServices } from '../../map/MapServices';
import { Service } from 'src/Services/Service';
import { HttpClient } from '@angular/common/http';
import { DemandeTraited, Constants, RolesId } from 'src/Constants/Constants';
import { Agree } from 'src/Models/Agree';
import { MapAgreeService } from '../../map-agree/MapAgreeService';
import { Administration } from 'src/Models/administration';

@Component({
  selector: 'app-details-demande',
  templateUrl: './details-demande.component.html',
  styleUrls: ['./details-demande.component.scss']
})
export class DetailsDemandeComponent implements OnInit {
  url = "https://firebasestorage.googleapis.com/v0/b/webadmin-20dc7.appspot.com/o/Agrees%2Fimages%2Fd16fbd07-c0af-4931-90d7-52b7a5786d34.jpg?alt=media&token=05819b98-19a5-49c9-a80c-7fdc9c2e8ba3"
  window = window;
  demandeTypeSelected: boolean[] = [false, false, false];
  clickedDemande: Demande = new Demande();
  clickedDisplayDemande: Demande = new Demande()
  propertie
  clickedIndex = -1;
  walletType: string[] = ["Without App", "Classique", "Pending Argent", "Argent", "Pending Or", "Or", "Pending Platinuim", "Platinuim"];
  //clickedAgree: Agree = new Agree();
  //clickedDisplayAgree: Agree = new Agree();
  justifyingImage;

  adminCanTraitDemande = false;
  constructor(private http?: HttpClient) {
    if (Constants.admin.rolesGroupe.indexOf(RolesId.Dem_Traitement) !== -1) {
      this.adminCanTraitDemande = true;
    }
  }

  ngOnInit() {
    ConsulterDemandesServices.getData().subscribe(item => {
      if (item.demande && item.displayDemande) {
        this.clickedDemande = item.demande;
        this.clickedDisplayDemande = item.displayDemande;
        this.demandeTypeSelected.fill(false)
        this.demandeTypeSelected[this.clickedDemande.typeDemande] = true;
        this.clickedIndex = 0;
      }

    })
  }

  consultAgree(MapsAndPhoto) {
    MapsAndPhoto.show();
    let justification: Justification = new Justification();
    justification.description = "Cliquer sur le boutton pour voir la position et la photo de l'agréé";
    justification.interface = "Consulter Demandes"
    MapServices.addMarker(
      [
        this.clickedDemande.parametreDemande.ag_latitude,
        this.clickedDemande.parametreDemande.ag_longitude
      ],
      true,
      -1,
      this.clickedDemande.idUser
    );
    let clickedAgree: Agree = new Agree()
    let clickedDisplayAgree: Agree = new Agree()
    
    let clickedDisplayadministration: Administration=new Administration()
    clickedDisplayadministration=new Administration()
    clickedDisplayadministration.id = this.clickedDemande.parametreDemande.id
    console.log(clickedDisplayadministration.id);
    
    //clickedDisplayadministration.activity = this.clickedDemande.parametreDemande.activity
    clickedDisplayadministration.contact = this.clickedDemande.parametreDemande.phoneNumber;
    clickedDisplayadministration.update = this.clickedDemande.parametreDemande.updated;
    clickedDisplayadministration.imagefacade=this.clickedDemande.parametreDemande.image;
    console.log(clickedDisplayadministration.imagefacade);
    



    clickedDisplayadministration.id = this.clickedDisplayDemande.parametreDemande.id
    clickedDisplayAgree.activity = this.clickedDisplayDemande.parametreDemande.activity
    clickedDisplayAgree.phoneNumber = "***************"
    clickedDisplayAgree.updated = this.clickedDisplayDemande.parametreDemande.updated;
    setTimeout(() => { MapAgreeService.setAdministration(clickedDisplayadministration, clickedDisplayadministration) }, 200);
    setTimeout(() => { MapServices.resize() }, 200);
    Service.sendJustification(this.http, justification);
    //clickedDisplayadministration=new Administration()

  }
  removeAllMarkers() {
    MapServices.removeAllMarkers()
  }
  focusOnMarker() {
    MapServices.focusMarker()
  }

  justifying(propertie: string, justificationModal, justification, justifyingImage) {
    justification.value = "";
    justificationModal.show()
    this.propertie = propertie;
    this.justifyingImage = justifyingImage;
  }
  justify(justificationModal, justify) {
    if (justify.value !== "") {
      let justification: Justification = new Justification();
      justification.attribute = this.propertie;
      justification.description = justify.value;
      justification.interface = "Consulter Demandes"
      justification.fromCollection = "demandes";
      justification.idObject = this.clickedDemande.id;
      this.justifyingImage.src = "assets/images/loading.gif";

      Service.sendJustification(this.http, justification).then(result => {
        if (result.status) {
          if (this.clickedDisplayDemande[this.propertie]) {
            this.clickedDisplayDemande[this.propertie] = this.clickedDemande[this.propertie]
          } else if (this.clickedDisplayDemande.parametreDemande[this.propertie]) {
            this.clickedDisplayDemande.parametreDemande[this.propertie] = this.clickedDemande.parametreDemande[this.propertie]
          }
        }

      }).finally(() => {
        this.justifyingImage.src = "assets/images/showInfo.png";
      })
      justificationModal.hide();
    }
  }


  async confirmeDemande() {
    this.clickedIndex = -1;
    let updatedTime = new Date().getTime();
    let idUser = this.clickedDemande.idUser;
    let idDemande = this.clickedDemande.id;
    let dataUser = {}
    let dataDemande = {}
    if (this.demandeTypeSelected[0]) {

      dataUser = {
        approved: 2,
        updated: updatedTime
      }
    } else if (this.demandeTypeSelected[1]) {

      dataUser = {
        wallet: {
          type: this.clickedDemande.parametreDemande.type + 1
        },
        updated: updatedTime
      }
    } else if (this.demandeTypeSelected[2]) {

      dataUser = {
        wallet: {
          type: this.clickedDemande.parametreDemande.type + 1
        },
        updated: updatedTime
      }
    }


    dataDemande = {
      status: DemandeTraited.DEMANDE_ACCEPTED,
      traitedBy: Constants.admin.id,
      updated: updatedTime,
      traitedTime: updatedTime,
    }
    this.clickedDisplayDemande.status = DemandeTraited.DEMANDE_ACCEPTED;
    this.clickedDisplayDemande.traitedBy = "***************"
    this.clickedDemande.traitedBy = Constants.admin.id
    this.clickedDisplayDemande.updated = updatedTime
    this.clickedDisplayDemande.traitedTime = updatedTime
    await ConsulterDemandesServices.confirmeDemande(this.http, idUser, dataUser, idDemande, dataDemande)

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

  async rejectDemande(raison) {
    let updatedTime = new Date().getTime();
    let idUser = this.clickedDemande.idUser;
    let idDemande = this.clickedDemande.id;
    let dataDemande = {
      status: DemandeTraited.DEMANDE_REJECTED,
      traitedBy: Constants.admin.id,
      updated: updatedTime,
      raison: raison,
      traitedTime: updatedTime,
    }
    this.clickedDemande = new Demande();
    this.demandeTypeSelected.fill(false);
    ConsulterDemandesServices.rejectDemande(this.http, idUser, idDemande, dataDemande);
  }

  justifyRefusing(justificationRefuseModal, refuseJustification) {
    if (refuseJustification.value !== "") {
      this.rejectDemande(refuseJustification.value);
      justificationRefuseModal.hide();
    }

  }
  consultPhoto() {
    let justification: Justification = new Justification();
    justification.description = "Cliquer sur le boutton pour voir la photo de vérification";
    justification.interface = "Consulter Demandes"
    Service.sendJustification(this.http, justification);
  }

}
