import { Administrateur } from 'src/Models/Administrateur';
import { Reference } from 'src/Models/Ref';


export class Constants {
    static email: string;
    static passsword: string;
    static refAdmin: Reference;
    static authAdmin;
    static admin: Administrateur;
    static route: string;
    static imgsrc: string;
    static readonly imageStorageRef = "/Admins/images/"
    static redirect = true;
    static addingNewAdmin = false;
}

export class DbConfigConstants {
    static Administrateurs_Path = "admin";
    static Agrees_Path = "agrees";
    static Administration_Path ="administration" // ajouter par Moetez
    static Categorie_Path = "categorie" //ajouter par moetez
    static ClaimRECLAMATION_PATH = "claim" //ajouter par moetez
    static Demandes_Path = "demandes";
    static MetaData_Path = "metadata";
    static Notifications_Path = "notifications";
    static References_Path = "references";
    static Roles_Path = "roles";
    static Services_Path = "services";
    static Service_Path = "service";
    static Trace_Path = "trace";
    static Transactions_Path = "transactions";
    static Users_Path = "users"
    static SiteConfig = "SiteConfig";
}

export class DemandeType {
    static DEMANDE_APPROVED = 0;
    static DEMANDE_IDENTITY = 1;
    static DEMANDE_TYPE_PORTFEUILLE = 2;
    static DEMANDE_AGREE_PROCHE = 3;
}


export class DemandeTraited {
    static DEMANDE_ACCEPTED = 1;
    static DEMANDE_REJECTED = 2;
}

export class URLS {
    static serverPath = "https://us-central1-colfin-00001.cloudfunctions.net";
    static getAdminAndRefByUID = URLS.serverPath + "/getAdminAndRefByUID"
    static updateAdminProfile = URLS.serverPath + "/updateAdminProfile"
    static getAllRoles = URLS.serverPath + "/getAllRoles";
    static createNewAdmin = URLS.serverPath + "/createNewAdmin"
    static getDemandes = URLS.serverPath + "/getDemandes"
    static sendJustification = URLS.serverPath + "/sendJustification"
    static confirmeDemande = URLS.serverPath + "/confirmeDemande"
    static rejectDemande = URLS.serverPath + "/rejectDemande"
    static getDemandesByUserId = URLS.serverPath + "/getDemandesByUserId"
    static getUsers = URLS.serverPath + "/getUsers"
    static getAgrees = URLS.serverPath + "/getAgrees"
    static getAdministration =URLS.serverPath + "/getAdministration"
    static getAdminsAndRefs = URLS.serverPath + "/getAdminsAndRefs"
    static getClaims = URLS.serverPath + "/getClaims"
    static confirmeClaim = URLS.serverPath + "/confirmeClaim"
    static getCategories = URLS.serverPath + "/getCategories"
    static getClaim = URLS.serverPath + "/getClaim"
    static getClaimByUserId = URLS.serverPath + "/getClaimByUserId"
    static getChaqueClaim = URLS.serverPath + "/getChaqueClaims"




}

export class RolesId {
    static add_admin = "add-admin";
    static admin_Consultation = "admin-Consultation"
    static block_unblock_admin = "block-unblock-admin"
    static consulter_agree = "consulter-agree"
    static Edit_Admin_Roles = "Edit-Admin-Roles"
    static consulter_demandes = "consulter-demandes"
    static Notif_Consultation = "Notif-Consultation"
    static Affect_Role_To_Admin = "Affect-Role-To-Admin"
    static Users_Consultation = "consulter-users"
    static Dashbord_Manager = "Dashbord-Manager"
    static Dashbord_Traceability = "Dashbord-Traceability"
    static Dem_Traitement = "Dem-Traitement"
}