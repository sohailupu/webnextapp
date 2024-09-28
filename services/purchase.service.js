import { instance } from "../libs/client";

class PurchaseService {
  async startPurchaseJunction(body) {
    return await instance.post("purchase/junction/start", body);
  }

  async finishPurchaseJunction(id, body) {
    return await instance.post(`purchase/junction/finish/${id}`, body);
  }

  async purchaseQuality(id, body) {
    return await instance.post(`purchase/make/quality/${id}`, body);
  }

  async getSuppliersGroup() {
    return await instance.get(`purchase/supplier-group`);
  }

  async getSuppliersGroupWithSuppliers() {
    const { data } = await instance.get(`purchase/groups-supplier-supplier`);
    return data;
  }

  async deletePlannedPurchase(id) {
    return await instance.delete(`purchase/planned/delete/${id}`);
  }

  async deletePurchase(id) {
    return await instance.delete(`purchase/${id}`);
  }

  async supplierListByGroup(groupId) {
    const { data } = await instance.get(`purchase/list-by-group/${groupId}`);
    return data;
  }

  async createSupplierGroup(body) {
    return await instance.post(`purchase/create/supplier-group`, body);
  }

  async purchaseTransactionsPlanned(id) {
    const { data } = await instance.get(`purchase/planned/list/${id}`);
    return data;
  }

  async getPurchaseJunctionsForCompany() {
    const { data } = await instance.get(`purchase/junction/list/for/company`);
    return data;
  }

  async createPlannedPurchaseJunction(data) {
    return await instance.post("purchase/junction/create/planned", data);
  }

  async getPurchaseJunctionsForSupplierGroup(id) {
    const { data } = await instance.get(
      `purchase/junction/list/for/supplier-group/${id}`
    );
    return data;
  }
}
const purchaseService = new PurchaseService();
export { purchaseService };
