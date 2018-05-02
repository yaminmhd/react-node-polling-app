import React, { Component } from "react";
import { Card, Icon } from "semantic-ui-react";

class Questions extends Component {
  askQuestion(question) {
    this.props.emit("askQuestion", question);
  }

  render() {
    return (
      <div>
        <h2>Questions</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            justifyItems: "center",
            alignItems: "end"
          }}
        >
          {this.props.questions.map((question, i) => {
            return (
              <Card.Group key={i}>
                <Card
                  color="teal"
                  onClick={this.askQuestion.bind(this, question)}
                >
                  <Card.Content>
                    <Icon name="idea" color="yellow" />
                    {question.question}
                  </Card.Content>
                </Card>
              </Card.Group>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Questions;
