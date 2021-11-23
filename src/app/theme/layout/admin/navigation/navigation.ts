import { Injectable } from '@angular/core';
import { Constants } from 'src/Constants/Constants';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: "admin-space",
    title: 'Espace Admininstrateur',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'my-profile',
        title: 'Mon Profile',
        type: 'item',
        url: '/dashboard/profile',
        icon: 'feather icon-user'
      }
    ]
  },
  {
    id: 'dashboard',
    title: 'Tableau de bord',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'dashboard-manager',
        title: 'Dashboard Manager',
        type: 'item',
        url: '/dashboard/manager',
        icon: 'feather icon-monitor'
      },
      {
        id: 'dashboard-traceability',
        title: 'Dashboard Traceability',
        type: 'item',
        url: '/dashboard/traceability',
        icon: 'feather icon-monitor'
      },
    ]
  },
  {
    id: 'Admin-Manager',
    title: 'Gestion des Administrateurs',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'add-admin',
        title: 'Ajouter un nouvel Admin',
        type: 'item',
        url: '/dashboard/add-new-admin',
        icon: 'feather icon-user-plus'
      },
      {
        id: 'admin-Consultation',
        title: 'Les Administrateurs',
        type: 'item',
        url: '/dashboard/admins-list',
        icon: 'feather icon-users'
      }
    ]
  },
  {
    id: 'consultation',
    title: 'Consultation',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'consulter-agree',
        title: 'Etablissements financiers',
        type: 'item',
        url: '/dashboard/consult-agree',
        icon: 'feather icon-map-pin'
      },
      {
        id: 'consulter-users',
        title: 'les Utilisateurs',
        type: 'item',
        url: '/dashboard/consult-users',
        icon: 'feather icon-users'
      },
      {
        id: 'consulter-demandes',
        title: 'les Demandes',
        type: 'item',
        url: '/dashboard/consult-demandes',
        icon: 'feather icon-file-text'
      },/*
      {
        id: 'consulter-Reclamation',
        title: 'les reclamations',
        type: 'item',
        url: '/dashboard/consult-reclamtions',
        icon: 'feather icon-file-text'
      },*/
      {
        id: 'consulter-agree',
        title: 'Les réclamations',
        type: 'item',
        url: '/dashboard/consult-reclamtions',
        icon: 'feather icon-alert-triangle'
      }
      
    ]
  },


];

export class child {
  id: string;
  title: string;
  type: string;
  url: string;
  icon: string;
}

export class role {
  id: string;
  title: string;
  type: string;
  icon?: string;
  children: child[]
  constructor() {
    this.id = "";
    this.title = "";
    this.type = "";
    this.icon = "";
    this.children = []
  }
}

@Injectable()
export class NavigationItem {
  public get() {
    let adminAllRoles: role[] = []
    
    //admin-space
    adminAllRoles[adminAllRoles.length] = NavigationItems[0];
    if (Constants.admin.rolesGroupe) {
      let adminRole: role;
      for (let i = 1; i < NavigationItems.length; i++) {
        adminRole = new role();
        adminRole.id = NavigationItems[i].id;
        adminRole.title = NavigationItems[i].title;
        adminRole.type = NavigationItems[i].type;
        adminRole.icon = NavigationItems[i].icon;
        for (let j = 0; j < NavigationItems[i].children.length; j++) {
          if (Constants.admin.rolesGroupe.indexOf(NavigationItems[i].children[j].id) !== -1) {
            adminRole.children[adminRole.children.length] = NavigationItems[i].children[j];
          }
        }
        if (adminRole.children.length !== 0) {
          adminAllRoles[adminAllRoles.length] = adminRole
        }
      }
    }
    return adminAllRoles;
  }
}
