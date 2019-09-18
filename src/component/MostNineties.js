import React, { Component } from "react";
import APIServices from "../Service";
import { Spinner, Table } from "react-bootstrap";
import { Card, CardTitle, CardBody } from 'reactstrap';

class MostNineties extends Component {

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

        var ninetiesCount = {};
        batsmanScore.filter(function (item) {
            return item.totalBatsmanScore >= 90 && item.totalBatsmanScore < 100
        }).forEach(function (i) {
            ninetiesCount[i._id.batsman] = (ninetiesCount[i._id.batsman] || 0) + 1;
        });
        const sortedBatsmanScore = Object.keys(ninetiesCount).sort(function (a, b) { return ninetiesCount[b] - ninetiesCount[a] });

        return (
            <Card className="text-white bg-info">
                <CardBody>
                    <CardTitle><h1 style={{ color: "#1303fc" }}>Most Nineties</h1></CardTitle>
                    <Table striped bordered hover variant="primary">
                        <thead>
                            <tr>
                                <th>Batsman</th>
                                <th>90s</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedBatsmanScore.map((batsman, index) => (
                                <tr key={index + 1}>
                                    <td>{batsman}</td>
                                    <td>{ninetiesCount[batsman]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        );
    }
}

export default MostNineties;
