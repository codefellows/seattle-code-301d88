import { Component } from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';
import UpdateCatForm from './UpdateCatForm';

class Cats extends Component {
  render() {
    let cats = this.props.cats.map(cat => (
      <>
        <Cat
          cat={cat}
          key={cat._id}
          handleDelete={this.props.handleDelete}
          updateCats={this.props.updateCats}
        />
      </>
    ))
    return (
      <Container>
        <ListGroup>
          {cats}
        </ListGroup>
      </Container>
    )
  }
}

class Cat extends Component {
  constructor(props){
    super(props);
    this.state = {
      showUpdateForm: false
    }
  }
  render() {
    return (
      <>
        <ListGroup.Item
          key={this.props.key}
        >
          {this.props.cat.name} is a {this.props.cat.color}
        </ListGroup.Item>
        <Button onClick={() => this.props.handleDelete(this.props.cat)}>Remove from database?</Button>
        <Button onClick={() => this.setState({ showUpdateForm: true })}>Update Cat</Button>
        { this.state.showUpdateForm && 
           <UpdateCatForm 
              cat={this.props.cat}
              updateCats={this.props.updateCats}
           />
        }
      </>
    )
  }
}

export default Cats;