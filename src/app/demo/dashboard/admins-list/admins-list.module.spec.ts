import {AdminListComponent  } from './admins-list.component';

describe('AdminListModule', () => {
  let AdminListModule: AdminListComponent;

  beforeEach(() => {
    AdminListModule = new AdminListComponent();
  });

  it('should create an instance', () => {
    expect(AdminListModule).toBeTruthy();
  });
});
