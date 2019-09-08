import React, { Component } from "react";
import APIServices from "../Service";
import routes from '../routes';
import { Spinner, Table } from "react-bootstrap";
import { Scrollbars } from 'react-custom-scrollbars';
import Paginations from "./Pagination";
import { Card } from 'reactstrap';

class MatchDetails extends Component {
  state = {
      loading: false,
      filteredDeliveries: [],
      currentPage: 1,
      resultsPerPage: 10
  };
  componentDidMount() {
      APIServices.getMatchDetails(this.props.match.params.id).then(res => {          
          this.setState({
              filteredDeliveries: res.data.data.match[0].delivery,
              loading: true
          })
      }
    );
    }

    setCurrentPage = number => {
        this.setState({ currentPage: number });
    };

    render() {
        const {
            loading,
            currentPage,
            resultsPerPage,
            filteredDeliveries
        } = this.state;

        const indexOfLastResult = currentPage * resultsPerPage;
        const indexOfFirstResult = indexOfLastResult - resultsPerPage;
        const currentDeliveries = filteredDeliveries.slice(
            indexOfFirstResult,
            indexOfLastResult
        );

        if (!loading)
            return (
                <div className="mt-5 text-center">
                    <Spinner animation="border" role="status" />{" "}
                </div>
        );
        return (
            <Card className="text-white bg-info">
            <Scrollbars style={{ width: 1200, height: 1000 }}>
            
            <Table striped bordered hover variant="primary">
            <thead>
                <tr>
                    <th>Inning</th>
                    <th>Batting Team</th>
                    <th>Bowling Team</th>
                    <th>Over</th>
                    <th>Ball</th>
                    <th>Batsman</th>
                    <th>Bowler</th>
                    <th>Super Over</th>
                    <th>Wide Runs</th>
                    <th>Bye Runs</th>
                    <th>LegBye Runs</th>
                    <th>No Ball Runs</th>
                    <th>Penalty Runs</th>
                    <th>Batsman Runs</th>
                    <th>Extra Runs</th>
                    <th>Total Runs</th>
                    <th>Player Dismissed</th>
                    <th>Dismissed Kind</th>
                    <th>Fielder</th>
                </tr>
            </thead>
            <tbody>
                   {currentDeliveries.map((delivery, index) => (
                    <tr key={index+1}>
                        <td>{delivery.inning}</td>
                        <td>{delivery.batting_team}</td>
                        <td>{delivery.bowling_team}</td>
                        <td>{delivery.over}</td>
                        <td>{delivery.ball}</td>
                        <td>{delivery.batsman}</td>
                        <td>{delivery.bowler}</td>
                        <td>{delivery.is_super_over}</td>
                        <td>{delivery.wide_runs}</td>
                        <td>{delivery.bye_runs}</td>
                        <td>{delivery.legbye_runs}</td>
                        <td>{delivery.noball_runs}</td>
                        <td>{delivery.penalty_runs}</td>
                        <td>{delivery.batsman_runs}</td>
                        <td>{delivery.extra_runs}</td>
                        <td>{delivery.total_runs}</td>
                        <td>{delivery.player_dismissed}</td>
                        <td>{delivery.dismissal_kind}</td>
                        <td>{delivery.fielder}</td>
                    </tr>
                ))}
            </tbody>
            </Table>
            </Scrollbars>
            <Paginations
                resultsPerPage={resultsPerPage}
                totalResults={filteredDeliveries.length}
                paginate={number => this.setCurrentPage(number)}
                currentPage={currentPage}
            />
            </Card>
);
  }
}

export default MatchDetails;
