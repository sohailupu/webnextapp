import { instance } from "../libs/client";

class PollService {
  async getPolls() {
    const { data } = await instance.get("polls/user");
    return data;
  }

  async createPoll(body) {
    return await instance.post("polls", body);
  }

  async votePoll(body) {
    const { data } = await instance.post("/polls/vote", body);
    return data;
  }

  async getPollById(id) {
    const { data } = await instance.post(`polls/calculate/${id}`);
    return data;
  }
  async deletePoll(id) {
    return await instance.delete(`polls/${id}`);
  }

  async retweetPoll(id) {
    return await instance.post(`polls/repeat/${id}`);
  }
  async seePoll(id) {
    return await instance.get(`polls/question/${id}`);
  }
  async FinishPoll(id) {
    return await instance.put(`polls/completed/${id}`);
  }
}
const pollService = new PollService();
export { pollService };
