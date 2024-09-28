import { instance } from "../libs/client";
import { authStore } from "../stores/auth.store";

class ProductService {
  async addProduct(data) {
    return await instance.post("product", data);
  }

  async addOperation(id, data) {
    return await instance.post(`product/operation/${id}`, data);
  }

  async updateProductOperationDetails(id, type) {
    return await instance.get(`product/operation/${type}/${id}`);
  }

  async updateProductOperation(id, data) {
    return await instance.put(`product/operation/${id}`, data);
  }

  async updateProduct(id, data) {
    return await instance.put(`product/${id}`, data);
  }

  async productDetailData(id) {
    const { data } = await instance.get(`product/${id}`);
    return data;
  }

  async rawMaterialsDetail(id) {
    const { data } = await instance.get(`product/list/raw-materials/for/supply/${id}`);
    return data;
  }

  async getAllListProduct() {
    const data = await instance.get("product/only/stock-card");
    return data;
  }

  async getRawMaterialOperations(id) {
    return await instance.get(`product/raw-material/operations/${id}`);
  }

  async deleteOperation(productId, id, type) {
    return await instance.delete(`product/operation/${type}/${productId}/${id}`);
  }

  async updateOperation(productId, data) {
    return await instance.post(`product/operation/order/${productId}`, data);
  }

  async getAssemblyParts(operationId) {
    return await instance.get(`product/assembly/parts/${operationId}`);
  }

  async deleteProduct(id) {
    return await instance.delete(`product/${id}`);
  }

  async listProduct(data) {
    return await instance.get("product", data);
  }

  async createOrder(id, data) {
    return await instance.put(`product/order/${id}`, data);
  }

  async copyOrder(id, data) {
    return await instance.post(`product/copy/order/${id}`, data);
  }

  async productSalesApproval(id, data) {
    return await instance.put(`product/raw/material/${id}`, data);
  }

  async productRawMaterialQualityApproval(id, data) {
    return await instance.put(`product/quality/raw/material/${id}`, data);
  }

  async updateStockAmount(id, data) {
    return await instance.put(`product/piece/${id}`, data);
  }

  async updateStockInternalAndExternal(type, id, data) {
    return await instance.put(`product/${type}/piece/${id}`, data);
  }

  async copyProduct(id, data) {
    return await instance.put(`product/copy/${id}`, data);
  }

  async copyingFormOrder(id, data) {
    return await instance.post(`product/copying/from/order/${id}`, data);
  }

  async listProductPaginated(pageNo, search = "", sort = "", order = "", take = "", type = "", start = "", end = "") {
    return await instance.get(
      `product/paginated?page=${pageNo}${search ? `&search=${search}` : ""}${sort ? `&sort=${sort}` : ""}${order ? `&order=${order}` : ""}${
        type ? `&type=${type}` : ""
      }${start ? `&start=${start}` : ""}${end ? `&end=${end}` : ""}${take ? `&take=${take}` : ""}`
    );
  }
}
const productService = new ProductService();
export { productService };
