import { instance } from "../utils/client";

class ReportService {
  async getAllReports() {
    return instance.get("report/saved");
  }

  async getReport(data) {
    return instance.post(`generate-report/create`, data);
  }

  async saveReports(data) {
    return instance.post(`generate-report/save`, data);
  }

  async deleteSavedReport(id) {
    return instance.delete(`generate-report/delete/${id}`);
  }

  // async personelDashboard(body) {
  //   const {data} = await instance.post(`report/calculate/daily/company`, body)
  //   return data;
  // }

  async personelDashboard(data) {
    return await instance.post(`report/calculate/daily/company`, data);
  }

  async personelDashboardDepartment(body) {
    const {data} = await instance.post(`report/company/daily/for-user`, body)
    return data;
  }

  async getDailyNodeData(body) {
    const { data } = await instance.post(`report/node/daily`, body);
    return data;
  }

  async getReportData() {
    const { data } = await instance.get(`report/save-request`);
    return data;
  }

  async getTimelineData(data) {
    return instance.post(`nodes/multiple/timeline`, data);
  }

  async getQueryTimeLineData(body) {
    const { data } = await instance.post(`nodes/multiple/timeline`, body);
    return data;
  }

  async detailReport(data) {
    return instance.post(`generate-report/get`, data);
  }

  async getEquipmentConsoleData(data) {
    return instance.post(`report/node/daily`, data);
  }

  async getCustomDateReport(data) {
    return instance.post(`report/node/daily/interval`, data);
  }

  async getOperationConsoleData(body) {
    const operations = await instance.get(`nodes/process/utilization`);
    const { data } = await instance.post(`report/process/daily`, body);
    return {
      ...data,
      operations: operations?.data?.operations?.sort((a, b) => b?.actual - a?.actual),
    };
  }
  // async getOperationConsoleData(body) {
  //   const { data } = await instance.post(`report/process/daily`, body);
  //   return data;
  // }
  async getCustomDateReportOperation(data) {
    return instance.post(`report/process/daily/interval`, data);
  }

  async getCompanyConsoleData(body) {
    const { data } = await instance.post(`report/company/monthly`, body);
    return data;
  }
  async getBarChartReportKwh(id, date) {
    return await instance.get(`report/monthly/node/kwh/${id}/${date}`);
  }
  async getBarChartReportCCount(id, date) {
    return await instance.get(`report/monthly/node/c-count/${id}/${date}`);
  }

  async getPersonelConsole(id, body) {
    const { data } = await instance.post(`report/calculate/daily/person/${id}`, body);
    return data;
  }

  async legacyData(type, chartType, id, date) {
    return instance.post(`report/${type}/${chartType}/${id}/${date}`);
  }

  async getWeeklyOrMonthlyDataForPersonLineChart(type, chartType, id, date) {
    return instance.post(`report/person/${type}/${chartType}/${id}/${date}`);
  }

  async saveLegends(body) {
    return instance.post(`user/legend/visibility`, body);
  }

  async getWeeklyOrMonthlyDataCompanyAndDepartmentLineChart(chartType,data) {
    return instance.post(`report/company/line-chart/${chartType}`,data);
  }
}
const reportService = new ReportService();
export { reportService };
