import { makeAutoObservable } from "mobx";


class MaintinanceStore {
  constructor() {
    makeAutoObservable(this);
  }

  maintinances = [];
  loading = true;

  async getMaintinances() {
    // const { data } = await maintinanceService.getMaintinances();
    
    // this.maintinances = data;
    this.loading = false;
  }
}
const maintinanceStore = new MaintinanceStore();
export { maintinanceStore };
