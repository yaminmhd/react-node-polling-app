const express = require("express");
const app = express();

const _ = require("lodash");
const path = require("path");

const io = require("socket.io")(); //import and construct the socket
const questions = require("./seed-questions");

const connections = [];
const audience = [];
let currentQuestion = "";
let title = "";
let speaker = {};
let results = {
  a: 0,
  b: 0,
  c: 0,
  d: 0
};

const port = process.env.PORT || 3001;
// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(express.static(path.join(__dirname, "../client/public")));

io.on("connection", socket => {
  socket.once("disconnect", () => {
    const member = _.find(audience, { id: socket.id });
    if (member) {
      audience.splice(audience.indexOf(member), 1);
      io.sockets.emit("audience", audience);
      console.log(
        `${member.name} has left the session (${
          audience.length
        } audience members remaining)`
      );
    } else if (socket.id === speaker.id) {
      console.log(`${speaker.name} has left. ${title} is over.`);
      speaker = {};
      title = "Presentation";
      io.sockets.emit("endPresentation", { title: title, speaker: "" });
    }

    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log(
      `Disconnected: ${connections.length} ${
        connections.length > 1 ? "sockets" : "socket"
      } remaining`
    );
  });

  socket.on("memberJoin", payload => {
    const newMember = {
      id: socket.id,
      name: payload.name,
      type: "member"
    };
    socket.emit("memberSuccessfullyJoined", newMember);
    audience.push(newMember);
    io.sockets.emit("updateAudience", audience); //emit to all connected sockets on updated audience array
    console.log(`Audience Joined: ${payload.name}`);
  });

  socket.on("speakerStart", payload => {
    speaker.name = payload.name;
    speaker.id = socket.id;
    speaker.type = "speaker";
    socket.emit("memberSuccessfullyJoined", speaker);
    io.sockets.emit("speakerStart", {
      title: payload.title,
      speaker: payload.name
    }); //emit to all connected sockets on updated title and speaker name
    console.log(
      `Presentation Started: \`${payload.title}\` by ${payload.name}`
    );
  });

  socket.on("askQuestion", question => {
    currentQuestion = question;
    io.sockets.emit("askQuestion", currentQuestion);
    console.log(`Question Asked: \`${question.question}\``);
  });

  socket.on("incrementResults", chosenAnswer => {
    console.log(chosenAnswer.choice);
    results[chosenAnswer.choice]++;
    console.log(results);
  });

  /*
  When server wants to send message to the client. We use socket.emit()
  socket.emit() accepts 2 arguments, 'the message type' and the data you would intend to send over
  On the client side, they are going to listen for 'welcome' type message arriving
  */
  socket.emit("initializeAndUpdateData", {
    title: title,
    audience: audience,
    speaker: speaker.name,
    questions: questions,
    currentQuestion: currentQuestion
  });

  connections.push(socket);
  console.log(
    `Connected: ${connections.length} ${
      connections.length > 1 ? "sockets" : "socket"
    } connected`
  );
});

io.listen(port);
console.log(`Polling Application server is running on port ${port}!`);
