import React from "react";
import PropTypes from "prop-types";
import { Icon, Grid, Label } from "semantic-ui-react";

const Header = props => (
  <Grid>
    <Grid.Row>
      <Grid.Column width={14}>
        <Label color="yellow" size="large">
          <Icon name="pin"/>
          Joined Session
          <Label.Detail>
            {props.title ? props.title : "No session available"}
          </Label.Detail>
        </Label>

        <Label color="yellow" size="large">
          <Icon name="user" />
          Speaker
          <Label.Detail>
            {props.speaker ? props.speaker : "Speaker hasn't entered session"}
          </Label.Detail>
        </Label>
      </Grid.Column>
      <Grid.Column textAlign="right" width={2}>
        <div>
          {props.status === "connected" ? (
            <Icon color="green" size="big" name="check circle outline" />
          ) : (
            <Icon color="red" size="big" name="remove circle outline" />
          )}
        </div>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

// Header.defaultProps = {
//   status: "disconnected"
// };

Header.propTypes = {
  title: PropTypes.string
};

export default Header;
