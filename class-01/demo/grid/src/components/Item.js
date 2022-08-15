import React from 'react';
import "../styles/item.css";
class Item extends React.Component {

  render() {
    return (
      <div className="item">{this.props.name}</div>
    )
  }

}

export default Item;
