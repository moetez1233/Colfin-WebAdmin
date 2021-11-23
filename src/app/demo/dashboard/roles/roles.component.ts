import { Component, OnInit } from '@angular/core';
import { RoleService } from './RoleService';
import { HttpClient } from '@angular/common/http';
import { Role } from 'src/Models/Role';
import { Administrateur } from 'src/Models/Administrateur';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  isLoaded = false;
  rolesGroupKeys = [];
  rolesGroupe: any[][] = [[], [], [], []];
  roleGroupChecked: any[][] = [[], [], [], []];
  adminRoles: Role[] = [];
  snapshotRoles
  constructor(
    private http: HttpClient
  ) {

  }

  async ngOnInit() {
    this.snapshotRoles = await RoleService.getAllRoles(this.http);
    this.initRoles();
    RoleService.get().subscribe(item => {
      if (item.resetPage) {
        this.resetPage()
      } else if (item.initRoles) {
        let admin = item.admin;
        this.initRoles(admin)
      }
    })

  }

  ngAfterViewInit() {
  }

  initRoles(admin?: Administrateur) {
    this.adminRoles = [];
    this.roleGroupChecked = [[], [], [], []];
    this.rolesGroupe = [[], [], [], []]

    let allgroupedRoles = this.snapshotRoles;
    let groupedRoles = Object.values(allgroupedRoles);
    for (let i = 0; i < groupedRoles.length; i++) {
      let groupe: any = groupedRoles[i]
      const des = groupe.description
      if (this.rolesGroupKeys.length < 4)
        this.rolesGroupKeys.push(des);
      delete groupe.description
      let roles = Object.values(groupe)
      for (let j = 0; j < roles.length; j++) {
        this.rolesGroupe[i][j] = Object.values(roles[j])
        if (admin && admin.rolesGroupe) {
          this.roleGroupChecked[i][j] = (admin.rolesGroupe.indexOf(this.rolesGroupe[i][j][1]) >= 0)
          if (this.roleGroupChecked[i][j]) {
            this.adminRoles.push(this.rolesGroupe[i][j][1])
          }
        } else {
          this.roleGroupChecked[i][j] = false
        }
      }
    }
    this.isLoaded = true;
  }

  roleCheck(roleGroupIndex, rolesIndex): boolean {
    return this.roleGroupChecked[roleGroupIndex][rolesIndex];
  }

  roleClick(roleGroupIndex, rolesIndex) {
    this.roleGroupChecked[roleGroupIndex][rolesIndex] = !this.roleGroupChecked[roleGroupIndex][rolesIndex];
    if (this.roleGroupChecked[roleGroupIndex][rolesIndex]) {
      this.adminRoles.push(this.rolesGroupe[roleGroupIndex][rolesIndex][1]);
    } else {
      let index = this.adminRoles.indexOf(this.rolesGroupe[roleGroupIndex][rolesIndex][1]);
      this.adminRoles.splice(index, 1)
    }
    RoleService.setAdminRoles(this.adminRoles);
  }

  resetPage() {
    this.roleGroupChecked = [[], [], [], []];
    this.adminRoles = []
  }

}
