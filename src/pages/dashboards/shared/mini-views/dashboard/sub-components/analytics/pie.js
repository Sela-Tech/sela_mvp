import React from "react";

import PieChart from "recharts/lib/chart/PieChart";
import Pie from "recharts/lib/polar/Pie";
import Cell from "recharts/lib/component/Cell";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default ({  pie }) => {
  return (
    <div className="xs-12">
      <PieChart height={180} width={180} onMouseEnter={this.onPieEnter}>
        <Pie
          data={pie}
          innerRadius={50}
          outerRadius={70}
          fill="#8884d8"
          paddingAngle={5}
        >
          {pie.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
          
        </Pie>
      </PieChart>
    </div>
  );
};
