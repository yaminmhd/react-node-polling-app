import React, { Component } from "react";
import { Form, FormField, Button } from "semantic-ui-react";


class JoinSpeaker extends Component {
  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
    this.titleInput = React.createRef();
    this.start = this.start.bind(this);
  }

  start(event) {
    event.preventDefault();
    const name = this.nameInput.current.value;
    const title = this.titleInput.current.value;
    this.props.emit('speakerStart', {name, title})
  }

  render() {
    return (
      <Form onSubmit={this.start}>
        <FormField>
          <label>Full Name</label>
          <input
            ref={this.nameInput}
            placeholder="enter your full name..."
            required
          />
        </FormField>
        <FormField>
          <label>Presentation Title</label>
          <input
            ref={this.titleInput}
            placeholder="enter a title for this presentation..."
            required
          />
        </FormField>
        <Button primary>Create Presentation</Button>
      </Form>
    );
  }
}

export default JoinSpeaker;
