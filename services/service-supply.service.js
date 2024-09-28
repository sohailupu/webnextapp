import { instance } from "../libs/client";

class ServiceSupplyService {
  async qualityDashboardService(date) {
    const { data } = await instance.post("service-supply/daily-junctions/count", date);
    return data;
  }
}
const serviceSupplyService = new ServiceSupplyService();
export { serviceSupplyService };
