import { AdminProfileComponent } from './admin-profile.component';

describe('AdminProfileModule', () => {
  let AdminProfileModule: AdminProfileComponent;

  beforeEach(() => {
    AdminProfileModule = new AdminProfileComponent();
  });

  it('should create an instance', () => {
    expect(AdminProfileModule).toBeTruthy();
  });
});
