import { ConsulterUsersComponent } from './consulter-users.component';

describe('ConsulterUsersModule', () => {
  let ConsulterUsersModule: ConsulterUsersComponent;

  beforeEach(() => {
    ConsulterUsersModule = new ConsulterUsersComponent();
  });

  it('should create an instance', () => {
    expect(ConsulterUsersModule).toBeTruthy();
  });
});
