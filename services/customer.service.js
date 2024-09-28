import { instance } from "../libs/client";

class CustomerService {
  async addCustomerGroup(body) {
    return await instance.post("customer/group", body);
  }

  async getCustomerGroupList() {
    return await instance.get("customer/list/groups");
  }

  async getCustomerList() {
    return await instance.get("customer");
  }

  async groupListForId(id) {
    return await instance.get(`customer/list-by-group/${id}`);
  }

  async updateCustomer(id, body) {
    return await instance.put(`customer/${id}`, body);
  }

  async deleteCustomer(id) {
    return await instance.delete(`customer/${id}`);
  }

  async addCustomer(body) {
    return await instance.post("customer", body);
  }

  async getCustomerListForOrder(id) {
    return await instance.get(`customer/group/for/order`);
  }

  async findOneCustomer(id) {
    return await instance.get(`customer/${id}`);
  }
}
const customerService = new CustomerService();
export { customerService };
