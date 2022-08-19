import React from "react";
import Map from "./Map.js";
import Restaurants from "./Restaurants.js";

import location from "./fake-data/location.json";
import restaurants from "./fake-data/restaurants.json";
import map from "./images/map.png";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayResults: false,
      location: location,
      restaurants: restaurants,
      map: map,
    };
  }

  handleLocationSearch = (e) => {
    e.preventDefault();
    this.setState({
      displayResults: true,
    });
  };

  render() {
    return (
      <div id="main">
        <form onSubmit={this.handleLocationSearch}>
          <input type="text" placeholder="City Name"></input>
					<button type="submit">Explore</button>
        </form>

        {this.state.displayResults && (
          <div>
            <Map />
            <Restaurants />
          </div>
        )}

        {/* Ternary Way: */}
        {/* {this.state.displayResults ? (
          <div>
            <Map />
            <Restaurants />
          </div>
        ) : null} */}
      </div>
    );
  }
}

export default Main;
