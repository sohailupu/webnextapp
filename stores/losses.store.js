import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";


class LossesStore {
  // constructor() {
  //   makeAutoObservable(this);
  //   makePersistable(this, {
  //     name: "LossesStore",
  //     properties: [""],
  //     storage: window.localStorage,
  //   });
  // }

  constructor() {
    makeAutoObservable(this);
    if (typeof window !== "undefined") {
      makePersistable(this, {
        name: "LossesStore",
        properties: [""],
        storage: window.localStorage,
      });
    }
  }

  listLoading = false;
  setListLoading = (boolean) => {
    this.listLoading = boolean;
  };

  lossListData = [];
  setLossListData = (array) => {
    this.lossListData = array;
  };
}

const lossesStore = new LossesStore();
export { lossesStore };
