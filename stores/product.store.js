import { makeAutoObservable } from "mobx";

class ProductStore {
  constructor() {
    makeAutoObservable(this);
  }

  newProductFirst = [];

  setNewProductFirst(product) {
    this.newProductFirst = product;
  }
}

const productStore = new ProductStore();
export { productStore };
