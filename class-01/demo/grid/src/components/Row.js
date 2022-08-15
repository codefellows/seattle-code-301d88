import React from 'react';
import Item from './Item.js';
import '../styles/row.css';

class Row extends React.Component {

  render() {
    return (
      <div className="row">
        <Item name="Item 1" />
        <Item name="Item 2" />
        <Item name="Item 3" />
      </div>
    )
  }
}

export default Row;
