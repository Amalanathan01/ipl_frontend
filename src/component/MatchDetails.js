import React, { Component } from "react";
import APIServices from "../Service";
import { Spinner, Table } from "react-bootstrap";
import { Card, CardTitle, CardBody, Row, Col, CardFooter } from 'reactstrap';
var HashMap = require('hashmap');

class MatchDetails extends Component {
  state = {
      loading: false,
      filteredDeliveries: []
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

    render() {
        const {
            loading,
            filteredDeliveries
        } = this.state;

        const team1 = filteredDeliveries[0] ? filteredDeliveries[0].batting_team : '';
        const team2 = filteredDeliveries[0] ? filteredDeliveries[0].bowling_team : '';

        const firstInningsBatsmanScore = new HashMap();
        const firstInningsBatsmanBalls = new HashMap();
        var firstInningsExtra = 0;
        const firstInningsBatsmanFours = new HashMap();
        const firstInningsBatsmanSixes = new HashMap();
        const firstInningsBatsmanStrikeRate = new HashMap();

        const secondInningsBatsmanScore = new HashMap();
        const secondInningsBatsmanBalls = new HashMap();
        var secondInningsExtra = 0;
        const secondInningsBatsmanFours = new HashMap();
        const secondInningsBatsmanSixes = new HashMap();
        const secondInningsBatsmanStrikeRate = new HashMap();
        var firstInningsTotal = 0;
        var secondInningsTotal = 0;

        for (var i in filteredDeliveries) {
            if (filteredDeliveries[i].inning === 1) {
                firstInningsBatsmanScore.set(filteredDeliveries[i].batsman, firstInningsBatsmanScore.get(filteredDeliveries[i].batsman) ?
                    (filteredDeliveries[i].batsman_runs + firstInningsBatsmanScore.get(filteredDeliveries[i].batsman)) : filteredDeliveries[i].batsman_runs);
                if (filteredDeliveries[i].wide_runs === 0 && filteredDeliveries[i].bye_runs === 0
                    && filteredDeliveries[i].legbye_runs === 0 && filteredDeliveries[i].noball_runs === 0
                    && filteredDeliveries[i].penalty_runs === 0) {
                    firstInningsBatsmanBalls.set(filteredDeliveries[i].batsman,
                        firstInningsBatsmanBalls.get(filteredDeliveries[i].batsman) ?
                            (firstInningsBatsmanBalls.get(filteredDeliveries[i].batsman) + 1) : 1);
                } else {
                    firstInningsExtra = firstInningsExtra + (filteredDeliveries[i].wide_runs + filteredDeliveries[i].bye_runs
                        + filteredDeliveries[i].legbye_runs + filteredDeliveries[i].noball_runs + filteredDeliveries[i].penalty_runs)
                }
                if (filteredDeliveries[i].batsman_runs === 4) {
                    firstInningsBatsmanFours.set(filteredDeliveries[i].batsman,
                        firstInningsBatsmanFours.get(filteredDeliveries[i].batsman) ? (firstInningsBatsmanFours.get(filteredDeliveries[i].batsman) + 1) : 1);
                } else if (filteredDeliveries[i].batsman_runs === 6) {
                    firstInningsBatsmanSixes.set(filteredDeliveries[i].batsman,
                        firstInningsBatsmanSixes.get(filteredDeliveries[i].batsman) ? (firstInningsBatsmanSixes.get(filteredDeliveries[i].batsman) + 1) : 1);
                }
                firstInningsBatsmanStrikeRate.set(filteredDeliveries[i].batsman,
                    (firstInningsBatsmanScore.get(filteredDeliveries[i].batsman) / firstInningsBatsmanBalls.get(filteredDeliveries[i].batsman)));
                firstInningsTotal = firstInningsTotal + filteredDeliveries[i].total_runs;
            } else {
                secondInningsBatsmanScore.set(filteredDeliveries[i].batsman, secondInningsBatsmanScore.get(filteredDeliveries[i].batsman) ?
                    (filteredDeliveries[i].batsman_runs + secondInningsBatsmanScore.get(filteredDeliveries[i].batsman)) : filteredDeliveries[i].batsman_runs);
                if (filteredDeliveries[i].wide_runs === 0 && filteredDeliveries[i].bye_runs === 0
                    && filteredDeliveries[i].legbye_runs === 0 && filteredDeliveries[i].noball_runs === 0
                    && filteredDeliveries[i].penalty_runs === 0) {
                    secondInningsBatsmanBalls.set(filteredDeliveries[i].batsman,
                        secondInningsBatsmanBalls.get(filteredDeliveries[i].batsman) ?
                            (secondInningsBatsmanBalls.get(filteredDeliveries[i].batsman) + 1) : 1);
                } else {
                    secondInningsExtra = secondInningsExtra + (filteredDeliveries[i].wide_runs + filteredDeliveries[i].bye_runs
                        + filteredDeliveries[i].legbye_runs + filteredDeliveries[i].noball_runs + filteredDeliveries[i].penalty_runs)
                }
                if (filteredDeliveries[i].batsman_runs === 4) {
                    secondInningsBatsmanFours.set(filteredDeliveries[i].batsman,
                        secondInningsBatsmanFours.get(filteredDeliveries[i].batsman) ? (secondInningsBatsmanFours.get(filteredDeliveries[i].batsman) + 1) : 1);
                } else if (filteredDeliveries[i].batsman_runs === 6) {
                    secondInningsBatsmanSixes.set(filteredDeliveries[i].batsman,
                        secondInningsBatsmanSixes.get(filteredDeliveries[i].batsman) ? (secondInningsBatsmanSixes.get(filteredDeliveries[i].batsman) + 1) : 1);
                }
                secondInningsBatsmanStrikeRate.set(filteredDeliveries[i].batsman,
                    (secondInningsBatsmanScore.get(filteredDeliveries[i].batsman) / secondInningsBatsmanBalls.get(filteredDeliveries[i].batsman)));
                secondInningsTotal = secondInningsTotal + filteredDeliveries[i].total_runs;
            }
        }

        const firstInningsMap = Object.entries(firstInningsBatsmanScore).map(([key, value]) => {
            return value;
        })

        const firstInnings = Object.entries(firstInningsMap[0]).map(([key, value]) => {
            return value[0];
        });

        const secondInningsMap = Object.entries(secondInningsBatsmanScore).map(([key, value]) => {
            return value;
        })

        const secondInnings = Object.entries(secondInningsMap[0]).map(([key, value]) => {
            return value[0];
        });

        if (!loading)
            return (
                <div className="mt-5 text-center">
                    <Spinner animation="border" role="status" />{" "}
                </div>
        );
        return (
            <Card className="text-white bg-info">
            <CardBody>
            <CardTitle><h1 style={{ color: "#1303fc" }}>Match Summary</h1></CardTitle>
            <Card className="text-white bg-info">
                            <CardTitle>
                                {team1}
                            </CardTitle>
                            <CardBody>
                                <Table striped bordered hover variant="primary">
                                    <thead>
                                        <tr>
                                            <th>Batsman</th>
                                            <th>Runs</th>
                                            <th>Balls</th>
                                            <th>4s</th>
                                            <th>6s</th>
                                            <th>SR</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {firstInnings.map((inning, index) => (
                                            <tr key={index + 1}>
                                                <td>{inning}</td>
                                                <td>{firstInningsBatsmanScore.get(inning)}</td>
                                                <td>{firstInningsBatsmanBalls.get(inning)}</td>
                                                <td>{firstInningsBatsmanFours.get(inning)}</td>
                                                <td>{firstInningsBatsmanSixes.get(inning)}</td>
                                                <td>{(Math.round(firstInningsBatsmanStrikeRate.get(inning)*100)*100)/100}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    </Table>
                        </CardBody>
                        <CardFooter style={{ color: "#1303fc" }}>
                            <Row>
                                <Col>
                                    <div>Extras : {firstInningsExtra}</div>
                                </Col>
                                <Col>
                                    <div>Total : {firstInningsTotal}</div>
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card>
                    <Card className="text-white bg-info">
                        <CardTitle>
                            {team2}
                        </CardTitle>
                        <CardBody>
                            <Table striped bordered hover variant="primary">
                                <thead>
                                    <tr>
                                        <th>Batsman</th>
                                        <th>Runs</th>
                                        <th>Balls</th>
                                        <th>4s</th>
                                        <th>6s</th>
                                        <th>SR</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {secondInnings.map((inning, index) => (
                                        <tr key={index + 1}>
                                            <td>{inning}</td>
                                            <td>{secondInningsBatsmanScore.get(inning)}</td>
                                            <td>{secondInningsBatsmanBalls.get(inning)}</td>
                                            <td>{secondInningsBatsmanFours.get(inning)}</td>
                                            <td>{secondInningsBatsmanSixes.get(inning)}</td>
                                            <td>{(Math.round(secondInningsBatsmanStrikeRate.get(inning) * 100) * 100) / 100}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                        <CardFooter style={{ color: "#1303fc" }}>
                            <Row>
                                <Col>
                                    <div>Extras : {secondInningsExtra}</div>
                                </Col>
                                <Col>
                                    <div>Total : {secondInningsTotal}</div>
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card>
             </CardBody>
            </Card>
);
  }
}

export default MatchDetails;
