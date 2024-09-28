import { instance } from "../libs/client";

class AvarageService {
  async getAvarage(id) {
    return instance.get(`average/all/kpi/value/${id}`);
  }

  async GetReportType(data) {
    return instance.post(`average/kpi-value`, data);
  }
  async ResetKpi(data) {
    return instance.post(`average/reset/kpi-value`, data);
    //id , name
  }
  async ResetAllData(data) {
    return instance.post(`average/reset/row`, data);
    //id , name
  }

  async returnPreviousAndNextData(data) {
    return instance.post(`average/return/previous`, data);
    //id , name
  }
}
const avarageService = new AvarageService();
export { avarageService };
