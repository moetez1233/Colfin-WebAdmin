import { Component, OnInit } from '@angular/core';
import { Administrateur } from 'src/Models/Administrateur';
import { Reference } from 'src/Models/Ref';
import { Role } from 'src/Models/Role';
import { Constants, RolesId } from 'src/Constants/Constants';
import { RoleService } from '../roles/RoleService';
import { HttpClient } from '@angular/common/http';
import { AdminProfileService } from '../admin-profile/Admin-Profile-Service';
import { AdminListService } from './AdminListService';
import { Justification } from 'src/Models/Justification';
import { Service } from 'src/Services/Service';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.scss']
})
export class AdminListComponent implements OnInit {
  admins: Administrateur[] = [];
  listeadmins :Administrateur[] =[];
  refs: Reference[] = []
  displayAdmins: Administrateur[] = [];
  displayRefs: Reference[] = []
  searching = false;
  isLoading = true;
  adminRoles: string[] = []
  type = "";
  alertText = "";
  adminIndex = -1;
  clickedAdmin: Administrateur = new Administrateur();
  clickedRef: Reference = new Reference()
  window = window;
  adminsColor = []
  propertie;
  justifyingImage
  table: string;

  adminGotTheRole = false;
  adminCanChangeRoles = false;
  adminCanBlockUnblock = false;
  constructor(
    private http: HttpClient,
    private titleService?: Title,
  ) {
    if (Constants.admin.rolesGroupe.indexOf(RolesId.admin_Consultation) !== -1) {
      this.adminGotTheRole = true;

    }
  }

  verifyRoles() {
    if (Constants.admin.rolesGroupe.indexOf(RolesId.Edit_Admin_Roles) !== -1) {
      this.adminCanChangeRoles = true;
    }
    if (Constants.admin.rolesGroupe.indexOf(RolesId.block_unblock_admin) !== -1) {
      this.adminCanBlockUnblock = true
    }
  }

  async ngOnInit() {
    this.titleService.setTitle("Consulter les Administrateurs");
  }

  ngAfterViewInit() {
    if (this.adminGotTheRole) {
      this.getAllAdmin();
      RoleService.get().subscribe(item => {
        if (item.setAdminRoles) {
          this.adminRoles = item.adminRoles;
        }
      })
    }

  }

  initialize(adminIndex) {
    this.adminRoles = []
    if (!this.admins[adminIndex].rolesGroupe)
      this.admins[adminIndex].rolesGroupe = [];
  }

  /*async getAllAdmin(search?:string) {
    let result = (await AdminListService.getAdminsAndRefs(this.http));
    if (result.status) {
      if(!this.searching){}
      this.admins = Object.values(result.administrateurs);
      this.refs = Object.values(result.references)
      this.displayAdmins = Object.values(result.displayAdministrateurs)
      this.displayRefs = Object.values(result.displayReferences)
      this.refs.splice(this.getAdminIndex(Constants.admin, this.admins), 1);
      this.displayAdmins.splice(this.getAdminIndex(Constants.admin, this.admins), 1);
      this.displayRefs.splice(this.getAdminIndex(Constants.admin, this.admins), 1);
      this.admins.splice(this.getAdminIndex(Constants.admin, this.admins), 1);
      for (let i = 0; i < this.displayAdmins.length; i++) {
        this.displayAdmins[i] = this.createNewBlankAdmin(i).admin;
        this.displayRefs[i] = this.createNewBlankAdmin(i).ref;
        this.adminsColor[i] = 'light'
      }
      this.isLoading = false;
    }


  }*/
  async getAllAdmin(search?:string) {
    let result = (await AdminListService.getAdminsAndRefs(this.http));
    if (result.status) {
      
      this.admins=[];
      this.listeadmins = Object.values(result.administrateurs);
      if(!this.searching){
        

        this.admins=Object.values(result.administrateurs);
        this.refs = Object.values(result.references)
        this.displayAdmins = Object.values(result.displayAdministrateurs)
        this.displayRefs = Object.values(result.displayReferences)
        this.refs.splice(this.getAdminIndex(Constants.admin, this.admins), 1);
        this.displayAdmins.splice(this.getAdminIndex(Constants.admin, this.admins), 1);
        this.displayRefs.splice(this.getAdminIndex(Constants.admin, this.admins), 1);
        this.admins.splice(this.getAdminIndex(Constants.admin, this.admins), 1);
        for (let i = 0; i < this.displayAdmins.length; i++) {
          this.displayAdmins[i] = this.createNewBlankAdmin(i).admin;
          this.displayRefs[i] = this.createNewBlankAdmin(i).ref;
          this.adminsColor[i] = 'light'
        }
      }else{
        for(let i=0;i<this.listeadmins.length;i++){
          if(this.listeadmins[i].userName==search){
            this.admins[this.admins.length]=this.listeadmins[i]
            this.displayAdmins[this.admins.length]=this.listeadmins[i]
          }
        }

      }
     
      this.isLoading = false;
    }


  }

  createNewBlankAdmin(index) {
    let admin = this.displayAdmins[index];
    let ref = this.displayRefs[index];
    if (admin.phoneNumber)
      admin.phoneNumber = "***************"
    ref.email = "***************"
    return { admin, ref }
  }

  adminClicked(index) {
    this.adminsColor.fill('light');
    this.adminsColor[index] = "primary"
    this.adminIndex = index
    this.clickedAdmin = this.admins[index];
    this.clickedRef = this.displayRefs[index]
    if (this.clickedAdmin.isMaster && !Constants.admin.isMaster) {
      this.adminCanBlockUnblock = !this.clickedAdmin.isMaster;
      this.adminCanChangeRoles = !this.clickedAdmin.isMaster;
    } else {
      this.verifyRoles()
    }



  }

