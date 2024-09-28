import { instance } from "../utils/client";

class MapService {
  async loadMaps() {
    return instance.get("map");
  }

  async loaderMap() {
    const { data } = await instance.get("map");
    return data;
  }

  async saveMaps(data) {
    return instance.post("map", data);
  }

  async updateMaps(data) {
    return instance.post("map", data);
  }

  async returnDefaultMap() {
    return instance.put("map");
  }
}
const mapService = new MapService();
export { mapService };
