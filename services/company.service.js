import { instance } from "../libs/client";

class CompanyService {
  async activeCompany() {
    return instance.get("company/active");
  }

  async getCompany() {
    return instance.get("company/info");
  }

  async getCCount() {
    return instance.get("company/c-count");
  }

  async addDailyShift(data) {
    return await instance.post(`company/shift-group`, data);
  }
  async getOneShiftGroup(id) {
    return await instance.get(`company/shift-group/${id}`);
  }

  async getDailyShifts() {
    return await instance.get(`company/shift-group`);
  }

  async getDefaultShift() {
    return await instance.get("company/list/standart-shifts");
  }

  async updateShift(id, shiftGroupId) {
    return await instance.put(`company/standart-shifts/${id}/${shiftGroupId}`);
  }

  async nonstandartShift(data) {
    return await instance.post(`company/add/non-standard-shift`, data);
  }

  async getNonstandartShift() {
    return await instance.get("company/list/non-standard-shift");
  }

  async getOldDayShifts() {
    return await instance.get("company/list/old-days-shift");
  }

  async deleteStandardShift(id) {
    return await instance.delete(`company/standard-shifts/${id}`);
  }

  async deleteNonstandardShift(id) {
    return await instance.delete(`company/non-standard/shift/${id}`);
  }

  async handleUpdateNonstandardShiftsDayList(id) {
    return await instance.get(`company/shift/date/list/for/groupId/${id}`);
  }

  async updateNonstandardShiftsDayList(id, data) {
    return await instance.put(`company/non-standard/${id}`, data);
  }

  //@Get('/shift/date/list/for/groupId/:id')

  async getCompanyAndGetCCount() {
    const companyData = await this.getCompany();
    const cCountData = await this.getCCount();
    return { companyData, cCountData };
  }

  async updateCompany(data) {
    return instance.put(`company/edit`, data);
  }
  async updateLanguage(data) {
    return instance.put(`company/edit/language`, data);
  }
}

const companyService = new CompanyService();
export { companyService };
