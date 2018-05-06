import React, { Component } from "react";
import Display from "./Display";
import JoinSpeaker from "./JoinSpeaker";
import Attendance from "./Attendance";
import Questions from "./Questions";
import { Divider, Icon } from "semantic-ui-react";
import { Message } from "semantic-ui-react";

class Speaker extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: true };
  }
  handleDismiss = () => {
    this.setState({ visible: false });
  };

  render() {
    const messageVisibility = this.state.visible ? (
      <Message
        success
        onDismiss={this.handleDismiss.bind(this)}
        header="Welcome to your presentation session!"
        content="Choose from the following questions provided to start polling audience."
      />
    ) : null;
    return (
      <div>
        <Display if={this.props.status === "connected"}>
          <Display
            if={this.props.member.name && this.props.member.type === "speaker"}
          >
            {messageVisibility}
            <Questions questions={this.props.questions} emit={this.props.emit} />
            <br />
            <Divider horizontal>
              <Icon name="sort" />
            </Divider>
            <Attendance audience={this.props.audience} />
          </Display>

          <Display if={!this.props.member.name}>
            <h2>Start the presentation</h2>
            <JoinSpeaker emit={this.props.emit} />
          </Display>
        </Display>
      </div>
    );
  }
}

export default Speaker;
