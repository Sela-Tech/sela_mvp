import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";


export default ({ data }) => {
  return (
    <div className="xs-12 corner">
      <BarChart
        width={450}
        height={245}
        data={data}
        margin={{ top: 35, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="spent" fill="#1665D8" minPointSize={0}>
        </Bar>
        <Bar dataKey="raised" fill="#EAECEE" minPointSize={0} />
      </BarChart>
    </div>
  );
};
