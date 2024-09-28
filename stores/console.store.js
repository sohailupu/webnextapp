import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

class ConsoleStore {
  // constructor() {
  //   makeAutoObservable(this);
  //   makePersistable(this, {
  //     name: "ChatStore",
  //     properties: [""],
  //     storage: window.localStorage,
  //   });
  // }

  constructor() {
    makeAutoObservable(this);
    if (typeof window !== "undefined") {
      makePersistable(this, {
        name: "ChatStore",
        properties: [""],
        storage: window.localStorage,
      });
    }
  }

  consoleData = {};
  isModalOpen = false;
  operationId = null;

  triggerModal() {
    this.isModalOpen = !this.isModalOpen;
  }
  concoleLoading = false;
  setConsoleLoading(boolean) {
    this.concoleLoading = boolean;
  }

  setConsoleData(data) {
    this.consoleData = data;
  }

  setOperationId(operationId) {
    this.operationId = operationId;
  }
}

const consoleStore = new ConsoleStore();

export { consoleStore };
