import { instance } from "../libs/client";

class ShiftService {
  async addShift(data) {
    return instance.post(`company/shift`, data);
  }

  async updateShift(id, data) {
    return instance.put(`company/shift/${id}`, data);
  }

  async getShifts() {
    return instance.get("company/shift");
  }

  async getActivity(shiftId) {
    return instance.get(`company/shift/activity/${shiftId}`);
  }

  async addActivity(id, data) {
    return instance.post(`company/shift/activity/${id}`, data);
  }

  async deleteActivity(id) {
    return instance.delete(`company/shift/activity/${id}`);
  }

  async updateActivity(id, data) {
    return instance.put(`company/shift/activity/${id}`, data);
  }

  async deleteShift(id) {
    return instance.delete(`company/shift/${id}`);
  }

  async updateOnlyOneShiftDay(id, data) {
    return instance.put(`company/shift/only/date/${id}`, data);
  }

  async getDatelist() {
    return instance.get(`company/shift/dateList`);
  }

  async getWeeklyShift(date) {
    const { data } = await instance.get(`company/weekly/${date}`);
    return data;
  }
}
const shiftService = new ShiftService();
export { shiftService };
