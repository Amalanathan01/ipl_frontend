import React, { Component } from "react";

class FilterSearch extends Component {  

    constructor(props) {
        super(props);
        const year = (new Date()).getFullYear();
        this.state = {
            years: Array.from(new Array(40), (val, index) => year - index).reverse(),
            searchText: ""
        };
    }

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
    const { onYearChange } = this.props;
    return (
      <div className="mt-5">
        <select
          className="w-25 d-inline form-control form-control-sm"
          onChange={onYearChange}
        >
        <option style={{ backgroundColor: 'green', color: 'blue' }}>All</option>
          {years.map(year => (
            <option key={year}>{year}</option>
          ))}
        </select>
        <span >&nbsp; &nbsp;</span>
        <input
          className="w-25 d-inline form-control form-control-sm"
          style={{paddingLeft: 100}}
          placeholder="Search Team"
          value={searchText}
          onChange={this.handleSearch}
        />
      </div>
    );
  }
}

export default FilterSearch;