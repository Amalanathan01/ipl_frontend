import axios from "axios";

const BASE_URL = "http://localhost:8001/";
const API_URL = BASE_URL + "graphql";
const LOGIN_URL = BASE_URL + "login";
const SIGNUP_URL = BASE_URL + "signup";

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
};

class APIServices {
    login = (username, password) => {
        return axios.post(LOGIN_URL, {
            "username": username,
            "password": password
        }, { headers: headers });
    };

    signup = (username, password) => {
        return axios.post(SIGNUP_URL, {
            "username": username,
            "password": password,
            "role": "ipluser"
        }, { headers: headers });
    };

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

    getAllMatchesForTeams = (team1, team2) => {
        const graphqlVariables = {
            "team1": team1,
            "team2": team2
        };
        const getMatchQuery = `query match($team1 : String, $team2 : String) {
          match (team1 : $team1, team2 : $team2){
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
                query: getMatchQuery,
                variables: graphqlVariables
            }, {
                headers: headers
            });
    };

    getBatsmanDetails = () => {
        const getMatchQuery = `query {
          batsmanScore {
              _id {
                batsman
                match_id
                opponent
              }
            totalBatsmanScore
            balls
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

    getFoursOrSixes = (id) => {
        const graphqlVariables = {
            "batsman_runs": parseInt(id)
        };
        const getMatchQuery = `query batsmanFoursOrSixes($batsman_runs : Int!) {
          batsmanFoursOrSixes(batsman_runs : $batsman_runs) {
            _id {
              batsman
            }
            noOfFoursOrSixes
          }    
        }`;
        return axios.post(
            API_URL,
            {
                query: getMatchQuery,
                variables: graphqlVariables
            }, {
                headers: headers
            });
    };

    getTeams = () => {
        const getMatchQuery = `query {
         teams{
          teamName
         }
        }`;
        return axios.post(
            API_URL,
            {
                query: getMatchQuery,
            }, {
                headers: headers
            });
    };

    getPlayers = () => {
        const getMatchQuery = `query {
         players{
           teamName
           playerName
         }
        }`;
        return axios.post(
            API_URL,
            {
                query: getMatchQuery,
            }, {
                headers: headers
            });
    };

    getMatchDetails = (id) => {
        const getDeliveriesQuery = `query match($matchid : Int) {
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
