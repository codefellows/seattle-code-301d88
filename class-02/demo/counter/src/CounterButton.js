import React from 'react';

class CounterButton extends React.Component {
  // This button needs the method to run and the words to show
  // this.props.prompt will be shown
  // this.props.handleClick will be a method to run
  render() {
    return (
      <button onClick={this.props.handleClick}>{this.props.prompt}</button>
    )
  }
}

export default CounterButton;
