import React from 'react';
import Row from './Row.js';
import "../styles/grid.css";

class Grid extends React.Component {

  render() {
    return (
      <section className="grid">
        <Row />
        <Row />
      </section>
    )
  }

}

export default Grid;
