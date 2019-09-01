import React, { Component } from "react";
import APIServices from "../Service";

class MatchDetails extends Component {
  state = {
    match: []
  };
  ComponentDidMount() {
    APIServices.getMatchDetails().then(res =>
      this.setState({ match: res.data })
    );
  }
  render() {
    return <h1>Work in progress</h1>;
  }
}

export default MatchDetails;
