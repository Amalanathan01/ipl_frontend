import React, { Component } from "react";
import APIServices from "../Service";
import { Spinner, Table } from "react-bootstrap";
import { Card, CardTitle, CardBody, Row, Col, CardFooter } from 'reactstrap';
var HashMap = require('hashmap');

class TeamCompare extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            teams: [],
            team1: "",
            team2: "",
            matches: [],
            apicall: true
        };

        this.onTeam1Change = this.onTeam1Change.bind(this);
        this.onTeam2Change = this.onTeam2Change.bind(this);
    }
 
    componentDidMount() {
        APIServices.getTeams().then(res => {
            this.setState({
                teams: res.data.data.teams,
                loading: true
            })
        }
        );
    }

    componentDidUpdate() {
        if (this.state.team1 && this.state.team2 && this.state.apicall) {
            APIServices.getAllMatchesForTeams(this.state.team1, this.state.team2).then(res => {

                this.setState({
                    matches: res.data.data.match,
                    apicall: false
                })
            }
            )
        }
    }

    onTeam1Change(e) {
        e.preventDefault();
        this.setState({
            team1: e.target.value,
            apicall: true
        })
    }

    onTeam2Change(e) {
        e.preventDefault();
        this.setState({
            team2: e.target.value,
            apicall: true
        })
    }

    render() {
        const {
            loading,
            teams,
            team1,
            team2,
            matches
        } = this.state;

        const teamDropDown = [];

        teams.forEach((value, key) => teamDropDown.push(value.teamName));

        if (!loading)
            return (
                <div className="mt-5 text-center">
                    <Spinner animation="border" role="status" />{" "}
                </div>
        );
        return (
            <Card className="text-white bg-info">
            <CardTitle><h1 style={{ color: "#1303fc" }}>Team Compare</h1></CardTitle>
            <CardBody>
               <Row>
                  <Col>
                            <select
                                className="w-25 d-inline form-control form-control-sm"
                                onChange={this.onTeam1Change}
                            >
                                <option style={{ backgroundColor: 'green', color: 'blue' }}>All</option>
                                {
                                    teamDropDown.map(team => (
                                        <option key={team}>{team}</option>
                                    ))
                                }
                            </select>
                        </Col>
                        <Col>
                            <select
                                className="w-25 d-inline form-control form-control-sm"
                                onChange={this.onTeam2Change}
                            >
                                <option style={{ backgroundColor: 'green', color: 'blue' }}>All</option>
                                {
                                    teamDropDown.map(team => (
                                        <option key={team}>{team}</option>
                                    ))
                                }
                            </select>
                            </Col>
                    </Row>
                    <Table striped bordered hover variant="primary">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Season</th>
                                <th>City</th>
                                <th>Date</th>
                                <th>Team1</th>
                                <th>Team2</th>
                                <th>Winner</th>
                                <th>Venue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matches.map(match => (
                                <tr
                                    key={match.id}
                                >
                                    <td>{match.id}</td>
                                    <td>{match.season}</td>
                                    <td>{match.city}</td>
                                    <td>{match.date}</td>
                                    <td>{match.team1}</td>
                                    <td>{match.team2}</td>
                                    <td>{match.winner}</td>
                                    <td>{match.venue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
            </CardBody>
            </Card>
);
  }
}

export default TeamCompare;
