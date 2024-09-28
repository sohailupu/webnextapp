import { makeAutoObservable } from "mobx";

class MapStore {
  constructor() {
    makeAutoObservable(this);
  }
  default = true;

  goBackEditor = false;
  setGoBackEditor(boolean) {
    this.goBackEditor = boolean;
  }

  setDefault(status) {
    this.default = status;
  }
  mapType = true;
  setMapType(type) {
    this.mapType = type;
  }

  isEmpty = false;
  setIsEmpty(isEmpty) {
    this.isEmpty = isEmpty;
  }
}
const mapStore = new MapStore();
export { mapStore };
