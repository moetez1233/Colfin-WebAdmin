import { AddNewAdminComponent } from './add-new-admin.component';

describe('AddNewAdminModule', () => {
  let AddNewAdminModule: AddNewAdminComponent;

  beforeEach(() => {
    AddNewAdminModule = new AddNewAdminComponent();
  });

  it('should create an instance', () => {
    expect(AddNewAdminModule).toBeTruthy();
  });
});
