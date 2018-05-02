import React from "react";
import { Table, Icon } from "semantic-ui-react";

const addMemberRow = (member, i) => {
  return (
    <Table.Row key={i}>
      <Table.Cell>
        <Icon name="user" color="green" />
        {member.name}
      </Table.Cell>
      <Table.Cell>
        <Icon name="id badge" color="orange" />
        {member.id}
      </Table.Cell>
    </Table.Row>
  );
};

const Attendance = props => (
  <div>
    <h2>
      Attendance - {props.audience.length}{" "}
      {props.audience.length > 1 ? "members" : "member"}
    </h2>
    <Table basic="very" celled collapsing>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Audience Member</Table.HeaderCell>
          <Table.HeaderCell>Socket ID</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{props.audience.map(addMemberRow)}</Table.Body>
    </Table>
  </div>
);

export default Attendance;
