import React from 'react';
import Count from './Count.js';
import CounterButton from './CounterButton.js';
/*
  {
    state: { count: 0 },
    decrement: () => {},
    increment: () => {}
  }
*/


class Counter extends React.Component {

  constructor(props) {
    super(props);
    // In a class, when you declare state ...
    // You have to do it in a constructor
    // The minute you have a constructor, you MUST super(props)

    // Initial State
    this.state = {
      count: 0
    }
  }

  increment = (e) => {
    // increment the counter
    let nextState = {
      count: this.state.count + 1
    }
    this.setState( nextState );
    // this.setState( { count: this.state.count + 1 })
    // this.setState( { count })
  }

  // decrement the counter
  decrement = (e) => {
    let count = this.state.count - 1;
    console.log(this);
    this.setState( { count });
  }

  render() {
    return (
      <div>
        {/* Components are actually - functions/classes  */}
        {/* Props are actually - arguments/parameters */}
        <CounterButton prompt="Subtract" handleClick={this.decrement} />
        <Count currentCount={this.state.count} />
        <CounterButton prompt="Add" handleClick={this.increment} />
      </div>
    )
  }

}

export default Counter;
