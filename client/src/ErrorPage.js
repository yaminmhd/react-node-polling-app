import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

const ErrorPage = () => (
  <div style={{ textAlign: "center" }}>
    <h1>Error 404 Page!</h1>
    <p>
      We cannot find the page that you have requested. Were you looking for one
      of these:
    </p>
    <div>
      <ul style={{ display: "flex", justifyContent: "space-evenly" }}>
        <li style={{ listStyle: "none" }}>
          <Button color="blue">
            <Link style={{ color: "white" }} to="/">
              Join as Audience
            </Link>
          </Button>
        </li>
        <li style={{ listStyle: "none" }}>
          <Button color="teal">
            <Link style={{ color: "white" }} to="/speaker">Start the presentation</Link>
          </Button>
        </li>
        <li style={{ listStyle: "none" }}>
          <Button color="yellow">
            <Link style={{ color: "white" }} to="/board">View the board</Link>
          </Button>
        </li>
      </ul>
    </div>
  </div>
);

export default ErrorPage;
