import React from "react";
import { Spinner, Table } from "react-bootstrap";

const Matches = ({ matches, loading, history }) => {
  if (!loading)
    return (
      <div className="mt-5 text-center">
        <Spinner animation="border" role="status" />{" "}
      </div>
    );

  return (
    <Table striped bordered hover>
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
            onClick={() => history.push("/matches/" + match.id)}
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
  );
};

export default Matches;
