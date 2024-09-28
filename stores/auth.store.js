import { makeAutoObservable } from "mobx";
import { makePersistable, hydrateStore } from "mobx-persist-store";

class AuthStore {
  constructor() {
    makeAutoObservable(this);

    const storage = typeof window !== "undefined" ? window?.localStorage : null;

    makePersistable(this, {
      name: "AuthStore",
      properties: ["token", "isLogged", "user", "language"],
      storage,
    });
  }

  company = {};
  companyList = [];
  language = "tr";
  user = null;
  isLogged = false;
  token = {
    access_token: null,
  };

  setLanguage(lang) {
    this.language = lang;
  }
  setCompanyList(data) {
    this.companyList = data;
  }
  setCompany(company) {
    this.company = company;
  }
  setLogged(status) {
    this.isLogged = status;
  }
  setUser(user) {
    this.user = user;
  }
  setToken(token) {
    this.token = token;
  }
  logOut() {
    this.user = null;
    this.isLogged = false;
    this.token = {
      access_token: null,
    };
  }

  get accessToken() {
    return this.token.access_token;
  }
  
  async hydrateStore() {
    await hydrateStore(this);
  }
}

const authStore = new AuthStore();
export { authStore };
