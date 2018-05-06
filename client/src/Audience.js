import React, { Component } from "react";
import Display from "./Display";
import Join from "./Join";
import AskQn from './AskQn';

class Audience extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: true };
  }

  handleDismiss = () => {
    this.setState({ visible: false });
  };

  render() {
    // const messageVisibility = this.state.visible ? (
    //   <Message
    //     success
    //     onDismiss={this.handleDismiss.bind(this)}
    //     header="Welcome!"
    //     content="You have joined the session successfully!"
    //   />
    // ) : null;

    return (
      <div>
        <Display if={this.props.status === "connected"}>
          <Display if={this.props.member.name}>
            <Display if={!this.props.currentQuestion}>
              <h2>Welcome {this.props.member.name}</h2>
              <p>{this.props.audience.length} audience members connected</p>
              <p>Questions will appear here.</p>
            </Display>

            <Display if={this.props.currentQuestion}>
              <AskQn emit={this.props.emit} question={this.props.currentQuestion}/>
            </Display>

          </Display>
          <Display if={!this.props.member.name}>
            <h1>Enter your name to join a presentation session</h1>
            <Join emit={this.props.emit} />
          </Display>
        </Display>
      </div>
    );
  }
}

export default Audience;
