import { instance } from "../libs/client";

class ExternalJunctionService {
  async getExtenralOperationJunctions(id) {
    const { data } = await instance.get(`external-junction/plan/view/${id}`);
    return data;
  }
}
const externalJunctionService = new ExternalJunctionService();

export { externalJunctionService };
