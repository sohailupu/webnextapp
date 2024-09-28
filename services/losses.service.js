import { instance } from "../libs/client";

class LossesService {
  async getLossesTypeList() {
    return instance.get("losses");
  }

  async getLosses() {
    return instance.get("losses/actions/user");
  }

  async addLossType(data) {
    return instance.post("losses", data);
  }

  async updateLossType(id, data) {
    return instance.put(`losses/${id}`, data);
  }

  async deleteLossType(id) {
    return instance.delete(`losses/${id}`);
  }

  async getLosesDetails(id) {
    return await instance.get(`losses/action/${id}`);
  }

  async getLoseTypes() {
    return await instance.get("losses/type");
  }

  async identifyLose(junctionId, data) {
    return await instance.put(`losses/actions/${junctionId}`, data);
  }

  async getLossesChart() {
    const { data } = await instance.get("losses/monthly");
    return data;
  }
}
const lossesService = new LossesService();
export { lossesService };
