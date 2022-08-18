import React from "react";
import Form from './components/Form.js';
import List from './components/List.js';
// import names from "./names.json"
let names = ["John", "Joe", "Jonathan", "Zach", "Cathy"];

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      words: '',
      people: names,
    }
  }

  handleChange = (event) => {
    // do some work ...
    let filter = event.target.value.toLowerCase();
    // This is filtering the global data set and re-setting state with that subset
    // State only contains what we're planning to render out
    let filteredLIstOfPeople = names.filter( n => n.toLowerCase().includes(filter) )
    this.setState({ people: filteredLIstOfPeople });
  }

  handleSubmit = (e) => {
   e.preventDefault();
   console.log("You submitted the form!");
  }

  showPerson = (person) => {
    alert(person);
  }

  render() {
    return (
      <>
        <h1>{this.state.words}</h1>
        <Form changeHandler={this.handleChange} submitHandler={this.handleSubmit} />
        <List clickHandler={this.showPerson} items={this.state.people} />
      </>
    )
  }

}

export default App;
