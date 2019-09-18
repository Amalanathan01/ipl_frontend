import React, { Component } from "react";
import APIServices from "../Service";
import { Spinner, Table } from "react-bootstrap";
import { Card, CardTitle, CardBody } from 'reactstrap';

class MostFours extends Component {

    state = {
        loading: false,
        batsmanFoursOrSixes: []
    };
    componentDidMount() {
        APIServices.getFoursOrSixes(4).then(res => {
            console.log(res);
            this.setState({
                batsmanFoursOrSixes: res.data.data.batsmanFoursOrSixes,
                loading: true
            })
        }
        );
    }

    render() {
        const {
            loading,
            batsmanFoursOrSixes
        } = this.state;


        if (!loading)
            return (
                <div className="mt-5 text-center">
                    <Spinner animation="border" role="status" />{" "}
                </div>
            );

        batsmanFoursOrSixes.sort(function (a, b) {
            return b.noOfFoursOrSixes - a.noOfFoursOrSixes
        })

        return (
            <Card className="text-white bg-info">
                <CardBody>
                    <CardTitle><h1 style={{ color: "#1303fc" }}>Most Sixes</h1></CardTitle>
                    <Table striped bordered hover variant="primary">
                        <thead>
                            <tr>
                                <th>Batsman</th>
                                <th>6s</th>
                            </tr>
                        </thead>
                        <tbody>
                            {batsmanFoursOrSixes.map((batsman, index) => (
                                <tr key={index + 1}>
                                    <td>{batsman._id.batsman}</td>
                                    <td>{batsman.noOfFoursOrSixes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        );
    }
}

export default MostFours;
