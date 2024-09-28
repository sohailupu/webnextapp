import { makeAutoObservable } from "mobx";
import { consoleStore } from "./console.store";

class EquipmentStore {
  constructor() {
    makeAutoObservable(this);
  }

  timeLineModal = false;
  timeLineNodeId = "false";
  loading = false;
  allEquipments = {
    definedNodes: [],
    undefinedNodes: [],
  };
  definedGroupedEquipments = [];
  definedEquipments = [];
  undefinedEquipments = [];

  setTimeLineModal(status, nodeId) {
    if (nodeId) {
      this.timeLineNodeId = nodeId;
      this.timeLineModal = status;
    } else {
      this.timeLineNodeId = "";
      this.timeLineModal = status;
    }
  }

  setLoading(status) {
    this.loading = status;
  }

  setAllEquipments(equipments) {
    this.allEquipments = equipments;
  }

  setDefinedEquipments(equipments) {
    this.definedEquipments = equipments;

    if (consoleStore?.consoleData?.id) {
      const item = equipments.find(
        (d) => d.id === consoleStore.consoleData?.id
      );

      if (item) {
        consoleStore.updateConsoleItem(item);
      }
    }
  }

  setUndefinedEquipments(equipments) {
    this.undefinedEquipments = equipments;
  }

  setDefinedGroupedEquipments(equipments) {
    let groupedEquipments = {};

    for (let i = 0; i < equipments.length; i++) {
      const equipment = equipments[i];
      const key = equipment?.process?.name;
      if (groupedEquipments[key]) {
        groupedEquipments[key].push(equipment);
      } else {
        groupedEquipments[key] = [equipment];
      }
    }

    this.definedGroupedEquipments = groupedEquipments;
  }
}

const equipmentStore = new EquipmentStore();
export { equipmentStore };
