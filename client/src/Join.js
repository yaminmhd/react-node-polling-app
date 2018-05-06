import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, FormField, Button } from "semantic-ui-react";

class Join extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.joinSession = this.joinSession.bind(this);
  }

  joinSession(event) {
    event.preventDefault();
    const currentMember = this.textInput.current.value;
    this.props.emit("memberJoin", { name: currentMember });
  }

  render() {
    return (
      <Form success onSubmit={this.joinSession}>
        <FormField>
          <label>Full Name</label>
          <input
            ref={this.textInput}
            placeholder="enter your full name..."
            required
          />
        </FormField>
        <Button primary>Join the session</Button>
        <Link style={{marginLeft: '5px'}} to="/speaker">Join as the speaker</Link>
        <Link style={{marginLeft: '5px'}} to="/board">View board</Link>
      </Form>
    );
  }
}

export default Join;