  getAdminIndex(admin: Administrateur, tab: Administrateur[]) {
    let i: number = 0;
    let index: number = -1;
    let repeat = true;
    while (i < tab.length && repeat) {
      if (admin.id == tab[i].id) {
        index = i;
        repeat = !repeat
      }
      i++;
    }
    return index;
  }

  refresh() {
    this.isLoading = true;
    this.getAllAdmin()
  }

  getRef(index: number) {
    return this.refs[index]
  }

  editRoles() {
    let admin = this.admins[this.adminIndex]
    RoleService.initializeRole(admin)
  }

  saveChanges(editRolesPop) {
    this.showAlert("info", "Mise à jour " + this.refs[this.adminIndex].email + " ...")
    let admin = this.admins[this.adminIndex];
    this.clickedAdmin.rolesGroupe = this.adminRoles;
    admin.rolesGroupe = this.adminRoles;
    AdminProfileService.updateAdminProfile(this.http, admin, this.refs[this.adminIndex].adminUID).then(res => {
      if (res.status) {
        this.showAlert("success", "Mise à jour " + this.refs[this.adminIndex].email + " terminée avec succès")
      } else {
        this.showAlert("danger", "Mise à jour " + this.refs[this.adminIndex].email + " terminée avec échec")
      }
    });
    editRolesPop.hide();

  }

  showAlert(type: string, text: string) {
    this.type = type;
    this.alertText = text;
    if ((<HTMLInputElement>document.getElementById("alert")))
      (<HTMLInputElement>document.getElementById("alert")).hidden = false;
  }

  blockOrUnblockAdmin(event) {
    event.target.disabled = true
    if (this.clickedAdmin.accountStatut == 1) {
      this.showAlert("info", "Blocage " + this.refs[this.adminIndex].email + " ...");
    } else {
      this.showAlert("info", "Déblocage " + this.refs[this.adminIndex].email + " ...");
    }
    this.clickedAdmin.accountStatut = this.clickedAdmin.accountStatut == 1 ? 2 : 1;
    this.displayAdmins[this.adminIndex] = this.clickedAdmin;

    this.admins[this.adminIndex].accountStatut = this.clickedAdmin.accountStatut;

    AdminProfileService.updateAdminProfile(this.http, this.admins[this.adminIndex], this.refs[this.adminIndex].adminUID).then(res => {
      if (res.status) {
        if (this.clickedAdmin.accountStatut === 1) {
          this.showAlert("success", "Déblocage " + this.refs[this.adminIndex].email + " terminé avec succès");
        }
        else {
          this.showAlert("success", "Blocage " + this.refs[this.adminIndex].email + " terminé avec succès");
        }
      } else {
        if (this.clickedAdmin.accountStatut === 2) {
          this.showAlert("danger", "blocage " + this.refs[this.adminIndex].email + " terminé avec échec");
        } else {
          this.showAlert("danger", "Déblocage " + this.refs[this.adminIndex].email + " terminé avec échec");
        }
      }
    }).finally(() => {
      event.target.disabled = false
    });
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

  getAdminStatus() {
    let image = "";
    let title = "";
    if (this.admins[this.adminIndex].accountStatut === 2) {
      image = "assets/images/unblock.png"
      title = "unblock"
    }
    else {
      image = "assets/images/block.png"
      title = "block"
    }
    return { image, title }
  }

  getAdminImage(adminIndex) {
    let admin = this.admins[adminIndex];
    let imageUrl = "assets/images/user/anonymous.png";
    if (admin.profileImgUrl != null && admin.profileImgUrl != undefined) {
      imageUrl = admin.profileImgUrl;
    }
    return imageUrl;
  }

  justifying(propertie: string, table: string, justificationModal, justification, justifyingImage) {
    justification.value = "";
    justificationModal.show()
    this.propertie = propertie;
    this.justifyingImage = justifyingImage;
    this.table = table
  }

  justify(justificationModal, justify) {
    if (justify.value !== "") {
      let justification: Justification = new Justification();
      justification.attribute = this.propertie;
      justification.description = justify.value;
      justification.interface = "Consulter Demandes"
      justification.fromCollection = "demandes";
      this.justifyingImage.src = "assets/images/loading.gif";
      Service.sendJustification(this.http, justification).then(result => {
        if (result.status) {
          if (this.table === "admin") {
            this.clickedAdmin[this.propertie] = this.admins[this.adminIndex][this.propertie]
          } else if (this.table === "ref") {
            this.clickedRef[this.propertie] = this.refs[this.adminIndex][this.propertie]
          }
        }

      }).finally(() => {
        this.justifyingImage.src = "assets/images/showInfo.png";
      })
      justificationModal.hide();
    }
  }

  hoverOn(adminIndex) {
    if (adminIndex !== this.adminIndex)
      this.adminsColor[adminIndex] = "dark"
  }

  hoverOff(adminIndex) {
    if (adminIndex === this.adminIndex) {
      this.adminsColor[adminIndex] = "primary"
    } else {
      this.adminsColor[adminIndex] = "light"
    }
  }

/* ============================ function searsh ========================== */
async Search() {
  let search: string = (<HTMLInputElement>document.getElementById('m-search')).value;
  if (search !== "") {
    this.searching = true;
    this.getAllAdmin(search)
  } 
}
verifyingSearch(event) {
  let search: string = (<HTMLInputElement>document.getElementById('m-search')).value;
  if (search == "") {
    this.searching = false;
    this.getAllAdmin(search)
  } else {
    if (event.key == "Enter")
      this.Search()
  }
}
/* ===============================end searsh =============================== */
}