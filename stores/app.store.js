import { makeAutoObservable } from "mobx";

class AppStore {
  constructor() {
    makeAutoObservable(this);
  }

  loadingOverlay = false;

  setLoadingOverlay = (status) => {
    this.loadingOverlay = status;
  };
}
const appStore = new AppStore();
export { appStore };
