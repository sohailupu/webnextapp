import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
class EmbeddedStore {
  // constructor() {
  //   makeAutoObservable(this);
  //   makePersistable(this, {
  //     name: "EmbeddedStore",
  //     properties: [""],
  //     storage: window.localStorage,
  //   });
  // }

  constructor() {
    makeAutoObservable(this);
    if (typeof window != "undefined") {
      makePersistable(this, {
        name: "EmbeddedStore",
        properties: [""],
        storage: window.localStorage,
      });
    }
  }

  selectedNode = {};
  setSelectedNode = (object) => {
    this.selectedNode = object;
  };

  allSensorData = {};
  setAllSensorData = (object) => {
    this.allSensorData = object;
  };

  selectedSensor = {};
  setSelectedSensor = (object) => {
    this.selectedSensor = object;
  };

  sensorSource = {};
  setSensorSource = (object) => {
    this.sensorSource = object;
  };

  sensorStatusControl = "";
  setSensorStatusControl = (string) => {
    this.sensorStatusControl = string;
  };
}

const embeddedStore = new EmbeddedStore();
export { embeddedStore };
