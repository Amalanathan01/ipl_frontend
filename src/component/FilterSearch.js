import React, { Component } from "react";

class FilterSearch extends Component {
  state = {
    years: [
      2008,
      2009,
      2010,
      2011,
      2012,
      2013,
      2014,
      2015,
      2016,
      2017,
      2018,
      2019
    ],
    searchText: ""
  };

  handleSearch = e => {
    const { onTextChange } = this.props;
    const { value } = e.target;
    this.setState({
      searchText: value
    });
    onTextChange(value);
  };
  render() {
    const { years, searchText } = this.state;
    const { onYearChange, onTextChange } = this.props;
    return (
      <div className="mt-5">
        <select
          className="w-25 d-inline form-control form-control-sm"
          onChange={onYearChange}
        >
          <option>All</option>
          {years.map(year => (
            <option key={year}>{year}</option>
          ))}
        </select>
        <input
          className="d-inline"
          placeholder="Search Team"
          value={searchText}
          onChange={this.handleSearch}
        />
      </div>
    );
  }
}

export default FilterSearch;