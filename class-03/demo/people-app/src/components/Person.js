import React from 'react';

// What props did we get?
// "handler" ... this ia function to call up in the parent
// "my" ... this.props.my
// What is the value of that prop?
    /*
      {
        "_id": 1,
        "name": "John"
      },
    */

class Person extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      votes: 0,
      sleeping: true,
    };
  }

  upvote = () => {
    let numberOfVotes = this.state.votes + 1;
    this.setState( { votes: numberOfVotes} );
    if(numberOfVotes >= 10) {
      this.props.handler( this.props.my.name  )
    }
  }

  render() {
    return (
      <div onClick={this.upvote}>
        {this.props.my.name}
        <span> ({this.state.votes}) </span>
      </div>
    )
  }
}

export default Person;
