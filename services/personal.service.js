import { instance } from "../libs/client";

class PersonalService {
  async updatePersonal(id, data) {
    return instance.put(`user/personal/${id}`, data);
  }

  async updatePersonalPhoto(id, data) {
    return instance.put(`user/personal/profile-photo/${id}`, data);
  }

  async getDepartmentToUser() {
    return instance.get("user/department/to/user");
  }

  async createDepartment(data) {
    return instance.post("user/department", data);
  }

  async updateDepartment(id, data) {
    return instance.put(`user/department/${id}`, data);
  }

  async getDepartments() {
    return instance.get("user/department/list");
  }

  async addNewLabelToDepartment(data) {
    return await instance.post("user/department/label", data);
  }
  async deleteLabel(id) {
    return await instance.delete(`user/department/label/${id}`);
  }
  async getLabelList(id) {
    return await instance.get(`user/department/label/${id}`);
  }
  async getPersonelDepartment() {
    const { data } = await instance.get("user/department/list");
    return data;
  }

  async deleteDepartment(id) {
    return instance.delete(`user/department/delete/${id}`);
  }

  async deletePersonal(id) {
    return instance.post(`user/personal/remove`, id);
  }

  async addPersonal(data) {
    return instance.post("user/personal", data);
  }

  async removePersonal(id) {
    return instance.delete(`user/personal/remove/${id}`);
  }

  async addProcess(data) {
    return instance.post("user/personal/process", data);
  }

  async addTalent(data) {
    return instance.post("user/personal/talent", data);
  }

  async deleteProcess(id) {
    return instance.delete(`user/personal/process/${id}`);
  }

  async updateProcess(id, data) {
    return instance.put(`user/personal/process/${id}`, data);
  }

  async getProcess(id) {
    return instance.get(`user/personal/process/${id}`);
  }

  async getTalent(id) {
    return instance.get(`user/personal/talent/${id}`);
  }

  async deleteTalent(id) {
    return instance.delete(`user/personal/talent/${id}`);
  }

  async updateTalent(id, data) {
    return instance.put(`user/personal/talent/${id}`, data);
  }

  async getPersonalById(id) {
    return instance.get(`user/personal/${id}`);
  }

  async activePersonals() {
    return instance.get("user/list");
  }
  async getActivePersonals() {
    const { data } = await instance.get("user/list");
    return data;
  }

  async activeRightMenuList() {
    return await instance.get("user/right/list");
  }

  async getMetadata(id) {
    return instance.get(`user/personal/${id}`);
  }

  async personalLimit() {
    return instance.get("user/limit");
  }

  async getScanQR() {
    return instance.get("user/attend");
  }

  async getAnnoumentForm(id, data) {
    return instance.put(`user/attend/status/${id}`, data);
  }

  async leaderboardPoint(type, body) {
    const { data } = await instance.post(`report/list/upu.point/${type}`, body);
    return data;
  }

  async forgotPassword(data) {
    return instance.post("account/forgot", data);
  }
  async changePassword(data) {
    return instance.post("account/forgot-password", data);
  }
}
const personalService = new PersonalService();
export { personalService };
