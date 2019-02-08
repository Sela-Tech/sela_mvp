import React from "react";

import BarChart from "recharts/lib/chart/BarChart";
import Bar from "recharts/lib/cartesian/Bar";
import XAxis from "recharts/lib/cartesian/XAxis";
import YAxis from "recharts/lib/cartesian/YAxis";
import CartesianGrid from "recharts/lib/cartesian/CartesianGrid";
import Tooltip from "recharts/lib/component/Tooltip";
import Legend from "recharts/lib/component/Legend";

export default ({ data }) => {
  return (
    <div className="xs-12 corner">
      <BarChart
        width={450}
        height={245}
        data={data}
        margin={{ top: 35, right: 20, left: -10, bottom: 5 }}
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
