import { instance } from "../libs/client";

class EmbeddedServerService {
  async stateEmbeddedServer(deviceId, state) {
    const { data } = await instance.post("sensor/send/embedded/state", {
      deviceId,
      status: state,
    });
    return data;
  }

  async getSensorSettings(metadataId) {
    const { data } = await instance.get(`nodes/sensor/information/${metadataId}`);
    return data;
  }

  async getSensorTypes() {
    const { data } = await instance.get("system-sensor/list");
    return data;
  }

  async getRealTimeChartData(data) {
    return await instance.post("sensor/send/analog/chart/state", data);
  }

  async swithToServerPriority(id) {
    return await instance.post("sensor/priority", {
      deviceId: id,
      status: 1,
    });
  }

  async getDefaultSensorSettings() {
    return await instance.get("sensor/default-sensor-settings");
  }
  async loadDefaultSensorSettings(id, data) {
    return await instance.post(`sensor/default-sensor-settings/${id}`, data);
  }

  async priorityTest(nodeId, metadataId, data) {
    return await instance.post(`sensor/test-priority/${nodeId}`);
  }

  async sendPriority(nodeId, metadataId, data) {
    return await instance.post(`sensor/send-priority/${nodeId}/${metadataId}`, data);
  }

  async savePriorityTable(metadataId, data) {
    return await instance.post(`sensor/set-priority/${metadataId}`, data);
  }

  async getPriorityTable(metadataId) {
    return await instance.get(`sensor/get-priority/${metadataId}`);
  }

  async deletePriorityTableCard(metadataId, id) {
    return await instance.delete(`sensor/delete-priority-card/${metadataId}/${id}`);
  }

  async updatePriorityCard(deviceId, id, data) {
    return await instance.put(`sensor/update-priority-card/${deviceId}/${id}`, data);
  }

  async resetPriorityTable(deviceId, metadataId) {
    return await instance.put(`sensor/reset-priority/${deviceId}/${metadataId}`);
  }

  async saveDigital(data) {
    return await instance.post("sensor/digital", data);
  }

  async saveAnalog(data) {
    return await instance.post("sensor/analog", data);
  }

  async resetAnalog(data) {
    return await instance.post("sensor/reset/analog", data);
  }

  async resetDigital(data) {
    return await instance.post("sensor/reset/digital", data);
  }

  async resetDevice(deviceId) {
    return instance.post(`sensor/device/reset/${deviceId}`);
  }
}

const embeddedServerService = new EmbeddedServerService();
export { embeddedServerService };
