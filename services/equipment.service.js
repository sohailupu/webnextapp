import { instance } from "../libs/client";
import { equipmentStore } from "../stores/equipment.store";
import moment from "moment";

class EquipmentService {
  async getAllNodes() {
    const { data } = await instance.get("nodes");
    const defined = data.definedNodes;
    const undefined = data.undefinedNodes;
    return { defined, undefined };
  }

  async getActiveNodes() {
    const { data } = await instance.get("nodes");
    return data;
  }

  async getOperationInformations(id) {
    return instance.get(`nodes/kpi/process/${id}`);
  }

  async getConnectedAndNotConnected() {
    return instance.get("nodes/session");
  }

  async finishJunction(id) {
    return instance.post("nodes/session/stop", {
      id: id,
    });
  }

  async faultButton(id, status, description, type) {
    return instance.post("nodes/warning", {
      id: id,
      status: status,
      description: description,
      type: type,
    });
  }

  // node/process/type

  async getTypeByProcess(type) {
    return await instance.get(`nodes/list/process/${type}`);
  }

  async connectSession(id, userId) {
    return instance.post("nodes/session/start", {
      node: id,
      user: userId,
    });
  }

  async getEquipments() {
    const { data } = await instance.get("nodes");
    return data.definedNodes;
  }

  async getEquipmentsStep() {
    const { data } = await instance.get("nodes");
    const defined = data.definedNodes;
    const undefined = data.undefinedNodes;
    return { defined, undefined };
  }

  async getTimeLineData({ nodeId, date, dateListId, type }) {
    return await instance.post("nodes/node-action ", {
      nodeId: nodeId,
      date: date ? moment(date).format("YYYY-MM-DD HH:mm:ss") : moment().format("YYYY-MM-DD HH:mm:ss"),
      dateListId: dateListId || "",
      type: type || "",
    });
  }

  async activeNodes() {
    return instance.get("nodes/active");
  }

  async energyData(date) {
    return await instance.get(`nodes/consumption/energy/${date}`);
  }

  async addEquipment(data) {
    return await instance.post("nodes/metadata", data);
  }

  async updateEquipment(id, data) {
    return instance.put(`nodes/metadata/${id}`, data);
  }

  async updateEquipmentWorkTolerance(id, data) {
    return instance.put(`nodes/metadata/workTolerance/${id}`, data);
  }

  async updateEquipmentDefinedToUndefined(id) {
    return instance.put(`nodes/${id}`);
  }

  async getJunctionUserStart(data) {
    return instance.post("nodes/settings/session/user/start", data);
  }

  async getStartToProductJunction(data) {
    return instance.post("nodes/session/user/start", data);
  }

  async getGroupEquipmentToProcess() {
    const { data } = await instance.get("nodes/group");
    return data;
  }

  async getAllEquipmentsAndProcess() {
    const allEquipments = await this.getEquipments();
    const processEquipments = await this.getGroupEquipmentToProcess();

    return { processEquipments, allEquipments };
  }

  async getLineChart(id) {
    return instance.get(`nodes/daily/usage/energy/${id}`);
  }

  async getMultiChartData(id, data) {
    return instance.post(`nodes/last/oee/machine/${id}`, data);
  }

  async getEquipmentForProcessId(id) {
    return instance.get(`nodes/list/for/${id}`);
  }

  async getKpiDetail(id) {
    return instance.get(`nodes/last/usage/energy/${id}`);
  }

  async startEmbeddedServer(id) {
    return instance.post(`nodes/embedded/server/${id}`);
  }

  async stopEmbeddedServer(id) {
    return instance.post(`nodes/exit/embedded/server/${id}`);
  }

  async getEquipmentDataForMap() {
    return instance.get(`nodes/for/map`);
  }

  async getConsumptionDataForCCount(date) {
    return instance.get(`nodes/consumption/cCount/${date}`);
  }
  async workCardEvent(data) {
    return instance.post("nodes/map/equipments/diff", data);
  }
  async findOneNode(id) {
    return instance.get(`nodes/detail/${id}`);
  }
}
const equipmentService = new EquipmentService();
export { equipmentService };
