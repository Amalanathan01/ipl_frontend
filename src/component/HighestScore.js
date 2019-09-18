import React, { Component } from "react";
import APIServices from "../Service";
import { Spinner, Table } from "react-bootstrap";
import { Card, CardTitle, CardBody } from 'reactstrap';

class HighestScore extends Component {

    state = {
        loading: false,
        batsmanScore: []
    };
    componentDidMount() {
        APIServices.getBatsmanDetails().then(res => {
            console.log(res);
            this.setState({
                batsmanScore: res.data.data.batsmanScore,
                loading: true
            })
        }
        );
    }

    render() {
        const {
            loading,
            batsmanScore
        } = this.state;

        
        if (!loading)
            return (
                <div className="mt-5 text-center">
                    <Spinner animation="border" role="status" />{" "}
                </div>
            );
        const batsmanHighestScore = batsmanScore.sort(function (a, b) {
            return b.totalBatsmanScore - a.totalBatsmanScore
        }).slice(0, 10);

        return (
            <Card className="text-white bg-info">
                <CardBody>
                    <CardTitle><h1 style={{ color: "#1303fc" }}>Highest Score</h1></CardTitle>
                    <Table striped bordered hover variant="primary">
                        <thead>
                            <tr>
                                <th>Batsman</th>
                                <th>Highest Score</th>
                                <th>Balls</th>
                                <th>SR</th>
                                <th>Vs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {batsmanHighestScore.map((batsman, index) => (
                                <tr key={index + 1}>
                                    <td>{batsman._id.batsman}</td>
                                    <td>{batsman.totalBatsmanScore}</td>
                                    <td>{batsman.balls}</td>
                                    <td>{(Math.round((batsman.totalBatsmanScore / batsman.balls)*100)*100)/100}</td>
                                    <td>{batsman._id.opponent}</td>
                                </tr>
                            ))}
                        </tbody>
                        </Table>
                </CardBody>
            </Card>
        );
    }
}

export default HighestScore;
