import React, { Component } from "react";
import APIServices from "../Service";
import { Spinner, Table } from "react-bootstrap";
import { Card, CardTitle, CardBody } from 'reactstrap';

class MostHundreds extends Component {

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

        var hundredsCount = {};
        batsmanScore.filter(function (item) {
            return item.totalBatsmanScore >= 100
        }).forEach(function (i) {
            hundredsCount[i._id.batsman] = (hundredsCount[i._id.batsman] || 0) + 1;
        });
        const sortedBatsmanScore = Object.keys(hundredsCount).sort(function (a, b) { return hundredsCount[b] - hundredsCount[a] });

        return (
            <Card className="text-white bg-info">
                <CardBody>
                    <CardTitle><h1 style={{ color: "#1303fc" }}>Most Hundreds</h1></CardTitle>
                    <Table striped bordered hover variant="primary">
                        <thead>
                            <tr>
                                <th>Batsman</th>
                                <th>100s</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedBatsmanScore.map((batsman, index) => (
                                <tr key={index + 1}>
                                    <td>{batsman}</td>
                                    <td>{hundredsCount[batsman]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        );
    }
}

export default MostHundreds;
