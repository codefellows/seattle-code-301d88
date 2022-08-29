import React from 'react';

class List extends React.Component {

  render() {
    return (
      <ul>
        {
          this.props.items.map((person, idx) =>
            <li onClick={ () => this.props.clickHandler(person) } key={idx}>{person}</li>
          )
        }
      </ul>
    )
  }

}

export default List;
