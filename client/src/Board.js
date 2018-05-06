import React from "react";
import Display from "./Display";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const barGraphData = results => {
  return Object.keys(results).map(choice => {
    return {
      name: choice,
      choice: results[choice]
    };
  });
};
//<p>{JSON.stringify(props.results)}</p>
// <h3>{props.currentQuestion.question}</h3>

const Board = props => (
  <div style={{ textAlign: "center" }}>
    <Display if={props.status === "connected" && props.currentQuestion}>
      <h2>{props.currentQuestion.question}</h2>
      <BarChart width={900} height={500} data={barGraphData(props.results)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals="false" dataKey="" />
        <Tooltip />
        <Legend />
        <Bar dataKey="choice" fill="#8884d8" />
      </BarChart>
    </Display>

    <Display if={props.status === "connected" && !props.currentQuestion}>
      <h3>Awaiting a Question...</h3>
    </Display>
  </div>
);

export default Board;
