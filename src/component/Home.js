import React, { Component } from "react";
import APIservices from "../Service";
import Paginations from "./Pagination";
import FilterSearch from "./FilterSearch";
import Matches from "./Matches";

class Home extends Component {
  state = {
    initalMatches: [],
    filteredMatches: [],
    loading: false,
    currentPage: 1,
    resultsPerPage: 20
  };

  componentDidMount() {
    APIservices.getAllMatches()
      .then(res =>
        this.setState({
          initalMatches: res.data,
          filteredMatches: res.data,
          loading: true
        })
      )
      .catch(err => console.log(err));
  }

  setCurrentPage = number => {
    this.setState({ currentPage: number });
  };

  filter = year => {
    const { initalMatches } = this.state;
    this.setState({
      filteredMatches:
        year === "All"
          ? initalMatches
          : initalMatches.filter(match => match.season === year)
    });
  };

  search = text => {
    const { initalMatches, filteredMatches } = this.state;
    this.setState({
      filteredMatches: initalMatches.filter(
        item =>
          item.team1.toLowerCase().includes(text) ||
          item.team2.toLowerCase().includes(text)
      )
    });
  };

  render() {
    const {
      filteredMatches,
      loading,
      currentPage,
      resultsPerPage
    } = this.state;
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentMatches = filteredMatches.slice(
      indexOfFirstResult,
      indexOfLastResult
    );

    return (
      <div className="container mt-5">
        <FilterSearch
          onYearChange={e => this.filter(e.target.value)}
          onTextChange={text => this.search(text)}
        />
        <Matches
          matches={currentMatches}
          loading={loading}
          history={this.props.history}
        />
        <Paginations
          resultsPerPage={resultsPerPage}
          totalResults={filteredMatches.length}
          paginate={number => this.setCurrentPage(number)}
          currentPage={currentPage}
        />
      </div>
    );
  }
}

export default Home;