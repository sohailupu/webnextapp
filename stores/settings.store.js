import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

class SettingsStore {
  // constructor() {
  //   makeAutoObservable(this);
  //   makePersistable(this, {
  //     name: "SettingsStore",
  //     properties: ["theme", "selectedPackage"],
  //     storage: window.localStorage,
  //   });
  //detecting system theme
  // this.theme = "light";
  // this.detectSystemTheme();
  // }

  constructor() {
    makeAutoObservable(this);
    if (typeof window != "undefined") {
      makePersistable(this, {
        name: "SettingsStore",
        properties: ["theme", "selectedPackage"],
        storage: window.localStorage,
      });
    }
    this.theme = "light";
  }

  openLeftMenu = false;
  isActive = false;

  theme = "light";
  currentUser = null;
  currentTab = "machine";
  selectedPackage = "machine";
  search = "";

  setCurrentTab = (tabName) => {
    this.currentTab = tabName;
  };

  setOpenLeftMenu = (boolean) => {
    this.openLeftMenu = boolean;
  };

  setIsActive = (boolean) => {
    this.isActive = boolean;
  };

  setSelectedPackage = (packageName) => {
    this.selectedPackage = packageName;
  };

  setTheme = (type) => {
    // this.theme = type;
    this.theme = type;
  };

  setCurrentUser = (user) => {
    this.currentUser = user;
  };

  setSearchValue = (search) => {
    this.search = search;
  };
}
const settingsStore = new SettingsStore();
export { settingsStore };
