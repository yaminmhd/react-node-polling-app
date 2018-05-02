import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";

class AskQn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: []
    };
    this.populateChoices = this.populateChoices.bind(this);
  }

  populateChoices() {
    const choices = Object.keys(this.props.question);
    choices.shift();
    this.setState({ choices });
  }

  updateResults(choice) {
    this.props.emit("incrementResults", { choice: choice });
  }

  addChoiceButton(choice, i) {
    const colorTypes = ["olive", "blue", "orange", "purple"];
    return (
      <Grid.Column>
        <Button
          onClick={this.updateResults.bind(this, choice)}
          color={colorTypes[i]}
          key={i}
          size="massive"
        >
          {choice}: {this.props.question[choice]}
        </Button>
      </Grid.Column>
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
        <h2>{this.props.question.question}</h2>
        <Grid>
          <Grid.Row columns={4}>
            {this.state.choices.map(this.addChoiceButton.bind(this))}
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default AskQn;
