import axios from "axios";

const headers = {
  "Content-Type": "application/json"
};

class APIServices {
  getAllMatches = () => {
    return axios.get("./Matches.json", { headers });
  };
  getMatchDetails = () => {
    return axios.get("./Matches.json", { headers });
  };
}

export default new APIServices();
