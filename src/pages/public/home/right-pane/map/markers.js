import React from "react";
import colors from "./colors.json";

import { Marker } from "./map-view.style";

class MarkerClass extends React.Component {
  render() {
    const { project } = this.props;
    return (
      <Marker {...this.props}>
        <span id="arrow" />
        {project.name}

        {this.props.$hover && (
          <div className="hovered">
            <img src={project["project-avatar"]} alt="img" />
            <div className="inner">
              <h1>{project.name}</h1>
              <p>{project.description}</p>
            </div>
          </div>
        )}
      </Marker>
    );
  }
}

export default projects => {
  return projects.map((project, index) => {
    const width = project.name.length * 12;

    return (
      <MarkerClass
        key={index}
        project={project}
        lat={project.location.lat}
        lng={project.location.lng}
        markerWidth={width}
        backgroundColor={colors[project.status]}
      />
    );
  });
};
