import React, { Component } from "react";
import "./App.css";
import io from "socket.io-client";
import Header from "./Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Audience from "../src/Audience";
import Speaker from "../src/Speaker";
import Board from "../src/Board";
import ErrorPage from "../src/ErrorPage";
import { Container, Divider } from "semantic-ui-react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "disconnected",
      title: "",
      member: {},
      audience: [],
      speaker: "",
      questions: [],
      currentQuestion: "",
      results: {}
    };
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.emit = this.emit.bind(this);
    this.memberSuccessfullyJoined = this.memberSuccessfullyJoined.bind(this);
    this.updateAudience = this.updateAudience.bind(this);
    this.speakerStart = this.speakerStart.bind(this);
    this.updateStateFromServer = this.updateStateFromServer.bind(this);
    this.askQuestion = this.askQuestion.bind(this);
    this.updateResults = this.updateResults.bind(this);
  }

  componentDidMount() {
    //initial connection to the proxy server
    this.socket = io("http://localhost:3001");
    this.socket.on("connect", this.connect);
    this.socket.on("disconnect", this.disconnect);
    this.socket.on("initializeAndUpdateData", this.updateStateFromServer);
    this.socket.on("memberSuccessfullyJoined", this.memberSuccessfullyJoined);
    this.socket.on("updateAudience", this.updateAudience);
    this.socket.on("speakerStart", this.speakerStart);
    this.socket.on("endPresentation", this.updateStateFromServer);
    this.socket.on("askQuestion", this.askQuestion);
    this.socket.on("results", this.updateResults);
  }

  connect() {
    const member = sessionStorage.member
      ? JSON.parse(sessionStorage.member)
      : null;
    if (member && member.type === "member") {
      this.emit("memberJoin", member);
    } else if (member && member.type === "speaker") {
      this.emit("speakerStart", {
        name: member.name,
        title: sessionStorage.title
      });
    }
    this.setState({ status: "connected" });
  }

  disconnect() {
    this.setState({
      status: "disconnected",
      title: "",
      speaker: ""
    });
  }

  updateStateFromServer(serverState) {
    console.log(serverState);
    this.setState(serverState);
  }

  emit(eventName, payload) {
    this.socket.emit(eventName, payload);
  }

  memberSuccessfullyJoined(member) {
    sessionStorage.member = JSON.stringify(member);
    this.setState({ member });
  }

  updateAudience(newAudience) {
    this.setState({ audience: newAudience });
  }

  speakerStart(presentation) {
    if (this.state.member.type === "speaker") {
      sessionStorage.title = presentation.title;
      this.setState({
        title: presentation.title,
        speaker: presentation.speaker
      });
    }
  }

  askQuestion(question) {
    sessionStorage.answer = "";
    this.setState({ currentQuestion: question });
  }

  updateResults(data) {
    this.setState({ results: data });
  }

  render() {
    return (
      <Container style={{ marginTop: "30px" }}>
        <BrowserRouter>
          <div>
            <Header {...this.state} />
            <Divider />
            <Switch>
              <Route
                path="/"
                exact
                render={() => <Audience emit={this.emit} {...this.state} />}
              />
              <Route
                path="/speaker"
                component={() => <Speaker emit={this.emit} {...this.state} />}
              />
              <Route
                path="/board"
                component={() => <Board {...this.state} />}
              />
              <Route component={ErrorPage} />
            </Switch>
          </div>
        </BrowserRouter>
      </Container>
    );
  }
}

export default App;
