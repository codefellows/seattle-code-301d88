import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>{this.props.title}</h1>
        <ListGroup>
        {
          this.props.people.map( (value, index) =>
            <ListGroup.Item>{value} </ListGroup.Item>
          )
        }
        </ListGroup>
      </header>
    )
  }

}

export default Header;
