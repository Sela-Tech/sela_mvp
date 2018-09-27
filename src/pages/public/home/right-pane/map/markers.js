import React from "react";
import colors from "./colors.json";

import { Marker } from "./map-view.style";
// let counter = 0;

export default projects => {
  return projects.map((project, index) => {
    console.log(project);
    // counter = counter + 1;
    // if (counter >= colors.length) counter = 0;
    const width = project.name.length * 13;

    return (
      <Marker
        key={index}
        lat={project.location.lat}
        lng={project.location.lng}
        markerWidth={width}
        backgroundColor={colors[project.status]}
      >
        <span id="arrow" />
        {project.name}
      </Marker>
    );
  });
};
