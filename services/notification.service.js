import { instance } from "../utils/client";

class NotificationService {
  async getNotify() {
    return instance.get('notification/group-list');
  }

  async updateIsRead() {
    return instance.post('notification/isRead');
  }

  async createNotification(data) {
    return await instance.post('notification/create', data);
  }

  async deleteNotification(id) {
    return await instance.put(`notification/${id}`);
  }

  async isReadNotification(id) {
    return await instance.post(`notification/isRead/${id}`);
  }

  async getNotificationDetail(id) {
    const { data } = await instance.get(`notification/details/${id}`);
    return data;
  }
  
}
const notificationService = new NotificationService();
export {notificationService};
