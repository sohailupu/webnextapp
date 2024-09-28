import { instance } from "../libs/client";

class RawMaterialService {
  async createRawMaterial(data) {
    return await instance.post("raw-material/create", data);
  }

  async getRawMaterials() {
    const { data } = await instance.get("raw-material/list");
    return data;
  }

  async getPurchaseList(id) {
    const { data } = await instance.get(`raw-material/material/${id}`);
    return data;
  }

  async setManualRawMaterialEdit(type, id, data) {
    return await instance.post(`raw-material/set/manual/${type}/${id}`, data);
  }

  async supplierList() {
    const { data } = await instance.get("purchase");
    return data;
  }

  async supplierGroup() {
    const { data } = await instance.get("purchase/supplier-group");
    return data;
  }

  async addSupplier(model) {
    const { data } = await instance.post("purchase", model);
    return data;
  }

  async updateSuplier(id, data) {
    return await instance.put(`purchase/${id}`, data);
  }

  async updateRawMaterial(id, data) {
    return await instance.put(`raw-material/${id}`, data);
  }
}
const rawMaterialService = new RawMaterialService();
export { rawMaterialService };
