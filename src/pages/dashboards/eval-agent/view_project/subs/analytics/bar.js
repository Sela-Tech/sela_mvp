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

// const renderCustomizedLabel = props => {
//   const { x, y, width, value } = props;
//   const radius = 10;

//   return (
//     <g>
//       <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
//       <text
//         x={x + width / 2}
//         y={y - radius}
//         fill="#fff"
//         textAnchor="middle"
//         dominantBaseline="middle"
//       >
//         {value.split(" ")[1]}
//       </text>
//     </g>
//   );
// };

export default ({ data }) => {
  return (
    <div className="xs-12 corner">
      <BarChart
        width={450}
        height={245}
        data={data}
        margin={{ top: 35, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" minPointSize={5}>
          {/* <LabelList dataKey="name" content={renderCustomizedLabel} /> */}
        </Bar>
        <Bar dataKey="uv" fill="#82ca9d" minPointSize={10} />
      </BarChart>
    </div>
  );
};
