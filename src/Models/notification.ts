import { NotificationParam } from './notificationParam';

export class Notification {
  id?: string;
  template?: number;
  user?: string;
  message?: any;
  type?: any;
  created?: number;
  status?: any;
  notificationParam:NotificationParam[];
}
