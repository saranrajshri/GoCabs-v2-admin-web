import React from "react";

class ShowRoute extends React.Component {
  render() {
    const url = `/maps/showRoute.html?originLat=${this.props.originLat}&originLon=${this.props.originLon}&destinationLat=${this.props.destinationLat}&destinationLon=${this.props.destinationLon}`;
    return (
      <iframe
        src={url}
        style={{
          width: "83%",
          marginTop: 30,
          height: 500,
          border: "none"
        }}
      ></iframe>
    );
  }
}

export default ShowRoute;
