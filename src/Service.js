import axios from "axios";

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
};

const API_URL = "http://localhost:8001/graphql";

class APIServices {
    getAllMatches = () => {
        const getMatchQuery = `query {
          matches {
              id
              season
              city
              date
              team1
              team2
              winner
              venue
          }
        }`;
        return axios.post(
            API_URL,
            {
                query: getMatchQuery
            }, {
                headers: headers
            });
  };
    getMatchDetails = (id) => {
        const getDeliveriesQuery = `query match($matchid : Int!) {
           match(matchid : $matchid) {
            delivery {
             inning
             batting_team
             bowling_team
             over
             ball
             batsman
             non_striker
             bowler
             is_super_over
             wide_runs
             bye_runs
             legbye_runs
             noball_runs
             penalty_runs
             batsman_runs
             extra_runs
             total_runs
             player_dismissed
             dismissal_kind
             fielder
            }
           }
        }`;

        const graphqlVariables = {
            "matchid" : parseInt(id)
        };

        return axios.post(
            API_URL,
            {
                query: getDeliveriesQuery,
                variables: graphqlVariables
            }, {
                headers: headers
            });;
  };
}

export default new APIServices();
