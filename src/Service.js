import axios from "axios";

const headers = {
  "Content-Type": "application/json"
};

class APIServices {
  getAllMatches = () => {
      return axios.get("http://localhost:8001/matches", { headers });
  };
  getMatchDetails = (id) => {
      return axios.get(`http://localhost:8001/delivery/${id}`, { headers });
  };
}

export default new APIServices();
