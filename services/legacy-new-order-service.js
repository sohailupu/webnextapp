import { instance } from "../libs/client";

class LegacyOrderService {
  async flexNewOrder(data) {
    return instance.post("order/", data);
  }
}
const legacyOrderService = new LegacyOrderService();
export { legacyOrderService };
