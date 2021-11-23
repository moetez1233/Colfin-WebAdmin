import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Demande } from 'src/Models/demande';
import { Title } from '@angular/platform-browser';
import { ConsulterDemandesServices } from './Consulter-Demandes.Service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consulter-demandes',
  templateUrl: './consulter-demandes.component.html',
  styleUrls: ['./consulter-demandes.component.scss']
})

export class ConsulterDemandesComponent implements OnInit {

  initializing = true;
  demandeType: string[] = ["Approuvé", "Identité", " Portefeuille", "Plus Proche Agréé"];
  demandesColor: string[] = [];
  clickedIndex = -1;
  demandes: Demande[] = [];
  displayDemandes: Demande[] = [];
  propertie: any;
  window = window;
  constructor(
    private titleService?: Title,
    private http?: HttpClient,
  ) { }

  async ngOnInit() {
    this.titleService.setTitle("Consulter les Demandes");
    //this.firebase.list("demandes").snapshotChanges().subscribe(async () => {
    this.initializeDemandes()
    // })
  }
  async initializeDemandes() {
    this.initializing = true;
    this.clickedIndex = -1;
    await ConsulterDemandesServices.getDemandes(this.http).then(result => {
      this.demandes = result.demandes
      console.log("demande id "+this.demandes[0].typeDemande)
      this.displayDemandes = result.displayDemandes
      this.demandesColor = []
      for (let i = 0; i < this.demandes.length; i++) {
        this.displayDemandes[i] = this.createNewBlankDemande(this.displayDemandes[i]);
        this.demandesColor[i] = "light"
      }
    })
    this.initializing = false;
  }

  ngAfterViewInit() { }

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


  async demClicked(demindex: number) {
    this.demandesColor.fill('light')
    this.demandesColor[demindex] = "primary";
    this.clickedIndex = demindex;
    let clickedDisplayDemande = this.displayDemandes[demindex];
    let clickedDemande = this.demandes[demindex]
    document.getElementById("mydemandliste").style.height = "342px";
    ConsulterDemandesServices.setDemande(clickedDemande, clickedDisplayDemande);
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

  hoverOn(demindex) {
    if (demindex !== this.clickedIndex)
      this.demandesColor[demindex] = "dark"
  }

  hoverOff(demindex) {
    if (demindex === this.clickedIndex) {
      this.demandesColor[demindex] = "primary"
    } else {
      this.demandesColor[demindex] = "light"
    }
  }





}
