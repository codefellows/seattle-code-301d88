import family from './family.json';
import Person from './components/Person.js';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
/*
  {
    "_id": 1,
    "name": "John"
  },
*/

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  congratulate = (person) => {
    this.handleOpen();
  }

  handleClose = () => {
    this.setState( { show: false })
  }

  handleOpen = () => {
    this.setState( { show: true })
  }

  render() {
      return (
        <>
          <div>
            {
              family.map( (person, index) =>
                <Person key={person._id} my={person} handler={this.congratulate} />
              )
            }
          </div>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Nice Job</Modal.Title>
            </Modal.Header>
            <Modal.Body>Congrats!!!!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
}

// Line 16:
// let person = new Person( {my:person })

export default App;
