import { instance } from "../utils/client";

class ProcessService {
  async activeProcesses() {
    return instance.get(`nodes/process`);
  }

  async activeProcessesWithStations() {
    return instance.get(`nodes/process-with-stations`);
  }

  async getActiveProcess() {
    const { data } = await instance.get(`nodes/process`);
    return data;
  }
  async getIcons() {
    return instance.get(`icons/process`);
  }

  async addProcess(data) {
    return instance.post(`nodes/process`, data);
  }

  async updateProcess(id, data) {
    return instance.put(`nodes/process/${id}`, data);
  }

  async deleteProcess(id) {
    return await instance.delete(`nodes/process/${id}`);
  }

  async getProcessUtilization(id) {
    return await instance.get(`nodes/process/utilization`);
  }

  async getQueryProcessUtilization() {
    return await instance.get(`nodes/process/utilization`);
  }
  
  async getGroupEquipmentToProcess() {
    return instance.get("nodes/group");
  }

  async getMouthlyProcessChart(id) {
    return instance.get(`nodes/last-thirty-day/oee/process/${id}`);
  }

  async getProcessEquData(id) {
    return instance.get(`nodes/list/for/${id}`);
  }

  async getExAndInProces() {
    return instance.get(`nodes/process/internal-external`);
  }
}
const processService = new ProcessService();
export { processService };
