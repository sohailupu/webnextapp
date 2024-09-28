import { instance } from "../libs/client";

class ChatService {
  async getToken() {
    return instance.post("/messenger/token");
  }
  async createConversation(id) {
    return instance.post("/messenger/create-conversation", {
      ids: [id],
    });
  }
  async sendMessageToSignal(body) {
    return instance.post("/messenger/send-message", body);
  }
  async getTaskGroupDetails(groupTaskId) {
    const { data } = await instance.get(`task/${groupTaskId}`);
    return data;
  }
  async createTask(body) {
    return await instance.post("task/create-item", body);
  }
  async deleteTaskGroup(id) {
    return await instance.delete(`messenger/group/${id}`);
  }
  async updateTask(id, data) {
    return await instance.put(`task/update/${id}`, data);
  }
  async updateTaskStatus(id) {
    return await instance.put(`task/status/${id}`);
  }
  async updateTaskStatusDone(id) {
    return await instance.put(`task/not-approved/${id}`);
  }
  async deleteTask(id) {
    return await instance.delete(`task/${id}`);
  }
  async addNewGroupLabel(groupTaskId, data) {
    return await instance.post(`task/add/label/${groupTaskId}`, data);
  }
  async getGroupConversationsQuery() {
    const { data } = await instance.get("/messenger/group/conversations");
    return data;
  }

  async updateGroup(id, data) {
    return instance.put(
      `messenger/update/${id}`,
      data
      // {
      //   image,
      //   title,
      //   participants,
      //   authorizedParticipants,
      //   endDate,
      // }
    );
  }

  async getGroupConversations() {
    return await instance.get("/messenger/group/conversations");
  }
  async getNewGroup(body) {
    return instance.post("/task/create-group", body);
  }
  async convertDepartmentToNull(id) {
    return instance.post(`/task/delete/department/${id}`);
  }
  async sendTaskComment(id, data) {
    return await instance.post(`task/create/comment/${id}`, data);
  }
  async deleteComment(id, body) {
    return await instance.post(`task/delete/comment/${id}`, body);
  }
  async getConversationChannels() {
    const { data } = await instance.get("/messenger/conversations");
    return data;
  }
  async handleQuiteConversation(id, data) {
    return await instance.put(`messenger/isQuite/${id}`, data);
  }
  async changStarStatusForTask(id, data) {
    return await instance.post(`task/star/status/${id}`, data);
  }
  async filterTasks(conversationId, data) {
    return instance.post(`/task/filter/${conversationId}`, data);
  }
  async getUsers() {
    return instance.get("/messenger/users");
  }
  async getConversations() {
    return instance.get("/messenger/conversations");
  }
  async deleteConversations(id) {
    return await instance.delete(`/messenger/${id}`);
  }
  async leaveGroupConversations(data) {
    return await instance.post(`/messenger/leave/group`, data);
  }

  async getLabelList(id) {
    return await instance.get(`user/department/label/${id}`);
  }

  async sendMessage(channedId, message) {
    return instance.post("/messenger/send", {
      conversationId: channedId,
      body: message,
    });
  }
  async getConversationMessages(ch, limit = 20, order = "desc", pageSize = 20) {
    return instance.post(`messenger/conversation/${ch}`, {
      limit: limit,
      pageSize: pageSize,
      order: order,
    });
  }
  async editGroupLabel(groupTaskId, labelId, body) {
    return await instance.put(
      `task/update/label/${groupTaskId}/${labelId}`,
      body
    );
  }
  async deleteGroupLabel(groupTaskId, labelId) {
    return await instance.delete(`task/label/${groupTaskId}/${labelId}`);
  }
  async taskMoveToGroup(id, data) {
    return await instance.post(`task/move/${id}`, data);
  }
  async getAllMyTAsks(id) {
    const { data } = await instance.get(`task/personal/${id}`);
    return data;
  }
}
const chatService = new ChatService();
export { chatService };
