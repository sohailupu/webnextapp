import { instance } from "../libs/client";

class FlexJunctionService {
   
  async createFlexJunction(body) {
    return await instance.post("flex-junction/create", body);
  }

  async finishFlexJunction(id, body) {
    return await instance.post(`flex-junction/finish/${id}`, body);
  }
  async qualityFlexJunction(id, body) {
    return await instance.put(`flex-junction/quality/${id}`, body);
  }

  async addJunctionManual(body) {
    return await instance.post("flex-junction/manual/create", body);
  }

  async getQualityJunctions(body) {
      const { data } = await instance.post(`flex-junction/list/for/quality`, body);
      return data;
    }

    async getQualityJunctionsByOperationId(operationId , body) {
     
      const { data } = await instance.post(`flex-junction/list/for/quality/operation/${operationId}`, body);
      return data;
    }
  
  

  }
  const flexJunctionService = new FlexJunctionService();
  export { flexJunctionService };