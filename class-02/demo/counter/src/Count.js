import React from 'react';

class Count extends React.Component {
  render() {
    return (
      <div>{this.props.currentCount}</div>
    )
  }
}

export default Count;
