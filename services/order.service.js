import { instance } from "../libs/client";

class OrderService {
  async getOrderByOperation(data) {
    return instance.post("work-order/list-process", data);
  }

  async listOrder(data) {
    return await instance.get("work-order", data);
  }

  // work-order/finished/work-order/:id
  async getFinishedOrderByStock(id) {
    const { data } = await instance.get(`work-order/finished/order/${id}`);
    return data;
  }

  async getPurchasingList() {
    const { data } = await instance.get("work-order/step/web/purchasing/list");
    return data;
  }

  //operation/remainder/id

  async getRemainderPiece(id) {
    return await instance.get(`work-order/operation/remainder/${id}`);
  }

  //step/web/purchasing/list

  async copyOrderData(id) {
    return await instance.get(`work-order/detail/${id}`);
  }

  async getFindOfOrderOperations(id) {
    return await instance.get(`work-order/${id}`);
  }

  async orderStatusActivated(id) {
    return await instance.put(`work-order/status/${id}`);
  }

  async convertOperationData(id, data) {
    return await instance.put(`work-order/convert/${id}`, data);
  }

  async orderDelete(id) {
    return await instance.delete(`work-order/${id}`);
  }

  async products(id) {
    return await instance.get(`work-order/list/for/internal-operation/${id}`);
  }

  async orderStatusActivated(id) {
    return await instance.put(`work-order/status/${id}`);
  }

  async listOrderToProcess(type) {
    const { data } = await instance.get(`work-order/internal/list`);
    return data;
  }

  async getWipOrderList(orderId, productId) {
    return await instance.get(`order/for/wip/${orderId}/${productId}`);
  }

  async ListPurchaseTransactions(type) {
    const { data } = await instance.get(`purchase/list/transactions`);
    return data;
  }

  async listOrderToProcessExternal(type) {
    const { data } = await instance.get(`work-order/external/list`);
    return data;
  }

  async qualityForm(id, data) {
    return await instance.put(`work-order/step/quality/${id}`, data);
  }

  async transferJunctionsToOrder(id, data) {
    return await instance.post(`work-order/transfer/junctions/to/order/${id}`, data);
  }

  async getQualityList() {
    return await instance.get("work-order/step/quality/list");
  }

  async listOrderStep() {
    return await instance.get("work-order/step/list");
  }

  async getQualityListForWeb(body) {
    const { data } = await instance.post("work-order/step/internal/web/quality/list", body);
    return data;
  }

  async getQualityListForExternalOperation(body) {
    const { data } = await instance.post("work-order/step/external/web/quality/list", body);
    return data;
  }

  async getOrderJunctionList(id) {
    return await instance.get(`work-order/junction/${id}`);
  }

  async getExternalOrderJunctionList(id) {
    return await instance.get(`work-order/external/junction/${id}`);
  }

  async getOrderSeparateToNode(data) {
    return await instance.post("work-order/step/splite", data);
  }

  async getOrderCustomerDetail(id) {
    return await instance.get(`order/customer/${id}`);
  }

  async getOrderJunctionDetail(id) {
    return await instance.get(`junction/details/${id}`);
  }

  async getOrderDetails(id) {
    return await instance.get(`order/details/${id}`);
  }

  async sendOrderForWIP(id, data) {
    return await instance.post(`order/send/work-order/${id}`, data);
  }

  async getAddedJunctionToProduct(id) {
    return await instance.get(`work-order/control/product/${id}`);
  }

  async getQualityConfirmData(id) {
    return await instance.get(`work-order/quality/information/${id}`);
  }
  //piece, nodeId, supplierId
  async finishOperation(id, data) {
    return await instance.put(`work-order/control/without/quality/question/${id}`, data);
  }

  async getOperationDetails(id, cardId) {
    const { data } = await instance.get(`work-order/operation/details/${id}/${cardId}`);
    return data;
  }

  async getOperationDetailsPaginated(id, cardId, pageNo) {
    const { data } = await instance.get(`work-order/operation/details/paginated/${id}/${cardId}?page=${pageNo}`);
    return data;
  }

  async getInternalJunctionsForOperationResponsible(id, data) {
    return await instance.post(`junction/for/operation-responsible/list/internal/${id}`, data);
  }
  async getExternalJunctionsForOperationResponsible(id, data) {
    return await instance.post(`junction/for/operation-responsible/list/external/${id}`, data);
  }
  async getCanBeMovedJunctions(operationType, productId, orderOperationId, operationId, stockCode) {
    return await instance.get(`work-order/same/operation/${operationType}/${productId}/${orderOperationId}/${operationId}/${stockCode}`);
  }

  async listOrderPaginated(pageNo, search = "", sort = "", order = "", take = "", body, type = "", start = "", end = "") {
    return await instance.post(
      `work-order/paginated?page=${pageNo}${search ? `&search=${search}` : ""}${sort ? `&sort=${sort}` : ""}${order ? `&order=${order}` : ""}${type ? `&type=${type}` : ""
      }${start ? `&start=${start}` : ""}${end ? `&end=${end}` : ""}${take ? `&take=${take}` : ""}`,
      body
    );
  }
  async listOrderToProcessPaginated(processType = "internal", pageNo, search = "", sort = "", order = "", take = "", body, type = "", start = "", end = "") {
    const { data } = await instance.post(
      `work-order/${processType}/list/paginated?page=${pageNo}${search ? `&search=${search}` : ""}${sort ? `&sort=${sort}` : ""}${order ? `&order=${order}` : ""
      }${type ? `&type=${type}` : ""}${start ? `&start=${start}` : ""}${end ? `&end=${end}` : ""}${take ? `&take=${take}` : ""}`,
      body
    );
    return data;
  }
  async getPurchasingListPaginated(pageNo, search = "", sort = "", order = "", take = "", body, type = "", start = "", end = "") {
    const { data } = await instance.get(
      `work-order/step/web/purchasing/list/paginated?page=${pageNo}${search ? `&search=${search}` : ""}${sort ? `&sort=${sort}` : ""}${order ? `&order=${order}` : ""
      }${type ? `&type=${type}` : ""}${start ? `&start=${start}` : ""}${end ? `&end=${end}` : ""}${take ? `&take=${take}` : ""}`
    );
    return data;
  }

  async purchaseRequest(data) {
    return await instance.post("purchase/create/transactions", data);
  }

  async purchaseRequest(data) {
    return await instance.post("purchase/create/transactions", data);
  }

  async operationsForServicePurchase() {
    const { data } = await instance.get(`work-order/service/purchase/operations`);
    return data;
  }

  async servicePurchase(operationId) {
    const { data } = await instance.get(`work-order/service/purchase/${operationId}`);
    return data;
  }

  async getOrderHeadData() {
    return await instance.get(`work-order/legacy/operation/list`);
  }

  async updateOrderInfo(id, data) {
    return await instance.put(`work-order/${id}`, data);
  }

  async getAllNewOrderInfo() {
    return await instance.get(`order`);
  }

  async getNewOrderInfo(id) {
    return await instance.get(`order/${id}`);
  }
}
const orderService = new OrderService();
export { orderService };
