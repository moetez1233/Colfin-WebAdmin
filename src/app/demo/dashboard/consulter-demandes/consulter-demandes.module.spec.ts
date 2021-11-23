import { ConsulterDemandesComponent } from './consulter-demandes.component';

describe('ConsulterDemandesModule', () => {
  let ConsulterDemandesModule: ConsulterDemandesComponent;

  beforeEach(() => {
    ConsulterDemandesModule = new ConsulterDemandesComponent();
  });

  it('should create an instance', () => {
    expect(ConsulterDemandesModule).toBeTruthy();
  });
});
