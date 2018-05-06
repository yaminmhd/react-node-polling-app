import React, { Component } from "react";
import { Button } from "semantic-ui-react";

class AskQn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: [],
      answer: undefined
    };
    this.populateChoices = this.populateChoices.bind(this);
  }

  populateChoices() {
    const choices = Object.keys(this.props.question);
    choices.shift();
    this.setState({ choices, answer: sessionStorage.answer });
  }

  updateResults(choice) {
    this.setState({ answer: choice });
    sessionStorage.answer = choice;
    this.props.emit("incrementResults", {
      question: this.props.question,
      choice: choice
    });
  }

  addChoiceButton(choice, i) {
    const colorTypes = ["olive", "blue", "orange", "purple"];
    return (
      <div
        key={i}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr))",
          justifyItems: "center"
        }}
      >
        <Button
          onClick={this.updateResults.bind(this, choice)}
          color={colorTypes[i]}
          size="massive"
        >
          {choice}: {this.props.question[choice]}
        </Button>
      </div>
    );
  }

  componentDidMount() {
    this.populateChoices();
  }

  componentWillReceiveProps() {
    this.populateChoices();
  }

  render() {
    return (
      <div>
        {this.state.answer ? (
          <div style={{ textAlign: "center" }}>
            <h2>You answered: {this.state.answer}</h2>
            <h4>{this.props.question[this.state.answer]}</h4>
          </div>
        ) : (
          <div>
            <h2 style={{ textAlign: "center" }}>
              {this.props.question.question}
            </h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {this.state.choices.map(this.addChoiceButton.bind(this))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AskQn;
