import { instance } from "../libs/client";

class RoleService {
  async getRoles() {
    return instance.get(`roles/list`);
  }
}
const roleService = new RoleService();
export { roleService };
