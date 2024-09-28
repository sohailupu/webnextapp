import { instance } from "../libs/client";
import { authStore } from "../stores/auth.store";

class ExternalOperationService {
  async addOperation(data) {
    return await instance.post("external-operation", data);
  }

  async updateOperation(id, data) {
    return await instance.put(`external-operation/${id}`, data);
  }

  async listOperation(data) {
    return await instance.get("external-operation");
  }

  async addSupplier(data) {
    return await instance.post("external-operation/supplier", data);
  }

  async editSupplier(id, data) {
    return await instance.put(`external-operation/supplier/${id}`, data);
  }

  async listSupplier(data) {
    return await instance.get("external-operation/supplier");
  }

  async listResponsibleUser() {
    return await instance.get("external-operation/user/list");
  }

  async getOrderOperationSuppliers(id) {
    return await instance.get(`external-operation/list/supplier/${id}`);
  }

  async supplierListByGroup(externalOperationId) {
    return await instance.get(
      `external-operation/list-by-group/${externalOperationId}`
    );
  }
}
const externalOperationService = new ExternalOperationService();
export { externalOperationService };
