import { makeAutoObservable } from "mobx";
import { notificationService } from "../services/notification.service";

class NotificationStore {
  constructor() {
    makeAutoObservable(this);
  }

  notifications = [];
  unReadedNotifications = 0;
  loading = true;

  async getNotifications() {
    const { data } = await notificationService.getNotify();

    this.notifications = data;

    data.forEach((d) => {
      d.child.map((c) => {
        if (c.is_read === false) {
          this.unReadedNotifications += 1;
        }
      });
    });

    return data;
  }
}
const notificationStore = new NotificationStore();
export { notificationStore };
