import { instance } from "../libs/client";

class FlexProductService {
  async getOperationJunctionList(id) {
    const { data } = await instance.get(`junction/operation/${id}`);
    return data;
  }

  async getFlexProductListPaginated(pageNo) {
    const { data } = await instance.get(`flex-product/for/web/paginated/?page=${pageNo}`);
    return data;
  }

  async getFlexProductListPaginatedNew(pageNo, search = "", sort = "", order = "", take = "", body, type = "", start = "", end = "") {
  const {data} = await instance.post( `flex-product/for/web/paginated/new?page=${pageNo}${search ? `&search=${search}` : ""}${sort ? `&sort=${sort}` : ""}${order ? `&order=${order}` : ""}${type ? `&type=${type}` : ""}${start ? `&start=${start}` : ""}${end ? `&end=${end}` : ""}${take ? `&take=${take}` : ""}`, body);
  return data;
}

  // for/web/paginated/new

  async createFlexProduct(body) {
    return await instance.post("flex-product/", body);
  }

  async createFlexRawMaterial(body) {
    return await instance.post("flex-raw-material/", body);
  }

  async updateFlexRawMaterial(id, body) {
    return await instance.put(`flex-raw-material/${id}`, body);
  }

  async getFlexRawMaterialList() {
    return await instance.get("flex-raw-material");
  }

  async updateFlexProduct(id, body) {
    return await instance.put(`flex-product/${id}`, body);
  }

  async getAllFlexProduct() {
    const data = await instance.get("flex-product/for/web");
    return data;
  }

  async listFlexProductPaginated(pageNo, search = "", sort = "", order = "", take = "", body, type = "", start = "", end = "") {
    return await instance.post(
      `flex-product/mes/flex/paginated?page=${pageNo}${search ? `&search=${search}` : ""}${sort ? `&sort=${sort}` : ""}${order ? `&order=${order}` : ""}${
        type ? `&type=${type}` : ""
      }${start ? `&start=${start}` : ""}${end ? `&end=${end}` : ""}${take ? `&take=${take}` : ""}`,
      body
    );
  }

  // async getOrderCustomerDetail(id) {
  //   return await instance.get(`flex-product/order-customer/${id}`);
  // }

  async getFlexProductById(id) {
    const data = await instance.get(`flex-product/${id}`);
    return data;
  }

  async getListProcess(type) {
    return instance.get(`flex-product/processType/${type}`);
  }

  async deleteFlexOperation(productId, operationId) {
    return await instance.put(`flex-product/operation/${operationId}`, productId);
  }

  async updateFlexOperation(operationId, data) {
    return await instance.put(`flex-product/edit-operation/${operationId}`, data);
  }

  async updateFlexOperationCycleTime(operationId, data) {
    return await instance.put(`flex-product/edit-operation/cycle-time/${operationId}`, data);
  }

  async getOperationDetails(id, cardId) {
    const { data } = await instance.get(`flex-product/operation/details/${id}/${cardId}`);
    return data;
  }

  async getFlexMultiOperationOneList(id) {
    const { data } = await instance.get(`flex-product/single-operation/details/${id}`);
    return data;
  }

  async updateProductOperation(id, data) {
    return await instance.put(`flex-product/operation/${id}`, data);
  }
}
const flexProductService = new FlexProductService();
export { flexProductService };
