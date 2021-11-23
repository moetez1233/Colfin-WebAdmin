import { DashboardRoutingModule } from "../dashboard-routing.module";


describe('DashAnalyticsModule', () => {
  let dashboardRoutingModule: DashboardRoutingModule;

  beforeEach(() => {
    dashboardRoutingModule = new DashboardRoutingModule();
  });

  it('should create an instance', () => {
    expect(dashboardRoutingModule).toBeTruthy();
  });
});
