import { instance } from "../libs/client";

class JunctionService {
  async getOperationJunctionList(id) {
    const { data } = await instance.get(`junction/operation/${id}`);
    return data;
  }

  async getInternalOperationPlanview(id) {
    const { data } = await instance.get(`junction/web/internal/operation/${id}`);
    return data;
  }

  async getInternalOperationJunctions(operationId, requestType) {
    const { data } = await instance.get(`junction/operations/${operationId}/${requestType}/junctions/paginated`);
    return data;
  }

  async getExtenralOperationJunctions(id) {
    const { data } = await instance.get(`junction/web/external/operation/${id}`);
    return data;
  }

  async updatePlanningJunctionList(data) {
    return await instance.post(`junction/update/planning-order`, data);
  }

  async getQualityJunctionDetail(id) {
    const { data } = await instance.get(`junction/details/${id}`);
    return data;
  }

  async handleDivideJunction(id, data) {
    return await instance.post(`junction/divide/${id}`, data);
  }

  async startOrEndSubEvent(type, id) {
    return await instance.post(`junction/${type}/sub/${id}`);
  }

  async deletePlannedJunction(id) {
    return await instance.delete(`junction/internal/planned/${id}`);
  }

  async deleteExternalPlannedJunction(id) {
    return await instance.delete(`junction/external/planned/${id}`);
  }

  //junction/divide/id, data post

  // @Post('/update/planning-order')

  async startPlannedJunction(junctionId, node) {
    return await instance.post(`junction/planned/${junctionId}/${node}`);
  }

  async createJunction(body) {
    return await instance.post("junction/create", body);
  }

  async finishJunction(id, body) {
    return await instance.post(`junction/finish/${id}`, body);
  }

  async getJunctionPiece(id) {
    return await instance.get(`junction/guess/${id}`);
  }

  async startExternalPlannedJunction(junctionId, supplierId) {
    return await instance.post(`junction/supplier/planned/${junctionId}/${supplierId}`);
  }

  async getOperationToProductList(id) {
    const { data } = await instance.get(`work-order/list/connectable/${id}`);
    return data;
  }

  async equipmentBasedJunctionPlanning(data) {
    return await instance.post("junction/create/planned", data);
  }

  async addJunctionManual(body) {
    return await instance.post("junction/manual/create", body);
  }

  async getPlannedJunctions(id) {
    const { data } = await instance.get(`junction/planned/${id}`);
    return data;
  }

  async deleteStationForJunction(junctionId) {
    return await instance.put(`junction/nullable/station/${junctionId}`);
  }

  async deleteSupplierForJunction(junctionId) {
    return await instance.put(`junction/nullable/supplier/${junctionId}`);
  }

  async legacyQualityData(body) {
    const { data } = await instance.post(`junction/legacy/list/for/quality`, body);
    return data;
  }

  async getQualityJunctionsByOperationId(id, data) {
    return await instance.post(`junction/legacy/quality/list/for/operation/${id}`, data);
    //
  }

  async getJunctionDetail(id) {
    return await instance.get(`junction/details/${id}`);
  }

  async getJunctionLength() {
    return await instance.get(`junction/total-length`);
  }

  async moveJunctions(operationId, data) {
    return await instance.post(`junction/move/for/operation/${operationId}`, data);
  }

  async deleteJunction(junctionId) {
    return await instance.delete(`junction/${junctionId}`);
  }

  async updateJunction(junctionId, data) {
    return await instance.put(`junction/${junctionId}`, data);
  }

  async legacyQualityData(body) {
    const { data } = await instance.post(`junction/new/legacy/list/for/quality`, body);
    return data;
  }

  async getQualityJunctionsByOperationId(id, data) {
    return await instance.post(`junction/legacy/quality/list/for/operation/${id}`, data);
  }

  async legacyQualityExternalData(body) {
    const { data } = await instance.post(`junction/legacy/list/quality/external`, body);
    return data;
  }

  async getQualityExternalJunctionsByOperationId(id, data) {
    return await instance.post(`junction/legacy/quality/external/list/for/operation/${id}`, data);
  }

  async getExternalJunctions() {
    const { data } = await instance.get(`junction/legacy/logistic/list`);
    return data
  }

  async getExternalJunctionsForOperations(id) {
    const { data } = await instance.get(`junction/new/operation/logistic/list/${id}`);
    return data
  }

  // junction/update/${station ve ya suplier id}/${update / delete}/${junction} , {nodeId ve ya suplierid : }
}
const junctionService = new JunctionService();
export { junctionService };
